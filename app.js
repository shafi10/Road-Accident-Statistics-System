const express= require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const multer = require('multer');

const app= express();

const MONGODB_URI='mongodb://shafi:shafi100@ds143326.mlab.com:43326/project'
const store = new MongoDBStore({
   uri:MONGODB_URI,
   collection:'sessions'
});

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});
db.once('open', function(){
  console.log('Database connection established');
});

const Users = require('./models/user/users');
const userData = require('./routes/user/data');
const authRoutes = require('./routes/user/auth');
const arichaData = require('./routes/admin/aricha');
const sylhetData = require('./routes/admin/sylhet');
const coxData = require('./routes/admin/cox');
const pollData = require('./routes/admin/poll');
const adminData = require('./routes/admin/admin');
const mapData = require('./routes/admin/map');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store:store}))

app.use((req,res,next)=>{
  if(!req.session.user){
    return next();
  }

 Users.findById(req.session.user._id)
  .then(user=>{
    req.user=user;
    next();
  })
  .catch(err=>{
    console.log(err)
 })
})

app.use(userData);
app.use(authRoutes);
app.use(arichaData);
app.use(sylhetData);
app.use(coxData);
app.use(pollData);
app.use(adminData);
app.use(mapData);
app.use((req,res,next)=>{
  let error = new Error('page not found')
  error.status=404
  next(error)
})
app.use((error,req,res,next)=>{
  if(error.status==404){
    return res.render('error/404')
  }
  console.log(error)
  res.render('error/500')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Listening On Port ${port}`));