Template.newClassForm.onCreated(function (){
	Meteor.subscribe('courses');
	Meteor.subscribe('schools');
});

Template.newClassForm.events ({
	'submit form' : function(event, template) {


		event.preventDefault();

		let course = {
			type : "class",
			name : template.find('#courseName').value,
			instructor : {name : template.find('#courseInstructor').value,
						page : template.find('#instructorPage').value},
			children : {},
			'createdBy' : Meteor.userId()
		}
		console.log(Items.findOne({'_id':Router.current().params.schoolId}).children);

		Meteor.call( 'addItem', course, (error, data) => {
      		if(error){
				console.log(error);
			} 
			else{
				let courseId = data;
				let schoolId = Router.current().params.schoolId;
				Meteor.call('updateSchoolClasses', schoolId, courseId, (error) => {
					if(error){
						console.log(error);
					}
					else{
						console.log(courseId);
						console.log(schoolId);
						Router.go(`/classView/${courseId}`);
					}
				});
			} 
		});
	}
});