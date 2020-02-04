const mongoose=require('mongoose');
const Admin = require('../../models/admin/Admin');
const Data = require('../../models/user/data');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const errorFormatter = require('../../utils/validationerrorFormatter')

const Item_per_page = 2;
exports.getDashboard = (req,res,next)=>{
    /*Data.find().populate()
    .then(result=>{
        res.render('admin/dashboard',{
            result:result
        })
    })
    .catch(err=>{
        console.log(err);
    })*/

    const page = +req.query.page || 1 ;
    let totalItems;

    Data.find().countDocuments().then(numProducts =>{
        totalItems = numProducts;
        return Data.find().skip((page-1) * Item_per_page)
        .limit(Item_per_page)
    })
    .then(result=>{
        res.render('admin/dashboard',{
            result:result,
            currentPage:page,
            hasNextPage: Item_per_page *page<totalItems,
            hasPreviousPage: page > 1,
            nextPage : page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / Item_per_page)

        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getDashboardDetails = (req,res,next)=>{
    const id = req.params.id
    Data.findById(id).populate('userId')
     .then(result=>{
        // console.log(result)
        res.render('admin/data-details',{
            result:result
        })
     })
     .catch(err=>{
         console.log(err);
     })
}

exports.getSignUp =(req,res,next)=>{
   res.render('admin/adminsignup')
}
exports.postSignUp =(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({email:email})
    .then(admi=>{
        if(admi){
         return res.redirect('/signUp');
        }

        return bcrypt.hash(password, 12)
        .then(hashedpass=>{
            const admin = new Admin({
                email:email,
                password:hashedpass
            })
    
            return admin.save();
        })
        .then(result=>{
            res.redirect('/')
        });

    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getLogIn = (req,res,next)=>{
  res.render('admin/adminlogin',{
      error:{},
      authenticated:req.session.loggedIn
  })
}

exports.postLogIn = (req,res,next)=>{

    const errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('admin/adminlogin',{
            error:errors.mapped()
        })
    }

    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({email:email})
    .then(admin=>{
        if(!admin){
            return res.redirect('/adminlog')
        }

        bcrypt.compare(password, admin.password)
        .then(result=>{
            if(result){
                req.session.loggedIn=true;
                req.session.admin = admin;
                return req.session.save(err=>{
                    console.log(err);
                    res.redirect('/dashboard')
                })
            }
            res.redirect('/adminlog');
        })
        .catch(err=>{
            console.log(err)
        })
    })
}

exports.postLogOut = (req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
    })
}
