//

import React from 'react';
import { Text } from './Text.js';


export function Button(props) {
  const { className, icon, text, onClick } = props;
  return (
    <div className={`button ${className}`} onClick={onClick}>
      <div className={`icon ${icon}`}></div>
      <Text className="desc" size="extra-small" value={text} />
    </div>
  );
}
