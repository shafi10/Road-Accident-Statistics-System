const mongoose=require('mongoose');
const Cox = require('../../models/admin/Cox');


exports.getChartCox=(req,res,next)=>{
    res.render('chart/cox-chart',{
        authenticated:req.session.loggedIn
    })
 };

exports.getCoxBazar=(req,res,next)=>{
   res.render('cox/cox')
};

exports.postCoxBazar = (req,res,next)=>{
    const monthAccident= req.body.monthAccident;
    const month=req.body.month;
    const busAccident=req.body.busAccident;
    const busName=req.body.busName;
    const locationAccident=req.body.locationAccident;
    const location=req.body.location;
    const lat = req.body.lat;
    const lng = req.body.lng;

    const cox = new Cox({
        monthAccident:monthAccident,
        month:month,
        busAccident:busAccident,
        busName:busName,
        locationAccident:locationAccident,
        location:location,
        lat:lat,
        lng:lng
    })

    cox.save()
    .then(result=>{
        console.log('created');
        res.redirect('/cox');
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.viewCox = (req,res,next)=>{

    Cox.find()
    .then(result=>{
      res.render('cox/cox-view',{
          result:result
         })
    })
    .catch(err=>{
        console.log(err)
    })
};

/*
exports.getEditCox= (req,res,next)=>{
    const cId =req.params.coxId;

    Cox.findById(cId)
    .then(result=>{
       res.render('cox/coxedit',{
           result:result
       })
    })
    .catch(err=>{
        console.log(err);
    })
};
*/
exports.postEditCox= async (req,res,next)=>{
    /*
   const cId =req.body.coxId;

   const updateMonthAccident=req.body.monthAccident;
   //const updateMonth=req.body.month;

   Cox.findById(cId)
   .then(result=>{
       result.monthAccident=updateMonthAccident;
       //result.month=updateMonth;
       return result.save();
   })
   .then(resul=>{
       console.group('updated');
       res.redirect('/cox/view');
   })
   .catch(err=>{
       console.log(err);
   })
   */
  const id = req.params.id;

    try {
        let cox = await Cox.findById(id)
        let monthAccident = cox.monthAccident + 1

        await Cox.findOneAndUpdate(
            {_id:cox._id},
            {$set:{monthAccident}}
        )

        res.redirect('/cox/view')
    } catch (error) {
        console.log(error)
    }
};

/*
exports.getEdittCox= (req,res,next)=>{
    const cId =req.params.coxId;

    Cox.findById(cId)
    .then(result=>{
       res.render('cox/coxeditt',{
           result:result
       })
    })
    .catch(err=>{
        console.log(err);
    })
};
*/
exports.postEdittCox= async (req,res,next)=>{
    /*
   const cId =req.body.coxId;

   const updateBusAccident=req.body.busAccident;
  // const updateBusName=req.body.busName;

   Cox.findById(cId)
   .then(result=>{
       result.busAccident=updateBusAccident;
      // result.busName=updateBusName;
       return result.save();
   })
   .then(resul=>{
       console.log('updated');
       res.redirect('/cox/view');
   })
   .catch(err=>{
       console.log(err);
   })
   */

  const id = req.params.id;

  try {
      let cox = await Cox.findById(id)
      let busAccident = cox.busAccident + 1

      await Cox.findOneAndUpdate(
          {_id:cox._id},
          {$set:{busAccident}}
      )

      res.redirect('/cox/view')
  } catch (error) {
      console.log(error)
  }
};

/*

exports.getEditttCox= (req,res,next)=>{
    const cId =req.params.coxId;

    Cox.findById(cId)
    .then(result=>{
       res.render('cox/coxedittt',{
           result:result
       })
    })
    .catch(err=>{
        console.log(err);
    })

};
*/
exports.postEditttCox= async (req,res,next)=>{
    /*
   const cId =req.body.coxId;

   const updatelocationAccident=req.body.locationAccident;
   //const updateLocation=req.body.location;

   Cox.findById(cId)
   .then(result=>{
       result.locationAccident=updatelocationAccident;
       //result.location=updateLocation;
       return result.save();
   })
   .then(resul=>{
       console.group('updated');
       res.redirect('/cox/view');
   })
   .catch(err=>{
       console.log(err);
   })
   */

  const id = req.params.id;

  try {
      let cox = await Cox.findById(id)
      let locationAccident = cox.locationAccident + 1

      await Cox.findOneAndUpdate(
          {_id:cox._id},
          {$set:{locationAccident}}
      )

      res.redirect('/cox/view')
  } catch (error) {
      console.log(error)
  }
};

exports.getCoxChart=(req,res,next)=>{
    Cox.find()
    .then(docs=>{
        res.send(docs);
    })
    .catch(err=>{
        console.log(err);
    })
};