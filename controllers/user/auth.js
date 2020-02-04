const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const Users = require('../../models/user/users');
const errorFormatter = require('../../utils/validationerrorFormatter')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

exports.getLogin = (req,res,next)=>{
    res.render('user/login',{
        isAuthenticated:req.session.isLoggedIn,
        errorMessage: req.flash('error'),
        error:{}
    })
}

exports.getSignup = (req,res,next)=>{
    res.render('user/signup',{
        isAuthenticated:req.session.isLoggedIn,
        errorMessage: req.flash('error'),
        error:{},value:{}
    })
}

exports.postLogin = (req,res,next)=>{
    const email =req.body.email;
    const password= req.body.password;

    const errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('user/login',{
            error:errors.mapped(),
            isAuthenticated:req.session.isLoggedIn,
            errorMessage: req.flash('error')
        })
    }

    Users.findOne({email:email})
    .then(user=>{
        if(!user){
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login')
        }
        bcrypt.compare(password , user.password)
        .then(doMatch=>{
         if(doMatch){
             req.session.isLoggedIn =true;
             req.session.user = user;
             return req.session.save(err=>{
                res.redirect('/');
                console.log(err);
             })
         }
         req.flash('error', 'Invalid Email or Password');
         res.redirect('/login');
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/login');
        })
    })
    .catch(err=>{
        console.log(err);
    })
};


exports.postSignup = (req,res,next)=>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const gender = req.body.gender;
    const phone = req.body.phone;

    const errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('user/signup',{
            error:errors.mapped(),
            isAuthenticated:req.session.isLoggedIn,
            errorMessage: req.flash('error'),
            value:{
               name:name,email:email,password:password,phone:phone
            }
        })
    }



 Users.findOne({email:email})
   .then(userDoc=>{
       if(userDoc){
        req.flash('error', 'Email exists already');
           return res.redirect('/signup');
       }

         return bcrypt.hash(password, 12 )
         .then(hashedPassword=>{
            const users = new Users({
                name:name,
                email:email,
                password:hashedPassword,
                gender:gender,
                phone:phone
            });
            return users.save();
           })
           .then(result=>{
            res.redirect('/login');
               return transporter.sendMail({
                   to:email,
                   from: 'shafiswe7@gmail.com',
                   subject:'Sign up successful ',
                   html: '<h1> you Successfully Signed up!</h1>'
               });
           })
           .catch(err=>{
               console.log(err);
           });
   })
   .catch(err=>{
       console.log(err);
   })
};

exports.postLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
    })
};

exports.getReset = (req,res,next)=>{
    res.render('user/reset',{
        isAuthenticated:req.session.isLoggedIn,
        errorMessage: req.flash('error')
    })
};


exports.postReset = (req,res,next)=>{
 crypto.randomBytes(32, (err,buffer)=>{
   if(err){
       return res.redirect('/reset');
   }
   const token = buffer.toString('hex');
   Users.findOne({email:req.body.email})
   .then(user=>{
       if(!user){
           req.flash('error','No account with that email found');
           return res.redirect('/reset');
       }
       user.resetToken = token;
       user.resetTokenExpiration = Date.now() + 3600000;
       return user.save();
   })
   .then(result=>{
       res.redirect('/');
    transporter.sendMail({
        to:req.body.email,
        from: 'shafiswe7@gmail.com',
        subject:'Password Reset ',
        html: `
        <p>you requsted for password reset</p>
        <p>click this <a href="http://localhost:3000/reset/${token}">link</a></p>
        `
    });
   })
   .catch(err=>{
       console.log(err)
   });
 });
};

exports.getNewPassword=(req,res,next)=>{
    const token =req.params.token;
    Users.findOne({resetToken: token, resetTokenExpiration: {$gt:Date.now()}})
    .then(user=>{
        res.render('user/new-password',{
            isAuthenticated:req.session.isLoggedIn,
            userId:user._id.toString(),
            passwordToken:token,
            errorMessage: req.flash('error')
        })
    })
    .catch(err=>{
        console.log(err)
    });
};


exports.postNewPassword = (req,res,next)=>{
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;


    Users.findOne({resetToken:passwordToken, resetTokenExpiration:{$gt:Date.now()}, _id: userId})
    .then(user=>{
        resetUser=user;
        return bcrypt.hash(newPassword, 12)
    })
    .then(hashedPassword=>{
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;

        return resetUser.save();
    })
    .then(result=>{
        res.redirect('/login');
       })
    .catch(err=>{
        console.log(err)
    })
}