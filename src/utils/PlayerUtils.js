import Books from '../constants/Books';

const PlayerUtils = {
  pad(num, size) {
    var s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  },
  getStreamUrl(activeBook, activeChapter, activeVersion) {
    let bookId = Books.findIndex(book => book.value == activeBook.value);
    if (activeBook.type == 'new') {
      bookId = bookId - 39;
    }
    const bookNumber = this.pad(bookId + 1, 2);
    let bookName = (activeVersion.lang == 'en' ? activeBook.name : activeBook.name_id).toLowerCase();
    bookName = bookName
      .replace('1 ', '1')
      .replace('2 ', '2')
      .replace('3 ', '3');
    if (bookName.indexOf(' ' != -1)) {
      let bookSplit = bookName.split(' ');
      bookName = bookSplit[0];
    }
    if (bookName.indexOf('-' != -1)) {
      let bookSplit = bookName.split('-');
      bookName = bookSplit[0];
    }
    let bookShortName = (activeVersion.lang == 'en' ? activeBook.value : activeBook.value_id).toLowerCase();

    const testament = activeBook.type == 'old' ? 'pl' : 'pb';
    let chapterNumber = activeBook.total > 99 ? this.pad(activeChapter, 3) : this.pad(activeChapter, 2);
    const streamUrl =
      activeVersion.lang == 'en'
        ? `http://media.sabda.org/alkitab_audio/kjv/${testament}/mp3/cd/${bookNumber}_${bookName}/${bookNumber}_${bookShortName}${chapterNumber}.mp3`
        : `http://media.sabda.org/alkitab_audio/tb_alkitabsuara/${testament}/mp3/cd/${bookNumber}_${bookName}/${bookNumber}_${bookShortName}${chapterNumber}.mp3`;

    return streamUrl;
  },
};

export default PlayerUtils;
