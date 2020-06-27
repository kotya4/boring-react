//

import React from 'react';
import { Utils } from '../modules/Utils.js';

export function BigIcon(props) {
  const { className, icon } = props;
  return (
    <div className={`big-icon ${className}`}>
      {Utils.range(4).map(i => <div key={i} className={`circle _${i}`}></div>)}
      <div className={`circle icon ${icon}`}></div>
    </div>
  );
}
