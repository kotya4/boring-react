// Weather module contains some usefull fitures to determine weather and so on.

import 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';

export var Weather = {
  index: 0,
  raw: null,

  init() {
    // Loads weather from server.
    const server = 'https://gist.githubusercontent.com/anonymous/feb1b31516f3e36a14b2965'
                  +'7701f18d2/raw/eaa544aed7e3bdee37c6caa2a515f1d4c38fbd4f/weather.json';
    const data_from_server = new Promise((res,rej) => $.get(server, (data,status) => {
      // TODO: notmodified
      if ('success' === status) {
        this.raw = JSON.parse(data);
        res(this, status, data);
        return;
      }
      rej(this, status, data);
    }));
    // Returns promise.
    return data_from_server;
  },

  desc(i) {
    if (null == i) i = this.index;
    const d = this.raw.list[i].weather[0].description;
    return d[0].toUpperCase() + d.slice(1);
  },

  temp(i) {
    if (null == i) i = this.index;
    return `&nbsp;&nbsp;${this.raw.list[i].temp.day-273.15|0}˚`;
  },

  location() {
    return this.raw.city.name;
  },

  icon(i) {
    if (null == i) i = this.index;
    return this.raw.list[i].weather[0].main.toLowerCase();
  },

  date(i, only_day=false) {
    if (null == i) i = this.index;
    const d = new Date(this.raw.list[i].dt * 1000);
    const day = ["Сегодня", "Завтра", "Послезавтра"][i];
    const month = ["января","февраля","марта","апреля","мая","июня","июля",
                   "августа","сентября","октября","ноября","декабря"][d.getMonth()];
    if (only_day) return `${d.getDate()} ${month}`;
    return `${day}, ${d.getDate()} ${month} ${d.getFullYear()}`;
  },
};
