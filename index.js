// 'use strict'

//Sroll up button

let btn = document.getElementsByClassName('scroll-down')[0]

btn.addEventListener('click', e => {
  window.scrollTo(0, 0)
})


window.addEventListener('scroll', showScrollUpButton)

function showScrollUpButton() {
  if (window.pageYOffset === 0) {
    btn.style.top = document.documentElement.clientHeight + 5 + 'px'
    btn.style.transitionProperty = 'top'
  }
  if (window.pageYOffset > 10) {
    btn.style.top = document.documentElement.clientHeight - 62 + 'px'
  }
}

showScrollUpButton()


// Running blocks

window.addEventListener('scroll', animateContainers)

function animateContainers() {
  let containers = document.getElementsByClassName('container')

  for (let container of containers) {
    const coords = getCoords(container)
    const height = container.offsetHeight
    const scrollHeight = document.documentElement.clientHeight
    let animPoint = 4
    if (document.documentElement.clientWidth < 850) {
      animPoint = animPoint * 1.5
    }

    let animStart = height / animPoint
    if (height > document.documentElement.clientHeight) {
      animStart = document.documentElement.clientHeight / animPoint
    }


    if (coords.top < (window.pageYOffset + scrollHeight - animStart) && coords.top > (window.pageYOffset - animStart * (animPoint - 1))) {
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


// Animate running block for the first load

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

function animate({ timing, draw, duration }) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

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
  let to = text.length,
    from = 0;

  animate({
    duration: 3000,
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
