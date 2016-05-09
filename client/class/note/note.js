Template.note.onCreated( function(){
	Template.instance().subscribe('item', this._id);
	let id = Router.current().params.courseId;
	Template.instance().subscribe('notes', id);
	Template.instance().subscribe('subnotes', id);
});

Template.note.helpers ({
	'loop': function(itemId){
    	let id = itemId;
      	let subnotes = [];
      	for(i=0; i<Items.find({'type':"subnote"},{'parent':itemId}).count();i++){
        	id = Items.findOne({'_id':id}).children.subnote;
          	subnotes.push(Items.findOne({'_id':id}));
     	}
      	return subnotes;
    },
});