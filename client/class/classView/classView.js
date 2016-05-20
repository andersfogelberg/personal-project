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
      if(Items.findOne({'_id':id}).children.section != null){
        id = Items.findOne({'_id':id}).children.section;
        sections.push(Items.findOne({'_id':id}));
      }
    }
    return sections;
  },

  'isNotUserClass': function(){
    let userClasses = Profiles.findOne({'userId': Meteor.userId()}).classes;
    let val = true;
    for(let i=0;i<userClasses.length;i++){
      console.log(userClasses[i]);
      console.log(Router.current().params.courseId);
      if(userClasses[i] === Router.current().params.courseId){
        val = false;
      }
    }
    return val;
  },

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