Meteor.publish('compaigns', function(){
	return Compaigns.find({});
});