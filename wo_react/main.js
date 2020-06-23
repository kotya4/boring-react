import 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
import { Weather } from '/modules/weather.js';

// Some helpers.
$.div = (class_name='') => $(`<div class="${class_name}">`);
$.wait = (delay) => new Promise(r => setTimeout(r, delay));

// Main.
async function main() {

  await Weather.init();

  $('body').append(
    $.div('weather').append(
      $.div('container').append(
        $.div('hat').append(
          $.div('text small fulldate').html(Weather.date()),
        ),
        $.div('main').append(
          $.div('text large description').html(Weather.desc()),
          $.div('big-icon').append(
            Array(4).fill().map((_,i) => $.div(`circle _${i}`)),
            $.div(`circle icon`),
          ),
          $.div('info').append(
            $.div('text extra-large temperature').html(Weather.temp()),
            $.div('text medium location').html(Weather.location()),
          )
        ),
        $.div('foot').append(
          Array(3).fill().map((_,i) => $.div(`button ${0===i?'active':''}`)
            .data({ i })
            .click(async function (e) {
              const prev_i = $('.button.active').data('i');

              $('.button').addClass('disabled'); // Disables butons.
              $('.button').removeClass('active'); // Deactivates buttons.
              $(this).addClass('active'); // Sets current button active.

              const dir = (i > prev_i) ? 'right' : 'left';
              const anim_1 = `slide-${dir}-from-center`;
              const anim_2 = `slide-${dir}-from-${dir}`;
              const threshold = 100;

              animate(anim_1, threshold);
              await $.wait(400+threshold);

              update(i);

              animate(anim_2, threshold);
              await $.wait(400+threshold);

              release(anim_1);
              release(anim_2);

              $('.button').removeClass('disabled'); // Enables butons.
            })
            .append(
              $.div(`icon ${Weather.icon(i)}`),
              $.div(`text extra-small desc`).html(Weather.date(i, true)),
            )
          )
        )
      )
    )
  );

  update(0);

  function update(i) {
    Weather.index = i;
    $('.fulldate').html(Weather.date());
    $('.description').html(Weather.desc());
    $('.circle.icon').removeClass($('.circle.icon').data('icon')||'');
    $('.circle.icon').data({ icon: Weather.icon() });
    $('.circle.icon').addClass(Weather.icon());
    $('.temperature').html(Weather.temp());
    $('.location').html(Weather.location());
  }

  const elements = [
    $('.fulldate'),
    $('.description'),
    $('.big-icon'),
    $('.temperature'),
    $('.location'),
  ];

  function animate(class_name, delay_max) {
    elements.forEach(e =>
      $.wait(Math.random()*delay_max|0).then(() =>
        e.addClass(class_name)
      )
    );
  }

  function release(class_name) {
    elements.forEach(e =>
      e.removeClass(class_name)
    );
  }
}

main();
