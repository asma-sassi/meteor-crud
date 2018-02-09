import { publishPagination } from 'meteor/kurounin:pagination';

publishPagination(Compaigns);

Meteor.publish('compaigns', function(id){
	return Compaigns.find({_id:id});
});
