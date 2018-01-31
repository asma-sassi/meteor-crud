Template.compaigns.onCreated( function(){
	// Meteor.subscribe('compaigns');
	// console.log(Meteor.subscribe('compaigns'));
	this.pagination = new Meteor.Pagination(Compaigns, {
		sort: {
			createdAt: -1
		},
		perPage: 3
	});
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
