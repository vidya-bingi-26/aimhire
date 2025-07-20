// for reveal animation 
// for reveal animation 
document.addEventListener('DOMContentLoaded', function () {
  const reveals = document.querySelectorAll('.reveal');

  const options = {
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver(function (entries, revealObserver) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, options);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
});






// header drop box open close code
let profileDiv = document.querySelector('#profile-div'),
    dropBox = document.querySelector('#drop-box');

profileDiv.addEventListener('click', ()=>{
  if(dropBox.classList.contains('hidden')){
    dropBox.classList.remove('hidden');
  }else{
    dropBox.classList.add('hidden');
  }
});


// header notification box open close 
let notificationBell = document.querySelector('#notification-bell'),
    notificationBox = document.querySelector('#notification-detail-box');

notificationBell.addEventListener('click', ()=>{
  if(notificationBox.classList.contains('hidden')){
    notificationBox.classList.remove('hidden');
  }else{
    notificationBox.classList.add('hidden');
  }
});



