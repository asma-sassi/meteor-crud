Template.compaigns.onCreated( function(){
	// Meteor.subscribe('compaigns');
	this.pagination = new Meteor.Pagination(Compaigns, {
			sort: {createdAt: -1}, perPage: 3}
		);
});

Template.compaign.onCreated( function(){
	var template = this;
	var id = FlowRouter.getParam('_id');
	Tracker.autorun(function() {
		template.subscribe('compaigns', id);
	});
});

Template.compaign.helpers({
	postData: function() {
		var post = Compaigns.findOne({_id: FlowRouter.getParam('_id')});
		return post;
	}
});

Template.compaigns.helpers({
	/*compaigns: function(){
		return Compaigns.find({}, { sort: { createdAt: -1 } });
	},*/
	isReady: function () {
		return Template.instance().pagination.ready();
	},
	templatePagination: function () {
		return Template.instance().pagination;
	},
	compaigns: function () {
		return Template.instance().pagination.getPage();
	},
	// optional helper used to return a callback that should be executed before changing the page
	clickEvent: function() {
		return function(e, templateInstance, clickedPage) {
			e.preventDefault();
			console.log('Changing page from ', templateInstance.data.pagination.currentPage(), ' to ', clickedPage);
		};
	},
	currentUser: function() {
		if(Meteor.user()){
			var username = Meteor.user().username;
			var roles = Meteor.user().roles;
			console.log("username: "+username," roles: "+roles);
			return Meteor.user();
		}
	}
});

Template.register.events({
	'submit form': function(event) {
		event.preventDefault();
		var usernameVar = event.target.registerUsername.value;
		var passwordVar = event.target.registerPassword.value;
		console.log("Form submitted.");
		Accounts.createUser({
			username: usernameVar,
			password: passwordVar
		}, function(error) {
			if (error) {
				console.log("Error: " + error.reason);
			} else {
				document.location.reload(true);
				Meteor.loginWithPassword(usernameVar, passwordVar);
				// FlowRouter.go("/dashboard");
			}
		});
	},
	'click .click-login': function(event){
		BlazeLayout.render('layout', {main:'login'})
	}
});

Template.login.events({
	'submit form': function(event) {
		event.preventDefault();
		var usernameVar = event.target.loginUsername.value;
		var passwordVar = event.target.loginPassword.value;
		// Meteor.loginWithPassword(usernameVar, passwordVar);
		Meteor.loginWithPassword(usernameVar, passwordVar, function(error){
			if(error){
				console.log(error.reason);
			} else {
				if(Meteor.user()){
					if(Roles.userIsInRole(Meteor.user(), ['admin'])){
						FlowRouter.go('/admin');
					} else if(Roles.userIsInRole(Meteor.user(), ['webmaster'])){
						FlowRouter.go('/webmaster');
					} else {
						FlowRouter.go('/winshooter');
					}
					console.log(Meteor.user());
				}
			}
		});
	},
	'click .click-register': function(event){
		BlazeLayout.render('layout', {main:'register'})
	}
});

Template.dashboard.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/welcome');
	}
});

Template.admin.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/welcome');
	}
});

Template.webmaster.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/welcome');
	}
});

Template.winshooter.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/welcome');
	}
});



Template.compaigns.events({
	'click .insert_compaign': function(e) {
		e.preventDefault();
		Session.set('compaign-doc-to-add', this);
		$('#add_compaign').modal('show');
	}
});

Template.editCompaign.helpers({
	editCompaignDoc: function() {
		return Session.get('compaign-doc-to-edit');
	}
});

Template.item.events({
	'click .edit_compaign': function(e) {
		e.preventDefault();
		Session.set('compaign-doc-to-edit',this);
		$('#edit_compaign').modal('show');
	}
});

Template.item.events({
	'click .delete_compaign': function(){
		return Compaigns.remove(this._id);
	}
});

AutoForm.addHooks(['updateCompaignForm'], {
	onSuccess: function(operation, result) {
		$('#edit_compaign').modal('hide');
	}
});

AutoForm.addHooks(['insertCompaignForm'], {
	onSuccess: function(operation, result) {
		$('#add_compaign').modal('hide');
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY',
});


