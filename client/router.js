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

// FlowRouter.route( '/admin', {
// 	name: 'admin',
// 	triggersEnter: [], 
// 	action: function() {
// 		BlazeLayout.render('layout', {title:'welcome to admin', main:'admin'})
// 		console.log("You're in admin page");
// 	},
// 	triggersExit: [ function() { 
// 		console.log( "Something to do on EXIT." ); 
// 	}],
// });

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

FlowRouter.route('/webmaster', {
	name:'webmaster',
	action(){
		BlazeLayout.render('layout', {title:'welcome to webmaster', main:'webmaster'})
	}
});

FlowRouter.route('/winshooter', {
	name:'winshooter',
	action(){
		BlazeLayout.render('layout', {title:'welcome to winshooter', main:'winshooter'})
	}
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