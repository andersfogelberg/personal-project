Template.subsection.onCreated( function(){
	Template.instance().subscribe('item', this._id);
	let id = Router.current().params.courseId;
	Template.instance().subscribe('subsections', id);
	Template.instance().subscribe('notes', id);
	this.isExpanded = new ReactiveVar(false);
});

Template.subsection.helpers ({
	isExpanded: function(){
		return Template.instance().isExpanded.get();
	},
	log(){
		return this;
	},
	collapse(){
		if(Template.instance().isExpanded.get() == false){
			return '>';
		}
		else{
			return 'v';
		}
	},
	'loop': function(itemId){
    	let id = itemId;
      	let notes = [];
      	for(i=0; i<Items.find({'type':"note"},{'parent':itemId}).count();i++){
        	id = Items.findOne({'_id':id}).children.note;
          		notes.push(Items.findOne({'_id':id}));
     	}
      	return notes;
    },
});

Template.subsection.events ({
	'click #subsection-collapse': function(event, template) {
		
		event.preventDefault();

		if(Template.instance().isExpanded.get() == false){
			template.isExpanded.set(true);
		}
		else{
			template.isExpanded.set(false);
		}
	}
});