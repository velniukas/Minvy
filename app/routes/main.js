
module.exports = function() {};

// Miscellaneous routes
module.exports.home = function(req, res){
  log.info(req.user);
  res.render('main', {
    title: 'Home'
  });
};

module.exports.about = function(req, res){
  res.render('default', {
    title: 'About'
  });
};

module.exports.auth = function(req, res){
  res.render('users/login', {
    title: 'Log In'
  });
};

module.exports.registration = function(req, res){
	res.render('pages/new', {
		title: 'Welcome', 
		page: {}
	});
};