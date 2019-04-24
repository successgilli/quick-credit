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
const closeLogin = document.getElementById('closeLogin');
const backgroundSignUser = document.getElementById('backgroundSignUser');
const headLinks = document.getElementsByClassName('headLinks');
const signHead = document.getElementById('signHead');
const loginHead = document.getElementById('loginHead');
const signContent = document.getElementById('signContent');
const nav = document.getElementById('nav');
const backgroundAside = document.getElementById('backgroundAside');
const homeSidebar = document.getElementById('homeSidebar');
const homeAsideLinks = document.getElementsByClassName('homeAsideLinks');

//add event to aside login div
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
//add click event to aside signin to open signup modal
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

//ensure aside closes white clicked on the background
backgroundAside.addEventListener('click', ()=> {
    homeSidebar.style.left = '-500px';
        setTimeout(()=>{
         backgroundAside.style.display = 'none';
        }, 500)  
})
//nav bar toggle aside
nav.addEventListener('click', ()=> {
    if(window.getComputedStyle(backgroundAside).getPropertyValue('display')==='none'){
        backgroundAside.style.display = 'block';
        setTimeout(()=>{
            homeSidebar.style.left = '0px';
        })
    } else {
        homeSidebar.style.left = '-500px';
        setTimeout(()=>{
         backgroundAside.style.display = 'none';
        }, 500)
    }  
})

//add click event to header login to open login modal
headLinks[4].addEventListener('click', ()=> {
    backgroundSignUser.style.display = 'flex';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    formPTag.textContent = 'LOG IN';
    setTimeout(()=> {
        signHead.style.top = '20px';
    signContent.style.top = '0px';
    })
})
//add click event to header signin to open signup modal
headLinks[5].addEventListener('click', ()=> {
    backgroundSignUser.style.display = 'flex';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    formPTag.textContent = 'SIGN UP';
    setTimeout(()=> {
        signHead.style.top = '20px';
    signContent.style.top = '0px';
    })
    
})
//add click event to close form modal
closeLogin.addEventListener('click', ()=> {
    backgroundSignUser.style.display = 'none';
    signHead.style.top = '-500px';
    signContent.style.top = '-500px';

})
//add event listiner to toggle to show login
signToggle[0].addEventListener('click', ()=> {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    formPTag.textContent = 'LOG IN'
})
//add event listiner to toggle to show signup
signToggle[1].addEventListener('click', ()=> {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    formPTag.textContent = 'SIGN UP'
})
//add event to nextBtn
nextBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    checkTab();
    for(i=0; i<tabs.length;i++){
        let offset = Number(window.getComputedStyle(tabs[i]).getPropertyValue('left').split('px')[0]);
        let newOffset = offset-520;
        tabs[i].style.left = newOffset+'px';
    }
    nextNav();
})
//add event to prevBtn
prevBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    checkTab2();
    for(i=0; i<tabs.length;i++){
        let offset = Number(window.getComputedStyle(tabs[i]).getPropertyValue('left').split('px')[0]);
        let newOffset = offset+520;
        tabs[i].style.left = newOffset+'px';
    }
    prevNav();
})
//fxn check which tab is in next so we toggle nextBtn
const checkTab = ()=> {
    for(i=0; i<tabs.length;i++){
        if(window.getComputedStyle(tabs[i]).getPropertyValue('left') === '520px'){
            if(tabs[i].getAttribute('id') === 'lastTab'){
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else{
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }
    }
}
//fxn check which tab is in next so we toggle prevBtn
const checkTab2 = ()=> {
    for(i=0; i<tabs.length;i++){
        if(window.getComputedStyle(tabs[i]).getPropertyValue('left') === '-520px'){
            if(tabs[i].getAttribute('id') === 'firstTab'){
                prevBtn.style.display = 'none';
            } else{
                submitBtn.style.display = 'none';
                nextBtn.style.display = 'block';
                prevBtn.style.display = 'block';
            }
        }
    }
}
//fxn to control next nav circle opacity nd color
const nextNav = ()=> {
    let index = 'none';
    for(i=0; i<navCircles.length;i++){
        if(window.getComputedStyle(navCircles[i]).getPropertyValue('opacity') === '1'){
            index = i;
        }
    }
    if(index !=='none'){
        navCircles[index].style.opacity = '0.5';
        navCircles[index].style.backgroundColor = 'green';
        navCircles[index+1].style.opacity = '1';
    }
      
}
//fxn to control prev nav circle opacity nd color
const prevNav = ()=> {
    let index = 'none';
    for(i=0; i<navCircles.length;i++){
        if(window.getComputedStyle(navCircles[i]).getPropertyValue('opacity') === '1'){
            index = i;
        }
    }
    if(index !=='none'){
        navCircles[index].style.opacity = '0.5';
        navCircles[index-1].style.opacity = '1';
    }
      
}
//add current date to repayment date div
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
    switch(money){
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
    if(amountLength === 4) {  
        return stringAmount.charAt(0).concat(',').concat(mainAmount.substr(1));
    } else if(amountLength === 5) {
        return stringAmount.substr(0,2).concat(',').concat(mainAmount.substr(2));
    } else if (amountLength === 6){
        return stringAmount.substr(0,3).concat(',').concat(mainAmount.substr(3));
    } else {
        return amount;
    }
}
