//

import React, { useState, useEffect } from 'react';
import { Text } from './Text.js';
import { Button } from './Button.js';
import { BigIcon } from './BigIcon.js';

import { Utils } from '../modules/Utils.js';
import { Weather } from '../modules/Weather.js';

import '../scss/App.scss';

export function App(props) {
  // Common states.
  const [weather_index, set_weather_index] = useState(null);
  const [button_index, set_button_index] = useState(null);
  const [button_state, set_button_state] = useState('disabled');

  // Loads weather and update data.
  useEffect(() => {
    Weather.load().then(e => {
      set_weather_index(0);
      set_button_index(0);
      set_button_state('enabled')
    });
  }, []);

  // Animation states.
  const [a_fulldate,    set_a_fulldate   ] = useState('');
  const [a_description, set_a_description] = useState('');
  const [a_bigicon,     set_a_bigicon    ] = useState('');
  const [a_temperature, set_a_temperature] = useState('');
  const [a_location,    set_a_location   ] = useState('');

  // Animates stuff.
  function animate(value, delay, threshold) {
    [
      set_a_fulldate,
      set_a_description,
      set_a_bigicon,
      set_a_temperature,
      set_a_location,
    ].forEach(e => setTimeout(() => e(value), Utils.randint(threshold)));
    return new Promise(r => setTimeout(r, delay + threshold));
  }

  // Button onClick event.
  async function Button_onClick(i) {
    set_button_index(i);
    set_button_state('disabled');
    const anim_dir = (i > weather_index) ? 'right' : 'left';
    await animate(`slide-${anim_dir}-from-center`, 400, 200);
    set_weather_index(i);
    await animate(`slide-${anim_dir}-from`, 400, 200);
    set_button_state('enabled');
  }

  // Expressions extracted from layout for readability.
  const hat_value = i => Utils.parse_date(Weather.date(i), { date: i });
  const btn_click = i => (() => Button_onClick(i));
  const btn_activ = (i) => button_index === i ? 'active' : '';
  const btn_icons = Utils.range(3).map(i => Weather.icon(i));
  const btn_texts = Utils.range(3).map(i => Utils.parse_date(Weather.date(i), { full: false, date: i }));

  // Layout.
  return (
    <div className="weather">
      <div className="hat">
        <Text className={`fulldate ${a_fulldate}`} size="small" value={hat_value(weather_index)}/>
      </div>
      <div className="main">
        <Text className={`description ${a_description}`} size="large" value={Weather.desc(weather_index)} />
        <BigIcon className={a_bigicon} icon={Weather.icon(weather_index)} />
        <div className="info">
          <Text className={`temperature ${a_temperature}`} size="extra-large" value={Weather.temp(weather_index)} />
          <Text className={`location ${a_location}`} size="medium" value={Weather.location(weather_index)} />
        </div>
      </div>
      <div className="foot">
      {
        Utils.range(3).map(i =>
          <Button
            key={i}
            className={`${button_state} ${btn_activ(i)}`}
            icon={btn_icons[i]}
            text={btn_texts[i]}
            onClick={btn_click(i)}
          />
        )
      }
      </div>
    </div>
  );
}
