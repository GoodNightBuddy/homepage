'use strict'

//Sroll up button

let btn = document.getElementsByClassName('scroll-down')[0]

btn.addEventListener('click', e => {
  window.scrollTo(0, 0)
})


window.addEventListener('scroll', e => {
  if (window.pageYOffset <= 30 + btn.offsetHeight) {
    btn.style.top = document.documentElement.clientHeight - window.pageYOffset + 'px'
  }
})

// Running blocks

window.addEventListener('scroll', animateContainers)

function animateContainers() {
  let containers = document.getElementsByClassName('container')

  for (let container of containers) {
    const coords = container.getBoundingClientRect()
    const height = container.offsetHeight
    const scrollHeight = document.documentElement.clientHeight
    const animStart = 4

    if(coords.top > 0 - height/animStart && coords.top < scrollHeight - height/animStart) {
      container.classList.add('swipe')
    }else {
      container.classList.remove('swipe')
    }
  }
}

// animateContainers()


function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}


// animate once

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


// let scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );








// function animate({timing, draw, duration}) {

//   let start = performance.now();

//   requestAnimationFrame(function animate(time) {
//     // timeFraction изменяется от 0 до 1
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;

//     // вычисление текущего состояния анимации
//     let progress = timing(timeFraction);

//     draw(progress); // отрисовать её

//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }

//   });
// }

// animate({
//   duration: 2000,

// })