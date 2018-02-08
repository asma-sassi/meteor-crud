FlowRouter.route('/welcome', {
	name:'welcome',
	action(){
		BlazeLayout.render('layout', {title:'Winshot Custom Registration', main:'welcome'})
	}
});

FlowRouter.route('/dashboard', {
	name:'dashboard',
	action(){
		BlazeLayout.render('layout', {title:'welcome to dashboard', main:'dashboard'})
	}
});

var adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin',
	triggersEnter: [function(context, redirect) {
		if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
			redirect('/welcome');
		}
		console.log('running group triggers for admin');
	}]
});

// handling /admin route
adminRoutes.route('/', {
	action: function() {
		BlazeLayout.render('layout', {title:'welcome to admin', main:'admin'});
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /admin trigger');
	}]
});

var webmasterRoutes = FlowRouter.group({
	prefix: '/webmaster',
	name: 'webmaster',
	triggersEnter: [function(context, redirect) {
		if (!Roles.userIsInRole(Meteor.user(), ['webmaster'])) {
			redirect('/welcome');
		}
		console.log('running group triggers for webmaster');
	}]
});

// handling /webmaster route
webmasterRoutes.route('/', {
	action: function() {
		BlazeLayout.render('layout', {title:'welcome to webmaster', main:'webmaster'})
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /webmaster trigger');
	}]
});

var winshooterRoutes = FlowRouter.group({
	prefix: '/winshooter',
	name: 'winshooter',
	triggersEnter: [function(context, redirect) {
		if (!Roles.userIsInRole(Meteor.user(), ['winshooter'])) {
			redirect('/welcome');
		}
		console.log('running group triggers for winshooter');
	}]
});

// handling /winshooter route
winshooterRoutes.route('/', {
	action: function() {
		BlazeLayout.render('layout', {title:'welcome to winshooter', main:'winshooter'})
	},
	triggersEnter: [function(context, redirect) {
		console.log('running /winshooter trigger');
	}]
});

FlowRouter.route('/compaigns', {
	name: 'compaigns',
	action(){
		BlazeLayout.render('layout', {title:'Compaigns List', main:'compaigns'})
	}
});

FlowRouter.route('/compaigns/:_id', {
	name: 'compaign',
	action(params){
		console.log(params);
		BlazeLayout.render('layout', {title:'Details', main:'compaign'})
	}
});