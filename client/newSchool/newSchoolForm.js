Template.newSchoolForm.onCreated(function (){
	Meteor.subscribe('schools');
});

Template.newSchoolForm.events ({
	'submit form' : function(event, template) {


		event.preventDefault();
		let children = [];

		let school = {
			'type' : "school",
			'name' : template.find('#schoolName').value,
			'children' : children,
			'createdBy' : Meteor.userId()
		}

		Meteor.call( 'addItem', school, (error, data) => {
      		if(error){
				console.log(error);
			} 
			else{
				Router.go(`/searchClasses/${data}`);
			} 
		});

		console.log(school);
	}

  
});