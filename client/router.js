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