Template.newItem.onCreated( function() {
	let id = Router.current().params.courseId;
  Template.instance().subscribe('sections', id);
});

Template.newItem.helpers({
  log(){
    console.log(this);
    return this;
  },
  typeIs(){
    console.log(this.type);
    return this.type;
  }
});


Template.newItem.events({
  'submit #newSectionForm' : function(event, template) {
    

    event.preventDefault();


    let sectionName = template.find('#sectionName').value;
    let sectionContent = template.find('#sectionContent').value;


    let newSection = {
      'type' : "section",
      'name' : sectionName,
      'content' : sectionContent,
      'parent' : Router.current().params.courseId,
      'createdBy' : Meteor.userId()
    }

    Meteor.call('addItem', newSection, (error, data) => {
    	if(error){
		  	console.log(error);
		  } 
		  else{
		  	Meteor.call('updateChildren', this._id, 'section', data);
		  } 
    });
  },



  'submit #newSubsectionForm' : function(event, template) {

    event.preventDefault();

    let subsectionName = template.find('#subsectionName').value;
    let subsectionContent = template.find('#subsectionContent').value;

    let newSubsection = {
      'type' : "subsection",
      'name' : subsectionName,
      'content' : subsectionContent,
      'parent' : this._id,
      'classref' : Router.current().params.courseId,
      'createdBy' : Meteor.userId()
    }

    Meteor.call('addItem', newSubsection, (error, data) => {
      if(error){
        console.log(error);
      } 
      else{
        Meteor.call('updateChildren', this._id, 'subsection', data);
      } 
    });
  },

  'submit #newNoteForm' : function(event, template) {

    event.preventDefault();

    let noteContent = template.find('#noteContent').value;

    let newNote = {
      'type' : "note",
      'content' : noteContent,
      'parent' : this._id,
      'classref' : Router.current().params.courseId,
      'createdBy' : Meteor.userId()
    }

    Meteor.call('addItem', newNote, (error, data) => {
      if(error){
        console.log(error);
      } 
      else{
        Meteor.call('updateChildren', this._id, 'note', data);
      } 
    });
  },

  'submit #newSubnoteForm' : function(event, template) {

    event.preventDefault();

    let subnoteContent = template.find('#subnoteContent').value;

    let newSubnote = {
      'type' : "subnote",
      'content' : subnoteContent,
      'parent' : this._id,
      'classref' : Router.current().params.courseId,
      'createdBy' : Meteor.userId()
    }

    Meteor.call('addItem', newSubnote, (error, data) => {
      if(error){
        console.log(error);
      } 
      else{
        Meteor.call('updateChildren', this._id, 'subnote', data);
      } 
    });
  },

});