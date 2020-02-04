const Data = require('../../models/user/data');
const Users = require('../../models/user/users');
const path = require('path');
const { validationResult } = require('express-validator');
const errorFormatter = require('../../utils/validationerrorFormatter')

exports.getAddData= (req,res,next)=>{
    res.render('home',{
        isAuthenticated:req.session.isLoggedIn
    });
}

exports.getAddDatainfo= (req,res,next)=>{
    res.render('user/information',{
        isAuthenticated:req.session.isLoggedIn,
        successMessage: req.flash('success'),
        error:{}
    });
};

exports.postAddDatainfo = (req,res,next)=>{
    
    const errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('user/information',{
            error:errors.mapped(),
            isAuthenticated:req.session.isLoggedIn,
            successMessage: req.flash('success')
        })
    }

    const roadname = req.body.roadname;
    const noaccident = req.body.noaccident;
    const location = req.body.location;
    const busname = req.body.busname;
    const month  = req.body.month;
    const image = req.file;


    const imageUrl = image.path;

    const data = new Data({
        roadname:roadname,
        noaccident:noaccident,
        location:location,
        busname:busname,
        month:month,
        imageUrl:imageUrl,
        userId:req.user
    });

    data
    .save()
    .then(result=>{
        req.flash('success', 'Information Submitted Successfuly');
        console.log('created');
        res.redirect('/info');

    })
    .catch(err=>{
        console.log(err);
    })
};

exports.getProfile = async (req,res,next)=>{
    try {
        let result = await Data.find({userId:req.user._id})
        let user = await Users.find({_id:req.user._id})

        res.render("user/profile",{
            result:result,
            user:user,
            isAuthenticated:req.session.isLoggedIn
        })
    } catch (error) {
        console.log(err)
    }
}
