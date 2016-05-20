Template.subnote.onCreated( function(){
  Template.instance().subscribe('item', this._id);
  let id = Router.current().params.courseId;
  Template.instance().subscribe('notes', id);
  Template.instance().subscribe('subnotes', id);
});

Template.subnote.helpers ({
    'log': function(){
      return this;
    },
    'createdByUser': function(){
      console.log(this.createdBy);
      console.log(Meteor.userId());
      if(this.createdBy === Meteor.userId()){
        console.log('true');
        return true;
      } else{
        return false;
      }
    }
});