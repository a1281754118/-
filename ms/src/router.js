export default ({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./vue/login')
    },
    {
      path: '/manager',
      name: 'layout',
      beforeEnter:function(to,from,next){
       var arr ,  reg=/(^| )node_auth=([^;]*)(;|$)/
       arr = document.cookie.match(reg) 
       if(( arr)?unescape(arr[2]):null){
         next();
       }else{
         next({path:'/login',query:{returnUrl:to.fullpath}});
       }
        
      },
      component: () => import('./vue/layout'),
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('./vue/user')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('./vue/order')
        },
        {
          path: 'xixixiugai',
          name: 'xixixiugai',
          component: () => import('./vue/xixixiugai')
        },
        {
          path: 'Administration',
          name: 'Administration',
          component: () => import('./vue/Administration')
        },
        {
          path: 'classification',
          name: 'classification',
          component: () => import('./vue/classification')
        },
        {
          path: 'lunbo',
          name: 'lunbo',
          component: () => import('./vue/lunbo')
        }
      ]

    },
    {
      path: '*',
      component: function(){
        return import('./vue/login')
    }
    }
  ]
})
