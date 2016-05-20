Meteor.methods({

  'updateProfile' : function(course) {
    try{
      Profiles.update({'userId':Meteor.userId()},{'$push':{'classes':course}});
    }
    catch( exception ) {
      return exception
    }
  },

  'addProfile' : function(userId){
      try{
        let profile = {
          'userId' : userId,
          'classes' : [],
        };
        Profiles.insert(profile);
      }
      catch(exception){
        return exception;
      }
  },

	'addItem': function( item ) {
 
    	try {
      		let itemId = Items.insert( item );
      		return itemId;
   		} 
   		catch( exception ) {
      		return exception;
    	}
    },

    'updateChildren': function(itemId, childType, childId) {
      try{
        if(childType=='section'){
          let oldChild = Items.findOne({'_id': itemId}).children.section;
          Items.update({'_id': itemId}, {'$set': {'children.section': childId}}, {'upsert': true});
          Items.update({'_id':childId}, {'$set' : {'parent': itemId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'children.section':oldChild}}, {'upsert': true});
          Items.update({'_id':oldChild}, {'$set': {'parent': childId}}, {'upsert': true});
        }
        else if(childType == 'subsection'){
          let oldChild = Items.findOne({'_id': itemId}).children.subsection;
          Items.update({'_id': itemId}, {'$set': {'children.subsection': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'children.subsection':oldChild}}, {'upsert': true});
        }
        else if(childType == 'note'){
          let oldChild = Items.findOne({'_id': itemId}).children.note;
          Items.update({'_id': itemId}, {'$set': {'children.note': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'children.note':oldChild}}, {'upsert': true});
        }
        else if(childType == 'subnote'){
          let oldChild = Items.findOne({'_id': itemId}).children.subnote;
          Items.update({'_id': itemId}, {'$set': {'children.subnote': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'children.subnote':oldChild}}, {'upsert': true});
        }
      }
      catch( exception ) {
          return exception;
      }
    },

    'reverseUpdateChildren': function(itemId, parentId, childId) {
      let itemType = Items.findOne({'_id':itemId}).type;
      try{
        if(itemType === 'section'){
          Items.update({'_id': parentId}, {'$set': {'children.section': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'parent':parentId}}, {'upsert': true});
        }
        else if(itemType === 'subsection'){
          Items.update({'_id': parentId}, {'$set': {'children.subsection': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'parent':parentId}}, {'upsert': true});
        }
        else if(itemType === 'note'){
          Items.update({'_id': parentId}, {'$set': {'children.note': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'parent':parentId}}, {'upsert': true});
        }
        else if(itemType === 'subnote'){
          Items.update({'_id': parentId}, {'$set': {'children.subnote': childId}}, {'upsert': true});
          Items.update({'_id': childId}, {'$set':{'parent':parentId}}, {'upsert': true});
        }
      }
      catch( exception ) {
          return exception;
      }  
    },

    'updateSchoolClasses': function(schoolId, classId){
      try{
        Items.update({'_id':schoolId},{'$push' : {'children' : classId}});
      }
      catch(exception){
        return exception;
      }
    },

    'addComment': function( comment ){
      try {
          let commentId = Comments.insert( comment );
          return commentId;
      } 
      catch( exception ) {
          return exception;
      }
    },

    'removeComments': function(commentId){
      try{
        Comments.remove({'_id': commentId});
      }
      catch(exception){
        return exception;
      }
    },

    'removeSubcomments': function(parentId){
      try{
        Comments.remove({'parent': parentId});
      }
      catch(exception){
        return exception;
      }
    },

    'removeItem': function(itemId){
      try{
        Items.remove({'_id':itemId});
      }
      catch(exception){
        return exception;
      }
    },

    'updateCommentChildren': function(commentId, childId){
      try{
        Comments.update({'_id':commentId},{'$push': {'children': childId}});
      }
      catch(error) {
        return(error);
      }
    },


   });