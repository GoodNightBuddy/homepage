'use strict'

//Sroll up button


let btn = document.getElementsByClassName('scroll-down')[0]

btn.addEventListener('click', e => {
  window.scrollTo(0, 0)
})


window.addEventListener('scroll', showScrollUpButton)

function showScrollUpButton() {
  if (window.pageYOffset === 0) {
    btn.style.top = document.documentElement.clientHeight + 5 + 'px'
  }
  if (window.pageYOffset > 0) {
    btn.style.top = document.documentElement.clientHeight - window.pageYOffset + 5 + 'px'
    if (btn.style.top <= document.documentElement.clientHeight - 62 + 'px') {
      btn.style.top = document.documentElement.clientHeight - 62 + 'px'
    }
  }
}
showScrollUpButton()


// Running blocks

window.addEventListener('scroll', animateContainers)

function animateContainers() {
  let containers = document.getElementsByClassName('container')

  for (let container of containers) {
    const coords = container.getBoundingClientRect()
    const height = container.offsetHeight
    const scrollHeight = document.documentElement.clientHeight
    const animStart = 4

    if (coords.top > 0 - height / animStart && coords.top < scrollHeight - height / animStart) {
      container.classList.add('swipe')
    } else {
      container.classList.remove('swipe')
    }
  }
}


function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}


// animate running block for th first load

function animateContainersOnce(time) {
  let containers = document.getElementsByClassName('container')

  let step = 0

  for (let container of containers) {
    setTimeout(() => {
      container.classList.add('swipe')
    }, time + step);

    step += 200
  }
}

animateContainersOnce(700)

// Text typing animation

function animate({ timing, draw, duration }) {  // Vspomogatel'naya funkciya

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

function linear(timeFraction) {
  return timeFraction;
}

let animateList = document.getElementsByClassName('animate-text')

for (let el of animateList) {
  animateText(el)
}

function animateText(el) {
  let text = el.innerText;
  let height = el.offsetHeight
  let width = el.offsetWidth
  el.style.height = height + 'px'
  el.style.width = width + 'px'
  let to = text.length,
    from = 0;

  animate({
    duration: 5000,
    timing: linear,
    draw: function (progress) {
      let result = (to - from) * progress + from;
      el.innerText = text.substr(0, Math.ceil(result))
    }
  });
}

// Rotate skobki

function animateForIntro({ timing, draw, duration }) { 
  let start = performance.now();

  requestAnimationFrame(function animateForIntro(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(1.5, timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animateForIntro);
    }

  });
}


function back(x = 1.5, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

let icon = document.querySelector('.intro__icon')

function rotate(el) {
  let to = 360
  let from = 0

  animateForIntro({
    duration: 1500,
    timing: back,
    draw: function (progress) {
      let result = (to - from) * progress + from;
      el.style.transform = `rotate(${result}deg)`
    }
  })
}

setInterval(() => {
  rotate(icon)
}, 3000);


// Animation for codewars

let codeWars = document.querySelector('#codewars')

function spin(el) {
  let to = 360
  let from = 0

  animate({
    duration: 2000,
    timing: linear,
    draw: function (progress) {
      let result = (to - from) * progress + from;
      el.style.transform = `rotate(${-result}deg)`
    }
  })
}

setInterval(() => {
  spin(codeWars)
}, 2000);




// function bounce(timeFraction) {
//   for (let a = 0, b = 1; 1; a += b, b /= 2) {
//     if (timeFraction >= (7 - 4 * a) / 11) {
//       return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
//     }
//   }
// }

// let scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );