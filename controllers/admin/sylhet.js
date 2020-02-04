const mongoose=require('mongoose');
const Sylhet = require('../../models/admin/Sylhet');

exports.getChartSylhet=(req,res,next)=>{
    res.render('chart/sylhet-chart',{
        authenticated:req.session.loggedIn
    })
 };

exports.getSylhet=(req,res,next)=>{
   res.render('sylhet/sylhet')
};

exports.postSylhet=(req,res,next)=>{
    const monthAccident= req.body.monthAccident;
    const month=req.body.month;
    const busAccident=req.body.busAccident;
    const busName=req.body.busName;
    const locationAccident=req.body.locationAccident;
    const location=req.body.location;
    const lat = req.body.lat;
    const lng = req.body.lng;

    const sylhet = new Sylhet({
        monthAccident:monthAccident,
        month:month,
        busAccident:busAccident,
        busName:busName,
        locationAccident:locationAccident,
        location:location,
        lat:lat,
        lng:lng
    })

    sylhet.save()
    .then(result=>{
        console.log('Sylhet created successful');
        res.redirect('/sylhet');
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.getSylhetView=(req,res,next)=>{
    Sylhet.find()
    .then(result=>{
        res.render('sylhet/sylhet-view',{
            result:result
        })
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.postEditSylhet= async (req,res,next)=>{

   const id = req.params.id;

    try {
        let sylhet = await Sylhet.findById(id)
        let monthAccident = sylhet.monthAccident + 1

        await Sylhet.findOneAndUpdate(
            {_id:sylhet._id},
            {$set:{monthAccident}}
        )

        res.redirect('/sylhet/view')
    } catch (error) {
        console.log(error)
    }
};



exports.postEdittSylhet= async (req,res,next)=>{

  const id = req.params.id;

  try {
      let sylhet = await Sylhet.findById(id)
      let busAccident = sylhet.busAccident + 1

      await Sylhet.findOneAndUpdate(
          {_id:sylhet._id},
          {$set:{busAccident}}
      )

      res.redirect('/sylhet/view')
  } catch (error) {
      console.log(error)
  }
};

exports.postEditttSylhet= async (req,res,next)=>{

  const id = req.params.id;

    try {
        let sylhet = await Sylhet.findById(id)
        let locationAccident = sylhet.locationAccident + 1

        await Sylhet.findOneAndUpdate(
            {_id:sylhet._id},
            {$set:{locationAccident}}
        )

        res.redirect('/sylhet/view')
    } catch (error) {
        console.log(error)
    }
};



exports.getSylhetChart=(req,res,next)=>{
    Sylhet.find()
    .then(docs=>{
        res.send(docs);
    })
    .catch(err=>{
        console.log(err);
    })
};