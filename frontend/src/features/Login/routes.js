import LoginView from "./views/LoginView.vue"
export const loginRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('loggedIn')){
                console.log(localStorage.getItem('role') === 0)

                if(+localStorage.getItem('role') === 0){
                    next('/admin');
                }
                else if(+localStorage.getItem('role') === 1){
                    next('/member');
                }
            }
            else{
                console.log("here2222")
                next();
            }
        
        
        }
    }
]
