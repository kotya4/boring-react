// Module contains some useful fitures to determine weather and so on.

const fetch = require("node-fetch");

export const Weather = {
  index: 0,
  raw: null,

  load() {
    const url = 'https://gist.githubusercontent.com/anonymous/feb1b31516f3e36a14b2965'
                +'7701f18d2/raw/eaa544aed7e3bdee37c6caa2a515f1d4c38fbd4f/weather.json';
    return new Promise(r =>fetch(url).then(re => re.json().then(data => r(this.raw = data || null))));
  },

  desc(i) {
    if (null == this.raw) return '???';
    if (null == i) i = this.index;
    const d = this.raw.list[i].weather[0].description;
    return d[0].toUpperCase() + d.slice(1);
  },

  temp(i) {
    if (null == this.raw) return '--˚';
    if (null == i) i = this.index;
    return `${this.raw.list[i].temp.day-273.15|0}˚`;
  },

  location() {
    if (null == this.raw) return '???';
    return this.raw.city.name;
  },

  icon(i) {
    if (null == this.raw) return 'no-icon';
    if (null == i) i = this.index;
    return this.raw.list[i].weather[0].main.toLowerCase();
  },

  date(i) {
    if (null == this.raw) return 0;
    if (null == i) i = this.index;
    return 1000 * this.raw.list[i].dt;
  }
};
