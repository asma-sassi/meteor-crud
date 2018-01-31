Compaigns = new Mongo.Collection('Compaigns');

CompaignSchema = new SimpleSchema({
	name: {
		type: String,
		optional: true
	},
	category: {
		type: String,
		optional: true,
		label: "Category",
		defaultValue: "Alimentaire",
		allowedValues: function(){
			return ["Alimentaire","Cosmétique","Droguerie"];
		},
		autoform: {
			options: function(){
				return [{value: "Alimentaire", label:"Alimentaire"},
				{value: "Cosmétique", label:"Cosmétique"},
				{value: "Droguerie", label:"Droguerie"}
				];
			}
		}
	},
	type: {
		type: String,
		optional: true
	},
	price: {
		type: Number,
		optional: true
	}
});

Compaigns.attachSchema(CompaignSchema);