var express = require('express');
var router = express.Router();
var user=require('./users');
var passport=require('passport');
const localStratergy=require("passport-local");


router.post("/reg",function(req,res){
  const dets= new userModal({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  });
userModel.register(dets,req.body.password).then(function(registeredUser){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  });
});
})
/* GET home page. */
router.get('/', function(req, res) {
  res.render('registration');
});
router.get('/login', function(req, res) {
  res.render('login');
});
router.get('/profile', function(req, res) {
  res.render('profile');
});
router.get("/profile",isLoggedIn,function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .then(function(user){
    res.render('profile',{user});
  });
});

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  } else {
    res.redirect("/login");
  }
}
router.post(
  "/login",
  passport.authenticate("local",{
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function(req,res){}
)
router.get("/logout",function(req,res){
  req.logOut();
  res.redirect("/");
});
module.exports = router;
