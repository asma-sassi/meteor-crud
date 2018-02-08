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
		Accounts.createUser({
			username: usernameVar,
			password: passwordVar
		}, function(error) {
			if (error) {
				console.log("Error: " + error.reason);
			} else {
				// Meteor.loginWithPassword(usernameVar, passwordVar);
				// FlowRouter.go('/winshooter');
				// console.log('going to /winshooter');
				Meteor.loginWithPassword(usernameVar, passwordVar, function(error){
					if(error){
						console.log(error.reason);
					} else {
						FlowRouter.go('/winshooter');
						console.log('going to /winshooter');
						console.log(Meteor.user().roles);
					}
				});
			}
		});
	},
	'click .click-login': function(event){
		FlowRouter.go('/login');
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
					} else {
						FlowRouter.go('/winshooter');
						console.log('going to /winshooter');
					}
					console.log(Meteor.user().roles);
				}
			}
		});
	},
	'click .click-register': function(event){
		FlowRouter.go('/register');
	}
});
Template.header.events({
	'click .register': function(event){
		FlowRouter.go("/register");
	},
	'click .login': function(event){
		FlowRouter.go("/login");
	},
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/');
	},
	'click .welcome': function(event){
		FlowRouter.go('/');
	}
});

Template.dashboard.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/');
	}
});

Template.admin.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/');
	}
});

Template.winshooter.events({
	'click .logout': function(event){
		event.preventDefault();
		Meteor.logout();
		FlowRouter.go('/');
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


