Template.searchSchool.onCreated( function() {
	Meteor.subscribe('schools');
});

Template.searchSchool.helpers({
	'schools' : function(){
		let school = Items.find({'type':"school"}).fetch();
		console.log(school);
    	return school;
  	},



});
