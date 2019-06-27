const amount = document.getElementById('homeAmountDropDown');
const tenor = document.getElementById('homeTenorDropDown');
const loanAmountDisplay = document.getElementsByClassName('calculatedUser')[0].firstElementChild.lastElementChild;
const loanTenorDisplay = document.getElementsByClassName('calculatedUser')[0].lastElementChild.lastElementChild;
const repaymentDate = document.getElementsByClassName('calculatedUser')[1].firstElementChild.lastElementChild;
const interest = document.getElementsByClassName('calculatedUser')[1].lastElementChild.lastElementChild;
const monthlyRepayment = document.getElementsByClassName('calculatedUser')[2].firstElementChild.lastElementChild;
const totalRepayment = document.getElementsByClassName('calculatedUser')[2].lastElementChild.lastElementChild;
const navUser = document.getElementById('navUser');
const userAsideBackground = document.getElementById('userAsideBackground');
const userAsideContent = document.getElementById('userAsideContent');
const navWide = document.getElementById('navHead');
const aside = document.getElementById('aside');
const userMainContainer = document.getElementById('userMainContainer');
const CalcApplyBtn = document.getElementById('CalcApplyBtn');
const applyBackground = document.getElementById('applyBackground');
const btnDiv = document.getElementsByClassName('btns')[0];
const closeLogin = document.getElementById('closeLogin');
const loanAmount = document.getElementById('loanAmount');
const resDiv = document.getElementById('resDiv');
const loanTenor = document.getElementById('loanTenor');
const applyContent = document.getElementById('applyContent');

// add event to calc apply btn
CalcApplyBtn.addEventListener('click', () => {
  resDiv.classList.remove('errorDiv');
  resDiv.classList.remove('successDiv');
  applyBackground.style.display = 'flex';
  resDiv.textContent = `Do you want to apply for the loan ${loanAmount.textContent}
   for the period of ${loanTenor.textContent} ?`;
  btnDiv.innerHTML = '<button id="yes">yes</button><button id="no">no</button>';
  /* const btnDiv = document.createElement('div');
  btnDiv.className = 'btns';
  const yesBtn = document.createElement('button');
  yesBtn.setAttribute('id', 'yes');
  yesBtn.textContent = 'yes';
  const noBtn = document.createElement('button');
  noBtn.setAttribute('id', 'no');
  noBtn.textContent = 'no';
  btnDiv.appendChild(yesBtn);
  btnDiv.appendChild(noBtn);
  applyContent.appendChild(btnDiv); */
});
// add event to modal close x
closeLogin.addEventListener('click', () => {
  applyBackground.style.display = 'none';
});
// add event to modal content for yes and no
applyContent.addEventListener('click', (e) => {
  const { target } = e;
  if (target.getAttribute('id') === 'yes') {
    // console.log('you just applied');
    applyLoan(loanAmount.textContent, loanTenor.textContent);
    applyBackground.style.display = 'none';
  } else if (target.getAttribute('id') === 'no') {
    applyBackground.style.display = 'none';
  }
});
// fetch apply api
const applyLoan = (amountString, tenorString) => {
  const amount = String(getMoneyValue(amountString.split('₦')[1].trim()));
  const tenor = tenorString.split('M')[0];
  console.log({ amount, tenor });
  const url = 'https://quickcreditgilli.herokuapp.com/api/v1/loans/';
  const request = new Request(url, {
    method: 'POST',
    headers: new Headers({
      'Content-type': 'application/json',
      Accept: 'application/json,text/plain,*/*',
      Authorization: localStorage.getItem('auth'),
    }),
    body: JSON.stringify({ amount, tenor }),
  });
  fetch(request).then((res) => {
    if (res.ok) {
      return res.json();
    } if (res.status === 409) {
      throw Error('you have a loan in progress');
    }
    throw Error(res.statusText);
  }).then((obj) => {
    console.log(obj);
    applyBackground.style.display = 'flex';
    resDiv.classList.add('successDiv');
    resDiv.textContent = `application for the amount ₦ ${toMoneyString(obj.data.amount)} was successful`;
    btnDiv.innerHTML = '<button id="no" class="ok">OK</button>';
  }).catch((err) => {
    console.log(err);
    applyBackground.style.display = 'flex';
    resDiv.classList.add('errorDiv');
    resDiv.textContent = `${err}`;
    btnDiv.innerHTML = '<button id="no">OK</button>';
  });
};
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

// add current date to repayment date div
let currentDate = new Date();
let newDate = new Date();
newDate.setMonth(currentDate.getMonth()+1);
repaymentDate.textContent = newDate.toDateString();

amount.addEventListener('change', (e) => {
  const target = e.target;
  let amountVal = getMoneyValue(target.options[target.options.selectedIndex].value);
  let interestAmount = 0.05* amountVal;
  let tenorVal = Number(tenor.options[tenor.options.selectedIndex].value);
  let totalMoney = amountVal + interestAmount;
  let monthlyMoney = totalMoney/tenorVal;
  totalRepayment.innerHTML = '&#8358; ' +toMoneyString(totalMoney);
  monthlyRepayment.innerHTML = '&#8358; ' +toMoneyString(monthlyMoney);
  loanAmountDisplay.innerHTML = '&#8358; ' + target.options[target.options.selectedIndex].value;
  loanTenorDisplay.textContent = tenor.options[tenor.options.selectedIndex].value + ' Month(s)';
  let newDate = new Date();
  newDate.setMonth(currentDate.getMonth() + Number(tenor.options[tenor.options.selectedIndex].value));
  repaymentDate.textContent = newDate.toDateString();
  interest.innerHTML = '&#8358; ' + toMoneyString(interestAmount);  
});
tenor.addEventListener('change', (e) => {
  let amountVal = getMoneyValue(amount.options[amount.options.selectedIndex].value);
  let interestAmount = 0.05* amountVal;
  let tenorVal = Number(tenor.options[tenor.options.selectedIndex].value);
  let totalMoney = amountVal + interestAmount;
  let monthlyMoney = totalMoney/tenorVal;
  totalRepayment.innerHTML = '&#8358; ' +toMoneyString(totalMoney);
  monthlyRepayment.innerHTML = '&#8358; ' +toMoneyString(monthlyMoney);
  const target = e.target;
  loanTenorDisplay.textContent = target.options[target.options.selectedIndex].value + ' Month(s)';
  loanAmountDisplay.innerHTML = '&#8358; ' + amount.options[amount.options.selectedIndex].value ;
  let newDate = new Date();
  newDate.setMonth(currentDate.getMonth()+Number(tenor.options[tenor.options.selectedIndex].value));
  repaymentDate.textContent = newDate.toDateString();
  interest.innerHTML = '&#8358; ' + toMoneyString(0.05*getMoneyValue(amount.options[amount.options.selectedIndex].value));
})

const getMoneyValue = (money) => {
  switch (money) {
    case '10,000.00':
      return 10000;
    case '20,000.00':
      return 20000;
    case '30,000.00':
      return 30000;
    case '40,000.00':
      return 40000;
    case '50,000.00':
      return 50000;
    case '60,000.00':
      return 60000;
    case '70,000.00':
      return 70000;
    case '80,000.00':
      return 80000;
    case '90,000.00':
      return 90000;
    case '100,000.00':
      return 100000;
    default:
      return 0;
  }
};
const toMoneyString = (amount) => {
  const mainAmount = String(amount);
  const stringAmount = String(parseInt(amount, 10));
  const amountLength = stringAmount.length;
  if (amountLength === 4) {
    return stringAmount.charAt(0).concat(',').concat(mainAmount.substr(1));
  } if (amountLength === 5) {
    return stringAmount.substr(0, 2).concat(',').concat(mainAmount.substr(2));
  } if (amountLength === 6) {
    return stringAmount.substr(0, 3).concat(',').concat(mainAmount.substr(3));
  }
  return amount;
};
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
