Template.courseView.onCreated( function() {
	let id = Router.current().params.courseId;
	Template.instance().subscribe('item', id);
	Template.instance().subscribe('sections', id);
  Meteor.subscribe('profiles');
  Meteor.subscribe('courses');
});

Template.courseView.helpers ({
	course(){
		let course = Items.findOne({'_id': Router.current().params.courseId});
    	if ( course ) {
    	  return course;
    	}
  	},

  	'loop': function(itemId){
    	let id = itemId;
      	let sections = [];
      	for(i=0; i<Items.find({'type':"section"},{'parent':itemId}).count();i++){
        	id = Items.findOne({'_id':id}).children.section;
          		sections.push(Items.findOne({'_id':id}));
     	}
      	return sections;
    },

/*	loop(){ 

		let pointer = Items.findOne({'_id':this});
  		console.log(Items.find());
  		let sections = [pointer];
  		for(i=0; i<Items.find({'type':"section"}).count();i++){
  			if( typeof Items.findOne({'_id': pointer._id}) != 'undefined'){
  				pointer = Items.findOne({'_id':pointer._id}).children.section;
  				sections.push(Items.findOne({'_id':pointer}));
  				console.log('poointer' + pointer);
  			}
  			console.log('loop test');

  		}
  		console.log(sections);
  		return sections;
  	},*/



/*  	log(){
  		console.log(this);
  		return this;
  	},*/


  	

/*  	child( item ){
  		let id = Items.findOne({'_id':item}).children.section;
  		let child = Items.findOne({'_id': id});
  		if (child) {
  			return child;
  		}

  	}*/



});
Template.courseView.events({
  'click #addToUserClasses' : function(event, template){
    event.preventDefault();
    if(Profiles.findOne({'userId':Meteor.userId()})==null){
      Meteor.call('addProfile',Meteor.userId());
    }
    let course = Items.findOne({'_id':Router.current().params.courseId})._id;
    Meteor.call('updateProfile', course, (error) => {
      if(error){
        console.log(error);
      }
      else{
        Router.go(`/userClasses`);
      }
    });
  }
});