const mongoose=require('mongoose');
const Aricha = require('../../models/admin/Aricha');

const { validationResult } = require('express-validator');
const errorFormatter = require('../../utils/validationerrorFormatter')

exports.getChart=(req,res,next)=>{
   res.render('chart/aricha-chart',{
    authenticated:req.session.loggedIn
   })
};

exports.getAricha = (req,res,next)=>{
   res.render('aricha/aricha',{
       error:{}
   })
};

exports.postAricha = (req,res,next)=>{

    const errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()){
        return res.render('aricha/aricha',{
            error:errors.mapped()
        })
    }

    const monthAccident= req.body.monthAccident;
    const month=req.body.month;
    const busAccident=req.body.busAccident;
    const busName=req.body.busName;
    const locationAccident=req.body.locationAccident;
    const location=req.body.location;
    const lat = req.body.lat;
    const lng = req.body.lng;

    const aricha = new Aricha({
        monthAccident:monthAccident,
        month:month,
        busAccident:busAccident,
        busName:busName,
        locationAccident:locationAccident,
        location:location,
        lat:lat,
        lng:lng
    })

    aricha.save()
    .then(result=>{
        console.log('created');
        res.redirect('/admin');
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.viewAricha = (req,res,next)=>{

      Aricha.find()
      .then(result=>{
        res.render('aricha/aricha-view',{
            result:result
           })
      })
      .catch(err=>{
          console.log(err)
      })
 };

 /*
 exports.getEditAricha= (req,res,next)=>{
     const ariId =req.params.arichaId;

     Aricha.findById(ariId)
     .then(result=>{
        res.render('aricha/aricha-edit',{
            result:result
        })
     })
     .catch(err=>{
         console.log(err);
     })
 };
 */

 exports.postEditAricha= async (req,res,next)=>{
     /*
    const ariId =req.body.arichaId;

    const updateMonthAccident=req.body.monthAccident;
    //const updateMonth=req.body.month;

    Aricha.findById(ariId)
    .then(result=>{
        result.monthAccident=updateMonthAccident;
        //result.month=updateMonth;
        return result.save();
    })
    .then(resul=>{
        console.group('updated');
        res.redirect('/admin/view');
    })
    .catch(err=>{
        console.log(err);
    })
    */

    const id = req.params.id;

    try {
        let aricha = await Aricha.findById(id)
        let monthAccident = aricha.monthAccident + 1

        await Aricha.findOneAndUpdate(
            {_id:aricha._id},
            {$set:{monthAccident}}
        )

        res.redirect('/admin/view')
    } catch (error) {
        console.log(error)
    }
 };

 /*
 exports.getEdittAricha= (req,res,next)=>{
    const ariId =req.params.arichaId;

    Aricha.findById(ariId)
    .then(result=>{
       res.render('aricha/aricha-editt',{
           result:result
       })
    })
    .catch(err=>{
        console.log(err);
    })
};
*/

exports.postEdittAricha= async (req,res,next)=>{
    /*
   const ariId =req.body.arichaId;

   const updateBusAccident=req.body.busAccident;
   //const updateBusName=req.body.busName;

   Aricha.findById(ariId)
   .then(result=>{
       result.busAccident=updateBusAccident;
       //result.busName=updateBusName;
       return result.save();
   })
   .then(resul=>{
       console.group('updated');
       res.redirect('/admin/view');
   })
   .catch(err=>{
       console.log(err);
   })

   */
  const id = req.params.id;

    try {
        let aricha = await Aricha.findById(id)
        let busAccident = aricha.busAccident + 1

        await Aricha.findOneAndUpdate(
            {_id:aricha._id},
            {$set:{busAccident}}
        )

        res.redirect('/admin/view')
    } catch (error) {
        console.log(error)
    }
};

/*
exports.getEditttAricha= (req,res,next)=>{
    const ariId =req.params.arichaId;

    Aricha.findById(ariId)
    .then(result=>{
       res.render('aricha/aricha-edittt',{
           result:result
       })
    })
    .catch(err=>{
        console.log(err);
    })
};
*/

exports.postEditttAricha= async (req,res,next)=>{
    /*
   const ariId =req.body.arichaId;

   const updatelocationAccident=req.body.locationAccident;
   //const updateLocation=req.body.location;

   Aricha.findById(ariId)
   .then(result=>{
       result.locationAccident=updatelocationAccident;
       //result.location=updateLocation;
       return result.save();
   })
   .then(resul=>{
       console.group('updated');
       res.redirect('/admin/view');
   })
   .catch(err=>{
       console.log(err);
   })
*/

const id = req.params.id;

    try {
        let aricha = await Aricha.findById(id)
        let locationAccident = aricha.locationAccident + 1

        await Aricha.findOneAndUpdate(
            {_id:aricha._id},
            {$set:{locationAccident}}
        )

        res.redirect('/admin/view')
    } catch (error) {
        console.log(error)
    }

};

exports.getArichaChart=(req,res,next)=>{
    Aricha.find()
    .then(docs=>{
        res.send(docs);
    })
    .catch(err=>{
        console.log(err);
    })
};
