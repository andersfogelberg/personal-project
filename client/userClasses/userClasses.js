Template.userClasses.onCreated( function() {
	Meteor.subscribe('courses');
  Meteor.subscribe('profiles');
  console.log(Meteor.userId());
});

Template.userClasses.helpers({
    'classes' : function(){
      console.log(Meteor.userId());
        console.log(Profiles.findOne({'userId' : Meteor.userId()}));
        let classes = Profiles.findOne({'userId' : Meteor.userId()}).classes;
        console.log(classes);
        return classes;
    },
    'class' : function(){
      console.log(this.toString());
        let course = Items.findOne({'_id':this.toString()});
        console.log(course);
        return course;
    }
});

