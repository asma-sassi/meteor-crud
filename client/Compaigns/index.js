Template.compaigns.onCreated( function(){
	Meteor.subscribe('compaigns');
	console.log(Meteor.subscribe('compaigns'));
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
	compaigns: function(){
		return Compaigns.find();
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
		var doc = Template.instance().data.data;
		//console.log(Template.instance().data);
		//console.log(Session.get('compaign-doc-to-edit'));
		//return Session.get('compaign-doc-to-edit');
		return doc;
		console.log(doc);
	}
});

Template.compaign.events({
	'click .edit_compaign': function(e, template) {
		e.preventDefault();
		//Session.set('compaign-doc-to-edit', postData);
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
