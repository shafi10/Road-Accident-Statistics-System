const mongoose=require('mongoose');
const Poll = require('../../models/admin/Poll');

exports.getCreate=(req,res,next)=>{
    res.render('poll/create')
};

exports.postCreate= async (req,res,next)=>{
    let {title, description , options} = req.body

    options = options.map(opt=>{
        return {
            name:opt,
            vote:0
        }
    })
    
    let poll= new Poll({
        title,
        description,
        options
    })

    try {
        await poll.save()
        res.redirect('/polls')
    } catch (error) {
        console.log(error)
    }

};

exports.getAllPolls= async (req,res,next)=>{
  try {
      let polls = await Poll.find()
      res.render('poll/polls',{
          polls,
          authenticated:req.session.loggedIn
      })
  } catch (error) {
      consile.log(error)
  }
}

exports.manageAllPolls= async (req,res,next)=>{
    try {
        let polls = await Poll.find()
        res.render('poll/manage-poll',{
            polls
        })
    } catch (error) {
        consile.log(error)
    }
  }

  exports.deletePoll = (req,res,next)=>{
      const id = req.body.pollId;
      Poll.findByIdAndDelete(id)
      .then(()=>{
          console.log('poll deleted')
          res.redirect('/managepolls')
      })
      .catch(err=>{
          console.log(err)
      })
  }

exports.viewPollGetController= async (req,res,next)=>{
    let id = req.params.id
    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]
        let result = []
        options.forEach(option=>{
            let percentage = (option.vote * 100)/ poll.totalVote
            result.push({
                ...option._doc,
                percentage:percentage ? percentage:0
            })
        })

        res.render('poll/viewPoll', {
            poll,
            result,
            authenticated:req.session.loggedIn

        })
    } catch (error) {
        console.log(error)
    }
}


exports.viewPollPostController = async (req,res,next)=>{
    let id = req.params.id
    let optionId = req.body.option

    try {
     let poll = await Poll.findById(id)

    let options = [...poll.options]
    let index = options.findIndex(o=> o.id == optionId)
    options[index].vote = options[index].vote + 1

    let totalVote = poll.totalVote + 1;

     await Poll.findOneAndUpdate(
         {_id:poll._id},
         {$set:{options, totalVote}}
        )
       res.redirect('/polls/' + id)
    } catch (error) {
      console.log(error);  
    }
}