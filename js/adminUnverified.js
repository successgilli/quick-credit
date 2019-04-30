const viewRepaymentBtn = document.getElementsByClassName('viewRepayment');
const viewLoanDetails = document.getElementsByClassName('viewLoanDetails');
const moreInfoDiv = document.getElementsByClassName('moreInfo');
const moreInfoDiv2 = document.getElementsByClassName('moreInfoLoan');
const navUser = document.getElementById('navUser');
const userAsideBackground = document.getElementById('userAsideBackground');
const userAsideContent = document.getElementById('userAsideContent');
const verifyCheckBtn = document.getElementsByClassName('verifyCheck');
const verify = document.getElementsByClassName('verify');
const clientEmail = document.getElementById('clientEmail');
const verifyClientForm = document.getElementById('verifyClient');
const verifyBackground = document.getElementById('verifyBackground');
const vetYesBtn = document.getElementById('vetYes');
const vetNoBtn = document.getElementById('vetNo');

//add event to background check form content
verifyClientForm.addEventListener('submit', (e)=>{
    e.preventDefault()
})
//add event to background check form yes button
vetYes.addEventListener('click', ()=>{
    let user;
    let userEmail = document.getElementsByClassName('userDets2');
    for(i=0;i<userEmail.length;i++){
        if(userEmail[i].textContent === clientEmail.textContent){
            console.log(userEmail[i].parentNode.parentNode.parentNode.firstElementChild.lastElementChild)
            userEmail[i].parentNode.parentNode.parentNode.firstElementChild.firstElementChild.style.color = 'green';
            userEmail[i].parentNode.parentNode.parentNode.firstElementChild.firstElementChild.textContent = 'VERIFIED';
            userEmail[i].parentNode.parentNode.parentNode.firstElementChild.lastElementChild.checked = true;
            verifyBackground.style.display = 'none';
            userEmail[i].parentNode.parentNode.parentNode.style.maxHeight = '0px';
            userEmail[i].parentNode.parentNode.parentNode.style.boxShadow = 'none';
            user = userEmail[i].parentNode.parentNode.parentNode;
        }
        setTimeout(()=>{
            user.style.display = 'none'
        },2500)
    }
})
//add event to background check form no button
vetNoBtn.addEventListener('click', ()=>{
    verifyBackground.style.display = 'none';
})
//add event to verify user on checkbox;
for(i=0; i<verifyCheckBtn.length; i++){
    verifyCheckBtn[i].addEventListener('click', (e)=>{
        e.preventDefault();
        verifyBackground.style.display = 'flex';
        const target = e.target;
        const realTarget = target.parentNode.parentNode.lastElementChild.firstElementChild.lastElementChild.textContent;
        clientEmail.textContent = realTarget;
    })
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