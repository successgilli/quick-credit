const navUser = document.getElementById('navUser');
const userAsideBackground = document.getElementById('userAsideBackground');
const userAsideContent = document.getElementById('userAsideContent');
const navWide = document.getElementById('navHead');
const updatePix = document.getElementById('updatePix');
const aside = document.getElementById('aside');
const userMainContainer = document.getElementById('userMainContainer');
const profilePicture = document.getElementById('profilePicture');
const loader = document.getElementById('loader');

updatePix.addEventListener('change', () => {
  const userImage = document.getElementById('userImage');
  const url = 'https://quickcreditgilli.herokuapp.com/api/v1/users/uploads';
  console.log('entered');
  const formData = new FormData();
  formData.append('image', updatePix.files[0]);
  console.log(formData);
  loader.style.opacity = '1';
  const request = new Request(url, {
    method: 'PATCH',
    headers: new Headers({ Authorization: localStorage.getItem('auth') }),
    body: formData,
  });
  fetch(request).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  }).then((obj) => {
    console.log(obj);
    profilePicture.setAttribute('src', obj.data.passporturl);
    userImage.setAttribute('src', obj.data.passporturl);
    loader.style.opacity = '0';
  }).catch((er) => {
    console.log(er);
    loader.style.opacity = '0';
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
// add event listener to load user page
window.addEventListener('load', () => {
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userAccount = document.getElementById('userAccount');
  const userAddress = document.getElementById('userAddress');
  const userImage = document.getElementById('userImage');
  const url = 'https://quickcreditgilli.herokuapp.com/api/v1/users';
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('auth'),
      Accept: 'application/json,text/plain,*/*',
    }),
  });
  loader.style.opacity = '1';
  fetch(request).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  }).then((obj) => {
    loader.style.opacity = '0';
    if (obj.data.passporturl === null) {
      profilePicture.setAttribute('src', './img/profile-placeholder.gif');
      userImage.setAttribute('src', './img/profile-placeholder.gif');
    } else {
      profilePicture.setAttribute('src', obj.data.passporturl);
      userImage.setAttribute('src', obj.data.passporturl);
    }
    userAddress.textContent = obj.data.address;
    userName.textContent = `${obj.data.firstname} ${obj.data.lastname}`;
    userEmail.textContent = obj.data.email;
    userAccount.textContent = obj.data.accountnumber;
  }).catch((err) => {
    loader.style.opacity = '1';
    console.log(err);
  });
});
