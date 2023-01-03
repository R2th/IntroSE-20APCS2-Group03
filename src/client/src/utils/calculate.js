import moment from 'moment';

export const convertSeconds = (sec) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - (hours * 3600)) / 60);
  const seconds = sec - (hours * 3600) - (minutes * 60);

  let result = '';

  if (hours > 0) {
    result += `${hours} hours`;
  }
  if (minutes > 0) {
    result += `${minutes} mins`;
  }
  if (seconds > 0) {
    result += `${seconds} sec`;
  }

  return result;
};

export const calculateMinsToRead = (content) => convertSeconds(Math.floor((content.match(/\w+/g).length) / 250));

export const getDateMonthYear = (date) => {
  const res = moment(date).format('DD MMM YYYY, HH:mm');
  return res;
};

export const abbreviateNumber = (value) => {
  let newValue = value;
  if (value >= 1000) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const suffixNum = Math.floor((`${value}`).length / 3);
    let shortValue = '';
    for (let precision = 2; precision >= 1; precision -= 1) {
      shortValue = parseFloat((suffixNum !== 0 ? (value / 1000 ** suffixNum) : value).toPrecision(precision));
      const dotLessShortValue = (`${shortValue}`).replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) { break; }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};
