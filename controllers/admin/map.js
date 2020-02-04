const Aricha = require('../../models/admin/Aricha');
const Sylhet = require('../../models/admin/Sylhet');
const Cox = require('../../models/admin/Cox');

exports.getMap = (req,res,next) =>{
    res.render('map/map',{
        authenticated:req.session.loggedIn
    })
}

exports.arichaMap = async (req,res,next)=>{
  try {
      var aricha = await Aricha.find()
      var d = []

      aricha.forEach(option=>{
          if(option.locationAccident >50){
              d.push(option)
          }
      })
     res.status(201).send(d)

  } catch (error) {
      console.log(error)
  }
} 

exports.arichaMap1 = async (req,res,next)=>{
    try {
        var aricha = await Aricha.find()
        var arr = []
  
        aricha.forEach(option=>{
            if(option.locationAccident<50){
                arr.push(option)
            }
        })
       res.status(201).send(arr)
  
    } catch (error) {
        console.log(error)
    }
}

exports.sylhetMap = async (req,res,next)=>{
    try {
        var sylhet = await Sylhet.find()
        var d = []
  
        sylhet.forEach(option=>{
            if(option.locationAccident>50){
                d.push(option)
            }
        })
       res.status(201).send(d)
  
    } catch (error) {
        console.log(error)
    }
  } 
  
  exports.sylhetMap1 = async (req,res,next)=>{
      try {
          var sylhet = await Sylhet.find()
          var arr = []
    
          sylhet.forEach(option=>{
              if(option.locationAccident<50){
                  arr.push(option)
              }
          })
         res.status(201).send(arr)
    
      } catch (error) {
          console.log(error)
      }
  }

  exports.coxMap = async (req,res,next)=>{
    try {
        var cox = await Cox.find()
        var d = []
  
        cox.forEach(option=>{
            if(option.locationAccident>50){
                d.push(option)
            }
        })
       res.status(201).send(d)
  
    } catch (error) {
        console.log(error)
    }
  } 

  exports.coxMap1 = async (req,res,next)=>{
    try {
        var cox = await Cox.find()
        var arr = []
  
        cox.forEach(option=>{
            if(option.locationAccident<50){
                arr.push(option)
            }
        })
       res.status(201).send(arr)
  
    } catch (error) {
        console.log(error)
    }
  } 