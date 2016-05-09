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
          Items.update({'_id': childId}, {'$set':{'children.section':oldChild}}, {'upsert': true});
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

    'updateSchoolClasses': function(schoolId, classId){
      try{
        Items.update({'_id':schoolId},{'$push' : {'children' : classId}});
      }
      catch(exception){
        return exception;
      }
    }

    /*'loop': function(itemId){
    let pointer = Items.findOne({'_id':itemId});
      let sections = [pointer];
      for(i=0; i<Items.find({'type':"section"}).count();i++){
        if( typeof Items.findOne({'_id': pointer._id}) != 'undefined'){
          pointer = Items.findOne({'_id':pointer._id}).children.section;
          sections.push(Items.findOne({'_id':pointer}));
        }

      }
      return sections;
    },*/


   });