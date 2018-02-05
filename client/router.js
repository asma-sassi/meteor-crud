FlowRouter.route('/',{
	name: 'welcome',
	action(){
		BlazeLayout.render('layout', {main:'welcome'});
	}
});

FlowRouter.route('/login',{
	name: 'login',
	action(){
		BlazeLayout.render('layout', {main:'login'});
	}
});

function checkLoggedIn (ctx, redirect) {
	if (!Meteor.userId()) {
		redirect('/compaigns');
	}
}

function redirectIfLoggedIn (ctx, redirect) {
	if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
		redirect('/admin');
	} else if(!Roles.userIsInRole(Meteor.userId(), ['webmaster'])){
		redirect('/webmaster');
	} else {
		redirect('/winshooter');
	}
}

// //check user
// function checkLoggedIn (ctx, redirect) {
// 	if (!Meteor.userId()) {
// 		redirect('/compaigns')
// 	} else if(!Roles.userIsInRole(Meteor.userId(), ['admin'])){
// 		BlazeLayout.render('layout', {main:'admin'});
// 	} else if(!Roles.userIsInRole(Meteor.userId(), ['webmaster'])){
// 		BlazeLayout.render('layout', {main:'webmaster'});
// 	} else {
// 		BlazeLayout.render('layout', {main:'winshooter'});
// 	}
// }

//user routes
var userRoutes = FlowRouter.group({
	prefix: '/user',
	name: 'user-group',
	triggersEnter: [checkLoggedIn]
});



FlowRouter.route('/admin',{
	name: 'admin',
	action(){
		BlazeLayout.render('layout', {main:'admin'});
	}
});

FlowRouter.route('/webmaster',{
	name: 'webmaster',
	action(){
		BlazeLayout.render('layout', {main:'webmaster'});
	}
});

FlowRouter.route('/winshooter',{
	name: 'winshooter',
	action(){
		BlazeLayout.render('layout', {main:'winshooter'});
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