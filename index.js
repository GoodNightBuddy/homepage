'use strict'

let btn = document.getElementsByClassName('scroll-down')[0]

btn.addEventListener('click', e => {
  window.scrollTo(0, 0)
})


window.addEventListener('scroll', e => {
  if(window.pageYOffset <= 30 + btn.offsetHeight) {
    btn.style.top = document.documentElement.clientHeight - window.pageYOffset + 'px'
  }
})

