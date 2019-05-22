/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
const moreInfoDiv = document.getElementsByClassName('moreInfo');
const navUser = document.getElementById('navUser');
const userAsideBackground = document.getElementById('userAsideBackground');
const userAsideContent = document.getElementById('userAsideContent');
const navWide = document.getElementById('navHead');
const aside = document.getElementById('aside');
const userMainContainer = document.getElementById('userMainContainer');
const repaymentTableHead = document.getElementsByClassName('repaymentTableHead');

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
// add event to all view repayment Btn
for (i = 0; i < repaymentTableHead.length; i++) {
  repaymentTableHead[i].addEventListener('click', (e) => {
    const { target } = e;
    let realTarget;
    if (target.className === 'repaymentTableHead') {
      realTarget = target.nextElementSibling;
    } else if (target.className === 'tableHeads2') {
      realTarget = target.parentNode.parentNode.nextElementSibling;
    } else if (target.className === 'tableHeads1') {
      realTarget = target.parentNode.parentNode.nextElementSibling;
    } else if (target.className === 'tableHeads') {
      realTarget = target.parentNode.nextElementSibling;
    } else if (target.classList.contains('statusContainer')) {
      realTarget = target.parentNode.nextElementSibling;
    } else {
      realTarget = target.nextElementSibling;
    }
    if (window.getComputedStyle(realTarget).getPropertyValue('max-height') === '0px') {
      for (i = 0; i < moreInfoDiv.length; i++) {
        moreInfoDiv[i].style.maxHeight = '0px';
        moreInfoDiv[i].previousElementSibling.classList.remove('active');
      }
      realTarget.previousElementSibling.classList.add('active');
      realTarget.style.maxHeight = '10000px';
    } else {
      realTarget.previousElementSibling.classList.remove('active');
      realTarget.style.maxHeight = '0px';
    }
  }, true);
}
