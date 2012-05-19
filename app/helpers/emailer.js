var User = load.model('User');
if (path.existsSync(appRoot + '/configLocal.js')) {
  var config = require(appRoot + '/configLocal.js');
  var mail = require('mail').Mail(
    config.getMailConfig()
  );
}

module.exports.sendEmailConfirmation = function(userId) {
	if(everyauth.loggedIn) {
		log.info('Sending mail to '+ everyauth.user.email);
		sendMail( everyauth.user.email, 'minvyswhk@gmail.com', 'Welcome to HatchYolk!', 'Welcome to the wonderful world of lean startups....', '' );
	} else {
		log.warn('Not logged in. Cannot send an email.');
	}
}

module.exports.sendMail = function(to, from, subject, body, template) {
		mail.message({
		  from: from,
		  to: to,
		  subject: subject
		})
		.body(body)
		.send(function(err) {
		  if (err) throw err;
		  console.log('Sent!');
		});
};



