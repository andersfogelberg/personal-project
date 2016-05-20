Template.searchClasses.onCreated( function() {
	Meteor.subscribe('courses');
	Meteor.subscribe('schools');
});

Template.searchClasses.helpers({
	'schoolId' : function(){
		let schoolId = Router.current().params.schoolId;
    return schoolId;
  },
  'school' : function(){
  	let school = Items.findOne({'_id':Router.current().params.schoolId}).name;
  	return school;
  },
  'children' : function(){
  	let classes = Items.find({'parent':Router.current().params.schoolId},{'sort':{'name':1}});
  	return classes;
  },
});

