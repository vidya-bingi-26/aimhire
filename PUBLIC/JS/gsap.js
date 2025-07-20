var title = document.querySelector('h1')
var h1Text = title.textContent;
var clutter = "";
h1Text.split('').forEach((character, index)=>{
    if (index <= 2) {
      clutter += `<span>${character}</span>`;
    } else {
      clutter += `<span class="coloredTxt">${character}</span>`;
    }

});
title.innerHTML = clutter;

const timeLine = gsap.timeline();
timeLine.from('.titleBox img', {
    opacity: 0,
    scale: 0,
    duration: 1.2
});
timeLine.to('.titleBox img', {
    x: -20,
    delay: 0.15,
    duration: 0.8
});
timeLine.from('h1 span', {
    y: 100,
    duration: 0.8,
    opacity: 0,
    stagger: 0.15
});
timeLine.to('.titleBox', {
    scale: 1.5,
    duration: 2,
    opacity: 0,
    delay: 0.3
});





