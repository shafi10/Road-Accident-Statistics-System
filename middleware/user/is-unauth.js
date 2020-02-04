exports.isUnAuthenticated = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect('/profile')
    }
    next()
}