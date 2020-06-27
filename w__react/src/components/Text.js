//

import React from 'react';

export function Text(props) {
  const { className, size, value } = props;
  return (<div className={`text ${size} ${className}`}>{value}</div>);
}
