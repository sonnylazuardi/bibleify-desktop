import * as Realm from 'realm';
import { remote } from 'electron';
import PassageSchema from '../constants/PassageSchema';

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
        path: `${remote.app.getAppPath()}/${activeVersion.value}.realm`,
      }).then(realm => {
        let passages = realm.objects('Passage');
        let query = `content CONTAINS[c] "${text}" AND type != "t"`;
        let filteredPassages = passages.filtered(query).slice(0, 50);

        const resultsRaw = Object.keys(filteredPassages);
        const results = resultsRaw.map(key => filteredPassages[key]);
        this.setShow(true);
        this.setResults(results);
      });
    },
  },
};

export default search;
