UserProfileSchema = new SimpleSchema({
	first_name: {
		type: String,
		optional: true
	},
	last_name: {
		type: String,
		optional: true
	},
	age: {
		type: Number,
		optional: true
	},
	phone: {
		type: String,
		regEx: /^[2-9][0-9]{7}$/,
		optional: true
	},
	registred_from: {
		type: String,
		allowedValues: ['web', 'mobile'],
		optional: true,
	}
}, { tracker: Tracker });

userSchema = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{3,15}$/
	},
	emails: {
		type: Array,
		optional: true
	},
	"emails.$": {
		type: Object
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: UserProfileSchema,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	roles: {
		type: Array,
		optional: true,
		defaultValue: ["winshooter"],
		allowedValues: function(){
			return ["admin","web-master","winshooter"];
		} 
	},
	'roles.$': {
		type: String
	},
	// In order to avoid an 'Exception in setInterval callback' from Meteor
	heartbeat: {
		type: Date,
		optional: true
	}
});

Meteor.users.attachSchema(userSchema);

// Meteor.users.after.insert(function(){
// 	var loggedInUser = Meteor.user();
// 	if(Roles.userIsInRole(loggedInUser, ['admin'])) {
// 		return true;
// 		console.log('this is:' +user.roles);
// 	} else
// 	throw new Meteor.Error(403, "Not authorized to create new users");
// });

Meteor.users.after.insert(function (userId, doc) {
	// doc.roles = ["admin"];
	var roles = doc.roles;
	console.log('after insert user'+ roles);
});