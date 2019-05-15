const registerForm = document.querySelector('.register-wrap');
const loginForm = document.querySelector('.login-wrap');

/** Flash btnClose */
const removeFlash = (target) => {
    const child = target.parentElement.parentElement;
    if(target.classList.contains('closeBtn')){
        child.remove();
    }
}

const formBtn = (dom) => {
    if(dom){
        dom.addEventListener('click', (e) => {
            removeFlash(e.target)
        })
    } 
}

formBtn(registerForm) || formBtn(loginForm)



