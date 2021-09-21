import React from 'react';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount , withOptions} from 'react-mounter';

import  App from '../../ui/App'; 
import  Login from '../../ui/Login'; 
import  SignUp from '../../ui/SignUp'; 


FlowRouter.route('/',{
    name:'App.home',
    action(){
        mount( App );
    }
});

FlowRouter.route('/login',{
    name:'App.login',
    action(){
        mount( Login );
    }
});


FlowRouter.route('/register',{
    name:'App.signup',
    action(){
        mount( SignUp );
    }
});