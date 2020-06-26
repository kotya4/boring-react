import React, { useState } from 'react';
import './App.scss';


// По хорошему, нужно было бы все компоненты рассувать по отдельным файлам, но мне лень.
function Button(props) {
  return (
    <div
      className={`button ${props.active} ${props.clickable}`}
      index={props.index}
      onClick={props.onClick}
    >
      <div className={`icon ${props.icon}`}></div>
      <div className="text extra-small desc">{props.date}</div>
    </div>
  );
}


function App(props) {
  const { weather: Weather } = props;
  const [buttonActivity, setButtonActivity] = useState(0);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [buttonClickable, setButtonsClickable] = useState('enabled');
  // Наверное, сказывается то, что я не спал уже 22 часа, но
  // мне в голову пришла вот такая вот блевотная идея анимации.
  // Однако, я считаю, что она была бы еще более блевотной, если
  // бы реакт разрешал вызывать "useState" внутри колбеков, например
  // внутри "map", но так тоже достаточно блевотно.
  const [animation_fulldate,    setAnimation_fulldate   ] = useState('');
  const [animation_description, setAnimation_description] = useState('');
  const [animation_bigicon,     setAnimation_bigicon    ] = useState('');
  const [animation_temperature, setAnimation_temperature] = useState('');
  const [animation_location,    setAnimation_location   ] = useState('');
  const animations = [
    setAnimation_fulldate,
    setAnimation_description,
    setAnimation_bigicon,
    setAnimation_temperature,
    setAnimation_location,
  ];
  // Здесь перегруженный лейаут компонента, который можно было бы разделить на
  // куски, но т.к. я офигею прописывать пропсы для каждого отдельного компонента,
  // я просто оставлю это так; тем более, что функциональная часть находится
  // в самом низу, и отделен компонентом Button.
  return (
    <div className="weather">
      <div className="container">
        <div className="hat">
          <div className={`text small fulldate ${animation_fulldate}`}>
            { Weather.date(activeButtonIndex) }
          </div>
        </div>
        <div className="main">
          <div className={`text large description ${animation_description}`}>
            { Weather.desc(activeButtonIndex) }
          </div>
          <div className={`big-icon ${animation_bigicon}`}>
            { Array(4).fill().map((_,i) => (<div key={i} className={`circle _${i}`}></div>)) }
            <div className="circle icon"></div>
          </div>
          <div className="info">
            <div className={`text extra-large temperature ${animation_temperature}`}>
              { Weather.temp(activeButtonIndex) }
            </div>
            <div className={`text medium location ${animation_location}`}>
              { Weather.location(activeButtonIndex) }
            </div>
          </div>
        </div>
        <div className="foot">
          { Array(3).fill().map((_,i) => (
            <Button
              clickable={buttonClickable}
              key={i}
              index={i}
              active={buttonActivity===i?'active':''}
              icon={Weather.icon(i)}
              date={Weather.date(i, true)}
              onClick={async ()=>{
                // Изначально активность самой кнопки изменялась с помощью
                // "setActiveButtonIndex", однако тогда возникает проблема того,
                // что кнопка не становится активной сразу после нажатия, т.к.
                // "setActiveButtonIndex" нужно вызвать после первой анимации,
                // и в это время кнопка как бы визуально все еще неактивна.
                setButtonActivity(i);
                // Я не знаю, как красиво сделать анимацию, поэтому:
                // 1) Отнимаю возможность нажимать на кнопки до
                // момента, пока все анимации не проиграются.
                setButtonsClickable('disabled');
                // 2) Запускаю анимацию движения всего за границы экрана.
                const dir = (i > activeButtonIndex) ? 'right' : 'left';
                const anim_1 = `slide-${dir}-from-center`;
                const anim_2 = `slide-${dir}-from`;
                const threshold = 200;
                animations.forEach(e => setTimeout(()=>e(anim_1), Math.random()*threshold|0));
                // 3) Жду, пока все анимации проиграют.
                await new Promise(r=>setTimeout(r,400+threshold));
                // 4) Меняю информацию на анимированных полях.
                setActiveButtonIndex(i);
                // 5) Снова анимирую, теперь уже обратно в центр экрана.
                animations.forEach(e => setTimeout(()=>e(anim_2), Math.random()*threshold|0));
                // 6) Жду...
                await new Promise(r=>setTimeout(r,400+threshold));
                // 7) Делаю кнопки снова нажимабельными.
                setButtonsClickable('enabled');
              }}
            />
          )) }
        </div>
      </div>
    </div>
  );
}


export { App as default };
