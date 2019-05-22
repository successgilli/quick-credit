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

//add event to navbar on large screen
navWide.addEventListener('click', () => {
    if (window.getComputedStyle(aside).getPropertyValue('width') === '0px') {
        aside.style.width = '260px';
        userMainContainer.style.paddingLeft = '260px';
    } else {
        aside.style.width = '0px';
        userMainContainer.style.paddingLeft = '0px';
    }

})
//add event to window
window.addEventListener('resize', () => {
    if (window.innerWidth < 1000) {
        aside.style.width = '0px';
        userMainContainer.style.paddingLeft = '0px';
    }
})

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
// add event to user nav bar background
userAsideBackground.addEventListener('click', ()=>{
    userAsideContent.style.right = '-500px';
        setTimeout(()=>{
            userAsideBackground.style.display = 'none';
            
        },500)
})
// add event to user nav bar
navUser.addEventListener('click', ()=>{
    if(window.getComputedStyle(userAsideBackground).getPropertyValue('display') === 'none'){
        userAsideBackground.style.display = 'flex';
        setTimeout(()=>{
            userAsideContent.style.right = '0px';
        })
        
    } else{
        userAsideContent.style.right = '-500px';
        setTimeout(()=>{
            userAsideBackground.style.display = 'none';
            
        },500)
    }
})