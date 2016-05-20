Template.searchSchool.onCreated( function() {
	Meteor.subscribe('schools');
});

Template.searchSchool.helpers({
	'schools' : function(){
		let school = Items.find({'type':"school"},{sort:{'name':1}}).fetch();
		console.log(school);
    	return school;
  	},



});
