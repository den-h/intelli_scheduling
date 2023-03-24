import {createRouter, createWebHashHistory} from 'vue-router'

import LoginView from "@/view/LoginView";

import LayOut from "@/view/LayOut";
import AllStuff from "@/view/AllStuff";
import AddStuff from "@/view/AddStuff";
import AddShop from "@/view/AddShop";
import AllShop from "@/view/AllShop";
import AlterRule from "@/view/AlterRule";
import LayoutS from "@/view/LayoutS";
import StuffInfo from "@/view/StuffInfo";

export const routes = [
    {
        path: '/layout', name: 'layout', component: LayOut, meta:{authRequired:true},children: [
            {
                path:'/allstuff', name:'allstuff',component:AllStuff
            },
            {
                path: '/addstuff',name: 'addstuff',component: AddStuff
            },
            {
                path: '/addshop',name: 'addshop',component: AddShop
            },
            {
                path: '',name: 'allshop',component: AllShop
            },
            {
                path: '/alterrule',name: 'alterrule',component: AlterRule
            }
        ]
    },

    {
        path: '/layouts', name: 'layouts', component: LayoutS,children: [
            {
                path:'', name:'stuffinfo',component:StuffInfo
            }
        ]
    },

    {
        path: '/', name: 'loginview', component: LoginView
    },

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})


