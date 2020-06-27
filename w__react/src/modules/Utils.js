//

export var Utils = {};

Utils.range = n => Array(n).fill().map((_,i) => i);

Utils.randint = n => Math.random() * n | 0;

Utils.parse_date = (timestamp, opt) => {
  if (!timestamp) return 'Неизвестно';
  let { full, date } = opt || {};
  if (null == full) full = true;
  if (null == date || date > 2 || date < 0) date = 3;
  const d = new Date(timestamp);
  const day = ['Сегодня', 'Завтра', 'Послезавтра', 'Неизвестно'][date];
  const month = ['января','февраля','марта','апреля','мая','июня','июля',
                 'августа','сентября','октября','ноября','декабря'][d.getMonth()];
  return (full) ? `${day}, ${d.getDate()} ${month} ${d.getFullYear()}` : `${d.getDate()} ${month}`;
}
