const navUser = document.getElementById('navUser');
const userAsideBackground = document.getElementById('userAsideBackground');
const userAsideContent = document.getElementById('userAsideContent');
const navWide = document.getElementById('navHead');
const updatePix = document.getElementById('updatePix');
const aside = document.getElementById('aside');
const userMainContainer = document.getElementById('userMainContainer');
const profilePicture = document.getElementById('profilePicture');

updatePix.addEventListener('change', () => {
  const url = 'https://quickcreditgilli.herokuapp.com/api/v1/users/uploads';
  console.log('entered');
  const formData = new FormData();
  formData.append('image', updatePix.files[0]);
  console.log(formData);
  const request = new Request(url, {
    method: 'PATCH',
    headers: new Headers({ Authorization: localStorage.getItem('auth') }),
    body: formData,
  });
  fetch(request).then(res => res.json())
    .then((obj) => {
      console.log(obj);
      profilePicture.setAttribute('src', obj.data.passporturl)
    });
});
// add event to navbar on large screen
navWide.addEventListener('click', () => {
  if (window.getComputedStyle(aside).getPropertyValue('width') === '0px') {
    aside.style.width = '260px';
    userMainContainer.style.paddingLeft = '260px';
  } else {
    aside.style.width = '0px';
    userMainContainer.style.paddingLeft = '0px';
  }
});
// add event to window
window.addEventListener('resize', () => {
  if (window.innerWidth < 1000) {
    aside.style.width = '0px';
    userMainContainer.style.paddingLeft = '0px';
  }
});
// add event to user nav bar background
userAsideBackground.addEventListener('click', () => {
  userAsideContent.style.right = '-500px';
  setTimeout(() => {
    userAsideBackground.style.display = 'none';
  }, 500);
});
// add event to user nav bar
navUser.addEventListener('click', () => {
  if (window.getComputedStyle(userAsideBackground).getPropertyValue('display') === 'none') {
    userAsideBackground.style.display = 'flex';
    setTimeout(() => {
      userAsideContent.style.right = '0px';
    });
  } else {
    userAsideContent.style.right = '-500px';
    setTimeout(() => {
      userAsideBackground.style.display = 'none';
    }, 500);
  }
});
