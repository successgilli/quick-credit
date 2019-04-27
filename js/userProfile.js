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