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
const repayment = document.getElementsByClassName('repayment')[0];

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
const addEventToLoans = (loan) => {
  loan.addEventListener('click', (e) => {
    const { target } = e;
    console.log(target);
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
};
const addRepayments = (loanInfoDiv, array, loanBalance, repaymentTableHeadElem) => {
  console.log(loanInfoDiv);
  array.forEach((repayed) => {
    const repayDetailsElem = document.createElement('div');
    repayDetailsElem.setAttribute('class', 'repayDetails');
    for (let i = 0; i < 3; i++) {
      const repayheadsElem = document.createElement('div');
      repayheadsElem.setAttribute('class', 'repayHeads');
      const repayHeads1Elem = document.createElement('p');
      repayHeads1Elem.setAttribute('class', 'repayHeads1');
      const repayHeads2Elem = document.createElement('p');
      repayHeads2Elem.setAttribute('class', 'repayHeads2');
      repayheadsElem.appendChild(repayHeads1Elem);
      repayheadsElem.appendChild(repayHeads2Elem);
      if (i === 0) {
        repayHeads1Elem.textContent = 'Date paid';
        repayHeads2Elem.textContent = repayed.createdon.split('T')[0];
      } else if (i === 1) {
        repayHeads1Elem.textContent = 'Amount paid';
        repayHeads2Elem.innerHTML = `&#8358; ${repayed.amount}`;
      } else {
        repayHeads1Elem.textContent = 'balance';
        repayHeads2Elem.innerHTML = `&#8358; ${loanBalance}`;
      }
      repayDetailsElem.appendChild(repayheadsElem);
    }
    loanInfoDiv.appendChild(repayDetailsElem);
  });
  repayment.appendChild(repaymentTableHeadElem);
  console.log('appendedrepayment Table');
  repayment.appendChild(loanInfoDiv);
};
const createRepaymentTableHead = (empty) => {
  if (empty) {
    const moreInfoElem = document.createElement('div');
    moreInfoElem.setAttribute('class', 'moreInfo');
    const pTagElem = document.createElement('p');
    pTagElem.textContent = 'No Repayment History for This Loan';
    moreInfoElem.appendChild(pTagElem);
    return moreInfoElem;
  }
  console.log(empty);
  const moreInfoElem = document.createElement('div');
  moreInfoElem.setAttribute('class', 'moreInfo');
  const repayWideHeadElem = document.createElement('div');
  repayWideHeadElem.setAttribute('class', 'repaywidehead');
  const pTagElem = document.createElement('p');
  pTagElem.textContent = 'Repayment History for This Loan';
  for (let i = 0; i < 3; i++) {
    const repayHeadsElem = document.createElement('div');
    repayHeadsElem.setAttribute('class', 'repayHeads');
    const repayHeads3Elem = document.createElement('p');
    repayHeads3Elem.setAttribute('class', 'repayHeads3');
    repayHeadsElem.appendChild(repayHeads3Elem);
    if (i === 0) {
      repayHeads3Elem.textContent = 'Date paid';
    } else if (i === 1) {
      repayHeads3Elem.textContent = 'Amount Paid';
    } else {
      repayHeads3Elem.textContent = 'balance';
    }
    repayWideHeadElem.appendChild(repayHeadsElem);
  }
  moreInfoElem.appendChild(pTagElem);
  moreInfoElem.appendChild(repayWideHeadElem);
  return moreInfoElem;
};
const createRepayments = (loan, repaymentTableHeadElem) => {
  const url = `https://quickcreditgilli.herokuapp.com/api/v1/loans/${loan.id}/repayments`;
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({ 'Content-type': 'application/json', Authorization: localStorage.getItem('auth'), Accept: 'application/json,text/plain,*/*' }),
  });
  fetch(request).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  }).then((obj) => {
    console.log(obj.data.length, 'sdsf');
    let empty = false;
    if (obj.data.length === 0) {
      empty = true;
    }
    const moreInfoElem = createRepaymentTableHead(empty);
    addRepayments(moreInfoElem, obj.data, loan.balance, repaymentTableHeadElem);
  }).catch(err => console.log(err));
  // repayment.appendChild(moreInfoElem);
};
const createLoans = (obj) => {
  if (obj.error) {
    console.log(obj.error);
    const pElem = document.createElement('p');
    pElem.textContent = obj.error;
    pElem.style.width = '100px';
    pElem.style.textAlign = 'centery';
    pElem.style.margin = 'auto';
    repayment.appendChild(pElem);
  } else {
    const array = obj.data;
    array.forEach(async (loan) => {
      const repaymentTableHeadElem = document.createElement('div');
      repaymentTableHeadElem.setAttribute('class', 'repaymentTableHead');
      const tableheadsAndStatusElem = document.createElement('div');
      tableheadsAndStatusElem.setAttribute('class', 'tableHeads statusContainer');
      const statusdivAndCurrentElem = document.createElement('div');
      if ((loan.status === 'approved' || loan.status === 'pending') && loan.repaid === false) {
        statusdivAndCurrentElem.setAttribute('class', 'statusDiv current');
      } else {
        statusdivAndCurrentElem.setAttribute('class', 'statusDiv done');
      }
      tableheadsAndStatusElem.appendChild(statusdivAndCurrentElem);
      repaymentTableHeadElem.appendChild(tableheadsAndStatusElem);
      for (let i = 0; i < 5; i++) {
        const tablesheadsElem = document.createElement('div');
        tablesheadsElem.setAttribute('class', 'tableHeads');
        const tablesheads1Elem = document.createElement('p');
        tablesheads1Elem.setAttribute('class', 'tableHeads1');
        const tablesheads2Elem = document.createElement('p');
        tablesheads2Elem.setAttribute('class', 'tableHeads2');
        tablesheadsElem.appendChild(tablesheads1Elem);
        tablesheadsElem.appendChild(tablesheads2Elem);
        if (i === 0) {
          tablesheads1Elem.textContent = 'Date Applied';
          tablesheads2Elem.textContent = loan.createdon.split('T')[0];
        } else if (i === 1) {
          tablesheads1Elem.textContent = 'Loan Amount';
          tablesheads2Elem.innerHTML = `&#8358; ${loan.amount}`;
        } else if (i === 2) {
          tablesheads1Elem.textContent = 'Monthly installments';
          tablesheads2Elem.innerHTML = `&#8358; ${loan.paymentinstallment}`;
        } else if (i === 3) {
          tablesheads1Elem.textContent = 'Repayment Deadline';
          tablesheads2Elem.textContent = 'not yet';
        } else {
          tablesheads1Elem.textContent = 'Status';
          tablesheads2Elem.textContent = loan.status;
          if (loan.status === 'pending') {
            tablesheads2Elem.style.color = '#C49B51';
          } else if (loan.status === 'approved') {
            tablesheads2Elem.style.color = '#60AD60';
          } else {
            tablesheads2Elem.style.color = '#F16969';
          }
        }
        repaymentTableHeadElem.appendChild(tablesheadsElem);
      }
      // repayment.appendChild(repaymentTableHeadElem);
      console.log('appendedrepayment Table');
      addEventToLoans(repaymentTableHeadElem);
      createRepayments(loan, repaymentTableHeadElem);
    });
  }
};
const windowLoad = () => {
  window.addEventListener('load', () => {
    const url = 'https://quickcreditgilli.herokuapp.com/api/v1/loans/user';
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({ 'Content-type': 'application/json', Authorization: localStorage.getItem('auth'), Accept: 'application/json,text/plain,*/*' }),
    });
    fetch(request).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
    }).then((obj) => {
      console.log(obj);
      createLoans(obj);
    }).catch(err => console.log(err));
  });
};

windowLoad();
