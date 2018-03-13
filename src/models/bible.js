import Books from '../constants/Books';
import Versions from '../constants/Versions';
import * as Realm from 'realm';
import { remote } from 'electron';
import PassageSchema from '../constants/PassageSchema';

export const bible = {
  state: {
    activeVersion: Versions[4],
    activeBook: Books[0],
    activeChapter: 1,
    activeVerse: null,
    jumpText: '',
    verses: [],
  },
  reducers: {
    setActiveChapter(state, payload) {
      return { ...state, activeChapter: payload };
    },
    setActiveBook(state, payload) {
      return { ...state, activeBook: payload };
    },
    jumpToVerse(state, payload) {
      const { activeBook, activeChapter, activeVerse } = payload;
      return { ...state, activeBook, activeChapter, activeVerse };
    },
    setActiveVersion(state, payload) {
      return { ...state, activeVersion: payload };
    },
    setVerses(state, payload) {
      return { ...state, verses: payload };
    },
    setJumpText(state, payload) {
      return { ...state, jumpText: payload };
    },
    prevChapter(state) {
      let newChapter = state.activeChapter - 1;
      if (newChapter < 1) {
        newChapter = 1;
      }
      return { ...state, activeChapter: newChapter };
    },
    nextChapter(state) {
      let newChapter = state.activeChapter + 1;
      const currentBook = Books.find(book => {
        return book.value == state.activeBook.value;
      });
      if (newChapter > currentBook.total) {
        newChapter = currentBook.total;
      }
      return { ...state, activeChapter: newChapter };
    },
  },
  effects: {
    fetchVerses(payload) {
      const { activeVersion, activeBook, activeChapter } = payload;
      Realm.open({
        schema: [PassageSchema],
        readOnly: true,
        inMemory: false,
        path: `${remote.app.getAppPath()}/${activeVersion.value}.realm`,
      }).then(realm => {
        let passages = realm.objects('Passage');
        let filteredPassages = passages
          .filtered(`book = "${activeBook.value}" AND chapter = "${activeChapter}"`)
          .sorted('order');
        const versesRaw = Object.keys(filteredPassages);
        if (versesRaw.length) {
          const verses = versesRaw.map(key => filteredPassages[key]);
          this.setVerses(verses);
        }
      });
    },
  },
};

export default bible;
