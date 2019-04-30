const viewRepaymentBtn = document.getElementsByClassName('viewRepayment');
const viewLoanDetails = document.getElementsByClassName('viewLoanDetails');
const moreInfoDiv = document.getElementsByClassName('moreInfo');
const moreInfoDiv2 = document.getElementsByClassName('moreInfoLoan');
const navUser = document.getElementById('navUser');
const userAsideBackground = document.getElementById('userAsideBackground');
const userAsideContent = document.getElementById('userAsideContent');


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
//add event to all view repayment Btn
for(i=0;i<viewRepaymentBtn.length;i++){
    viewRepaymentBtn[i].addEventListener('click', (e)=>{
        let target = e.target;
        let realTarget = target.parentNode.nextElementSibling;
        if (window.getComputedStyle(realTarget).getPropertyValue('max-height') === '0px'){
            console.log(window.getComputedStyle(realTarget).getPropertyValue('height'))
            for(i=0;i<moreInfoDiv.length;i++){
                moreInfoDiv[i].style.maxHeight = '0px';
            }
            for(i=0;i<moreInfoDiv2.length;i++){
                moreInfoDiv2[i].style.maxHeight = '0px';
            }
            realTarget.style.maxHeight = '10000px';           
        } else {
            console.log(window.getComputedStyle(realTarget).getPropertyValue('height'))
            realTarget.style.maxHeight = '0px'; 
        }
    })
}
//add event to all view loan details Btn
for(i=0;i<viewLoanDetails.length;i++){
    viewLoanDetails[i].addEventListener('click', (e)=>{
        let target = e.target;
        let realTarget = target.parentNode.nextElementSibling;
        if (window.getComputedStyle(realTarget).getPropertyValue('max-height') === '0px'){
            console.log(window.getComputedStyle(realTarget).getPropertyValue('height'))
            for(i=0;i<moreInfoDiv.length;i++){
                moreInfoDiv[i].style.maxHeight = '0px';
            }
            for(i=0;i<moreInfoDiv2.length;i++){
                moreInfoDiv2[i].style.maxHeight = '0px';
            }
            realTarget.style.maxHeight = '10000px';           
        } else {
            console.log(window.getComputedStyle(realTarget).getPropertyValue('height'))
            realTarget.style.maxHeight = '0px'; 
        }
    })
}