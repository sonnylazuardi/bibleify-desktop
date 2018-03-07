import Books from './constants/Books';
import Versions from './constants/Versions';
import * as Realm from 'realm';

const PassageSchema = {
  name: 'Passage',
  primaryKey: 'id',
  properties: {
    id: 'string',
    content: 'string',
    book: 'string',
    chapter: 'int',
    verse: 'int',
    type: 'string',
  },
};

export const bible = {
  state: {
    activeVersion: Versions[1],
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
        path: `${activeVersion.value}.realm`,
      }).then(realm => {
        let passages = realm.objects('Passage');
        let filteredPassages = passages
          .filtered(`book = "${activeBook.value}" AND chapter = "${activeChapter}"`)
          .sorted('verse');
        const versesRaw = Object.keys(filteredPassages);
        if (versesRaw.length) {
          const verses = versesRaw.map(key => filteredPassages[key]);

          this.setVerses(verses);
        }
      });
    },
  },
};

export const search = {
  state: {
    text: '',
    results: [],
    show: false,
  },
  reducers: {
    setText(state, payload) {
      return { ...state, text: payload };
    },
    setResults(state, payload) {
      return { ...state, results: payload };
    },
    setShow(state, payload) {
      return { ...state, show: payload };
    },
  },
  effects: {
    fetchSearch(payload, rootState) {
      const { text } = rootState.search;
      const { activeVersion } = rootState.bible;
      Realm.open({
        schema: [PassageSchema],
        readOnly: true,
        inMemory: false,
        path: `${activeVersion.value}.realm`,
      }).then(realm => {
        let passages = realm.objects('Passage');
        let query = '';
        if (text.indexOf(' ') != -1) {
          let splitWords = text.replace('  ', ' ').split(' ');
          splitWords = splitWords.map(word => (word != '' ? `content CONTAINS[c] "${word}"` : '')).filter(word => word);
          // query = `${query} ${splitWords}`;
          query = `${splitWords.join(' OR ')} AND type != "t"`;
        } else {
          query = `content CONTAINS[c] "${text}" AND type != "t"`;
        }
        let filteredPassages = passages.filtered(query).slice(0, 30);
        const resultsRaw = Object.keys(filteredPassages);
        const results = resultsRaw.map(key => filteredPassages[key]);
        this.setShow(true);
        this.setResults(results);
      });
    },
  },
};

export const player = {
  state: {
    streamUrl: null,
    chapter: null,
    book: null,
    duration: 0,
    currentTime: 0,
  },
  reducers: {
    setStreamUrl(state, payload) {
      return { ...state, streamUrl: payload };
    },
    setChapter(state, payload) {
      return { ...state, chapter: payload };
    },
    setBook(state, payload) {
      return { ...state, book: payload };
    },
  },
  effects: {},
};
