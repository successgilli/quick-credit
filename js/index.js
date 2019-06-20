const amount = document.getElementById('homeAmountDropDown');
const tenor = document.getElementById('homeTenorDropDown');
const loanAmountDisplay = document.getElementsByClassName('calculated')[0].firstElementChild.lastElementChild;
const loanTenorDisplay = document.getElementsByClassName('calculated')[0].lastElementChild.lastElementChild;
const repaymentDate = document.getElementsByClassName('calculated')[1].firstElementChild.lastElementChild;
const interest = document.getElementsByClassName('calculated')[1].lastElementChild.lastElementChild;
const monthlyRepayment = document.getElementsByClassName('calculated')[2].firstElementChild.lastElementChild;
const totalRepayment = document.getElementsByClassName('calculated')[2].lastElementChild.lastElementChild;
const epic = document.getElementsByClassName('epic');
const submitBtn = document.getElementsByClassName('signupBtn')[1];
const nextBtn = document.getElementsByClassName('signupBtn')[2];
const prevBtn = document.getElementsByClassName('signupBtn')[0];
const firstTab = document.getElementById('firstTab');
const lastTab = document.getElementById('lastTab');
const tabs = document.getElementsByClassName('tab');
const navCircles = document.getElementsByClassName('navigator');
const signToggle = document.getElementsByClassName('signToggle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const formPTag = document.getElementById('formPTag');
const closeLogin = document.getElementById('outerClose');
const backgroundSignUser = document.getElementById('backgroundSignUser');
const headLinks = document.getElementsByClassName('headLinks');
const signHead = document.getElementById('signHead');
const loginHead = document.getElementById('loginHead');
const signContent = document.getElementById('signContent');
const nav = document.getElementById('nav');
const backgroundAside = document.getElementById('backgroundAside');
const homeSidebar = document.getElementById('homeSidebar');
const signinBtn = document.getElementById('signinBtn');
const homeAsideLinks = document.getElementsByClassName('homeAsideLinks');
const inputFields = document.getElementsByClassName("inputFields");
const passwordMatch = document.getElementById('passwordMatch');
const passwordSign = document.getElementById('passwordSign');
const passwordMatchRes = document.getElementById('passwordMatchRes');
const homeCalcApplyBtn = document.getElementById('homeCalcApplyBtn');
const homeBtns = document.getElementsByClassName('homeBtns');


const patterns = {
  email: /^([a-zA-Z])([a-z0-9A-Z]+)@([a-zA-Z]+)\.([a-zA-Z]{2,3})(\.[a-zA-Z]{2,3})?$/,
  password: /^[\w@-]{7,20}$/,
  name: /^[a-zA-Z]{5,12}$/,
  address: /(?!^[\d]+$)^[a-zA-Z0-9 ]{7,20}$/,
  amount: /^[0-9]{4,10}$/,
  bvn:/^[0-9]{11}$/,
  accountNumber:/^[0-9]{10}$/,
}
// add event to log in btn

// add event to aside login div
homeAsideLinks[4].addEventListener('click', ()=>{
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  formPTag.textContent = 'LOG IN';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  })
})
// add click event to aside signin to open signup modal
homeAsideLinks[5].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  })
    
})

// ensure aside closes white clicked on the background
backgroundAside.addEventListener('click', ()=> {
  homeSidebar.style.left = '500px';
  setTimeout(()=>{
    backgroundAside.style.display = 'none';
  }, 500)  
})
// nav bar toggle aside
nav.addEventListener('click', ()=> {
  if (window.getComputedStyle(backgroundAside).getPropertyValue('display')==='none') {
    backgroundAside.style.display = 'flex';
    setTimeout(()=>{
      homeSidebar.style.left = '0px';
    })
  } else {
    homeSidebar.style.left = '500px';
    setTimeout(()=>{
      backgroundAside.style.display = 'none';
    }, 500)
  }  
})

// add click event to header login to open login modal
headLinks[1].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  formPTag.textContent = 'LOG IN';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  })
})
// add click event to header signin to open signup modal
headLinks[2].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  })
    
})
// add click event to home apply  btn to open signup modal
homeCalcApplyBtn.addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  }, 10)
    
})
// add click event to home register  btn to open signup modal
homeBtns[0].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  }, 10)
    
})
// add click event to home login gen  btn to open signup modal
homeBtns[1].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  formPTag.textContent = 'LOG IN';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  }, 10)
    
})
// add click event to home apply gen  btn to open signup modal
homeBtns[1].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  }, 10)
    
})
// add click event to home get loan  btn to open signup modal
homeBtns[2].addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'flex';
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP';
  setTimeout(()=> {
    signHead.style.top = '20px';
    signContent.style.top = '0px';
  }, 10)
    
})
// add click event to close form modal
closeLogin.addEventListener('click', ()=> {
  backgroundSignUser.style.display = 'none';
  signHead.style.top = '-500px';
  signContent.style.top = '-500px';

})
// add event listiner to toggle to show login
signToggle[0].addEventListener('click', ()=> {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  formPTag.textContent = 'LOG IN'
})
// add event listiner to toggle to show signup
signToggle[1].addEventListener('click', ()=> {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formPTag.textContent = 'SIGN UP'
})
// add event to nextBtn
nextBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  nextBtn.setAttribute('disabled', true);
  if (validateTabs()) {

  } else {
    // check if we are on page 2
    let tabTwo = false;
    let val = false;
    for (i=0; i<tabs.length; i++) {
      if (window.getComputedStyle(tabs[i]).getPropertyValue('left') === '0px') {
        if (tabs[i].getAttribute('id') === 'secondTab') {
          tabTwo = true;
        }
      }
    }
    if (tabTwo) {
      val = MatchPassword(passwordMatch);
      if (val) {
        checkTab();
        for (i=0; i<tabs.length;i++) {
          let offset = Number(window.getComputedStyle(tabs[i]).getPropertyValue('left').split('px')[0]);
          let newOffset = offset-520;
          tabs[i].style.left = newOffset+'px';
        }
        
        nextNav();
      }
    } else {
      checkTab();
      for (i=0; i<tabs.length;i++) {
        let offset = Number(window.getComputedStyle(tabs[i]).getPropertyValue('left').split('px')[0]);
        let newOffset = offset-520;
        tabs[i].style.left = newOffset+'px';
      }
    
      nextNav();
    }
           
  }
  window.setTimeout(() => {
    nextBtn.removeAttribute('disabled');
  }, 500)
    
})

// add event to prevBtn
prevBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  prevBtn.setAttribute('disabled', true);
  checkTab2();
  for (i=0; i<tabs.length;i++) {
    let offset = Number(window.getComputedStyle(tabs[i]).getPropertyValue('left').split('px')[0]);
    let newOffset = offset+520;
    tabs[i].style.left = newOffset+'px';
  }
  prevNav();
  window.setTimeout(() => {
    prevBtn.removeAttribute('disabled');
  }, 500)
})
// add click event to navigator circles
for (i=0; i<navCircles.length; i++) {
  navCircles[i].addEventListener('click', (e) => {
    const target = e.target;
    let currentNavIndex = new Map ([['firstTab',0], ['secondTab',1], ['thirdTab', 2], ['lastTab', 3]]);
    // check all tabs and get which is in front
    let currentTab = 'none';
    for (i=0; i<tabs.length; i++) {
      if (window.getComputedStyle(tabs[i]).getPropertyValue('left') === '0px') {
        currentTab = tabs[i].getAttribute('id');
      }
    }
    if (target.getAttribute('id') === 'firstNav') {
      tabs[0].style.left = '0px';
      tabs[1].style.left = '520px';
      tabs[2].style.left = '1040px';
      tabs[3].style.left = '1560px';
      navCircles[currentNavIndex.get(currentTab)].style.opacity = '0.5';
      navCircles[0].style.opacity = '1';
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'block';
      submitBtn.style.display = 'none';
            
    } 
    if ( (target.previousElementSibling) && (target.previousElementSibling.style.backgroundColor === 'green')) {
      if (target.getAttribute('id') === 'secondNav') {
        tabs[0].style.left = '-520px';
        tabs[1].style.left = '0px';
        tabs[2].style.left = '520px';
        tabs[3].style.left = '1040px';
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        navCircles[currentNavIndex.get(currentTab)].style.opacity = '0.5';
        navCircles[1].style.opacity = '1';
      }
      if (target.getAttribute('id') === 'thirdNav') {
        tabs[0].style.left = '-1040px';
        tabs[1].style.left = '-520px';
        tabs[2].style.left = '0px';
        tabs[3].style.left = '520px';
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        navCircles[currentNavIndex.get(currentTab)].style.opacity = '0.5';
        navCircles[2].style.opacity = '1';
      }
      if (target.getAttribute('id') === 'fourthNav') {
        tabs[0].style.left = '-1560px';
        tabs[1].style.left = '-1040px';
        tabs[2].style.left = '-520px';
        tabs[3].style.left = '0px';
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        navCircles[currentNavIndex.get(currentTab)].style.opacity = '0.5';
        navCircles[3].style.opacity = '1';
      }
    }
  })
}
// fxn check which tab is in next so we toggle nextBtn
const checkTab = ()=> {
  for (i=0; i<tabs.length;i++) {
    if (window.getComputedStyle(tabs[i]).getPropertyValue('left') === '520px') {
      if (tabs[i].getAttribute('id') === 'lastTab') {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
      } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
      }
    }
  }
}
// fxn check which tab is in next so we toggle prevBtn
const checkTab2 = ()=> {
  for (i=0; i<tabs.length;i++) {
    if (window.getComputedStyle(tabs[i]).getPropertyValue('left') === '-520px') {
      if (tabs[i].getAttribute('id') === 'firstTab') {
        prevBtn.style.display = 'none';
      } else {
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        prevBtn.style.display = 'block';
      }
    }
  }
}
// fxn to control next nav circle opacity nd color
const nextNav = ()=> {
  let index = 'none';
  for (i=0; i<navCircles.length;i++) {
    if (window.getComputedStyle(navCircles[i]).getPropertyValue('opacity') === '1') {
      index = i;
    }
  }
  if (index !=='none') {
    navCircles[index].style.opacity = '0.5';
    navCircles[index].style.backgroundColor = 'green';
    navCircles[index+1].style.opacity = '1';
  }
      
}
// fxn to control prev nav circle opacity nd color
const prevNav = ()=> {
  let index = 'none';
  for (i=0; i<navCircles.length;i++) {
    if (window.getComputedStyle(navCircles[i]).getPropertyValue('opacity') === '1') {
      index = i;
    }
  }
  if (index !=='none') {
    navCircles[index].style.opacity = '0.5';
    navCircles[index-1].style.opacity = '1';
  }
      
}
//
// add current date to repayment date div
let currentDate = new Date();
let newDate = new Date();
newDate.setMonth(currentDate.getMonth()+1);
repaymentDate.textContent = newDate.toDateString();

amount.addEventListener('change', (e)=>{
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
  newDate.setMonth(currentDate.getMonth()+Number(tenor.options[tenor.options.selectedIndex].value));
  repaymentDate.textContent = newDate.toDateString();
  interest.innerHTML = '&#8358; ' + toMoneyString(interestAmount);   
})

tenor.addEventListener('change', (e)=>{
  console.log(new Date)
  let amountVal = getMoneyValue(amount.options[amount.options.selectedIndex].value);
  let interestAmount = 0.05* amountVal;
  let tenorVal = Number(tenor.options[tenor.options.selectedIndex].value);
  let totalMoney = amountVal + interestAmount;
  let monthlyMoney = totalMoney/tenorVal;
  totalRepayment.innerHTML = '&#8358; ' + toMoneyString(totalMoney);
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
  }
}
const toMoneyString = (amount) => {
  let mainAmount = String(amount);
  let stringAmount = String(parseInt(amount));
  let amountLength = stringAmount.length;
  if (amountLength === 4) {  
    return stringAmount.charAt(0).concat(',').concat(mainAmount.substr(1));
  } else if (amountLength === 5) {
    return stringAmount.substr(0,2).concat(',').concat(mainAmount.substr(2));
  } else if (amountLength === 6) {
    return stringAmount.substr(0,3).concat(',').concat(mainAmount.substr(3));
  } else {
    return amount;
  }
}


const validate = (field, regEx) => {
  if (regEx.test(field.value)) {
    field.style.borderColor = 'green';
    field.nextElementSibling.nextElementSibling.className = 'valid';
    field.nextElementSibling.style.color = 'green'
  } else {
    field.nextElementSibling.style.color = 'red'
    field.nextElementSibling.nextElementSibling.className = 'invalid';
    field.style.borderColor = 'red';
  }
}
// validate login form
for (i=0; i<inputFields.length; i++) {
  inputFields[i].addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  })
}
// add event to password field
passwordSign.addEventListener('keyup', () => {
  MatchPassword(passwordMatch);
})
// check password match
passwordMatch.addEventListener('keyup', (e) => {
  let val = MatchPassword (e.target);
})
// fxn to check match password;
const MatchPassword = (field) => {
  if (field.value === passwordSign.value) {
    field.style.borderColor = 'green';
    field.nextElementSibling.style.color = 'green';
    passwordMatchRes.textContent = 'password match'
    passwordMatchRes.style.color = 'green';
    passwordMatchRes.style.display = 'block'
    return true;
  } else {
    passwordMatchRes.style.display = 'block'
    field.style.borderColor = 'red';
    field.nextElementSibling.style.color = 'red';
    passwordMatchRes.textContent = 'password not matching'
    passwordMatchRes.style.color = 'red';
    return false;
  }
}
// fxn to validate inputs before moving to ANOTHER TAB
const validateTabs = () => {
  for (i=0; i<tabs.length; i++) {
    if (window.getComputedStyle(tabs[i]).getPropertyValue('left') === '0px' ) {
      let children = tabs[i].children;
      for (j=0; j<children.length; j++) {
        if (children[j].hasAttribute('name')) {
          validate(children[j], patterns[children[j].attributes.name.value]);
          if (window.getComputedStyle(children[j].nextElementSibling.nextElementSibling)
            .getPropertyValue('display') === 'block') {
            return true;
          } 
        }
      }
    }
  }
};


{
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const logResponse = document.getElementById('logResponse');
  const password = document.getElementById('password');
  const successDiv = document.getElementById('successDiv');

  const url = 'https://quickcreditgilli.herokuapp.com/api/v1/auth/signin';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (email.style.borderColor === 'red' || password.style.borderColor === 'red') {
      logResponse.style.display = 'block';
      logResponse.textContent = 'ensure inputs are correct';
    } else {
      logResponse.style.display = 'block';
      logResponse.textContent = 'loading';
      const data = {
        email: email.value,
        password: password.value,
      };
      const req = new Request(url, {
        method: 'POST',
        headers: new Headers({ 'Content-type': 'application/json' }),
        body: JSON.stringify(data),
      });
      fetch(req)
        .then(res => res.json())
        .then((obj) => {
          if (obj.status === 200) {
            successDiv.style.display = 'block';
            localStorage.setItem('auth', obj.data.token)
            setTimeout(() => {
              logResponse.style.display = 'none';
              console.log(typeof obj.data.isAdmin)
              if (obj.data.isAdmin === true) {
                location = './adminDashboard.html'
              } else {
                location = './userDashbord.html'
              }
            }, 300);
          } else {
            logResponse.style.display = 'block';
            logResponse.textContent = 'wrong input';
          }
        });
    }
  });
}
{
  const form = document.getElementById('signupForm');
  const firstname = document.getElementById('firstname');
  const Lastname = document.getElementById('LastName');
  const address = document.getElementById('address');
  const passwordSig = document.getElementById('passwordSign');
  const userEmail = document.getElementById('userEmail');
  const userCompany = document.getElementById('userCompany');
  const monthlyIncome = document.getElementById('monthlyIncome');
  const companyAddress = document.getElementById('companyAddress');
  const bankName = document.getElementById('bankName');
  const bvn = document.getElementById('bvn');
  const accountNumber = document.getElementById('accountNumber');
  const logResponse = document.getElementById('logResponse');
  const successDiv = document.getElementById('successDiv');

  const url = 'https://quickcreditgilli.herokuapp.com/api/v1/auth/signup';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('yes!');
    logResponse.style.display = 'block';
    logResponse.textContent = 'ensure inputs are correct';
    logResponse.style.display = 'block';
    logResponse.textContent = 'loading';
    const data = {
      firstName: firstname.value,
      lastName: Lastname.value,
      address: address.value,
      email: userEmail.value,
      password: passwordSig.value.trim(),
      companyName: userCompany.value,
      companyAddress: companyAddress.value,
      monthlyIncome: monthlyIncome.value,
      bankName: bankName.value,
      bvn: bvn.value,
      accountNumber: accountNumber.value,
    };
    console.log(data);
    const req = new Request(url, {
      method: 'POST',
      headers: new Headers({ 'Content-type': 'application/json' }),
      body: JSON.stringify(data),
    });
    fetch(req)
      .then(res => res.json())
      .then((obj) => {
        console.log(obj);
        if (obj.status === 200) {
          successDiv.style.display = 'block';
          setTimeout(() => {
            logResponse.style.display = 'none';
            console.log(typeof obj.data.isAdmin);
            if (obj.data.isAdmin === true) {
              location = './adminDashboard.html';
            } else {
              location = './userDashbord.html';
            }
          }, 300);
        } else {
          logResponse.style.display = 'block';
          logResponse.textContent = 'wrong input';
        }
      });
  });
}
