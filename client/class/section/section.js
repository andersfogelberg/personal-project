Template.section.onCreated( function(){
	Template.instance().subscribe('item', this._id);
	let id = Router.current().params.courseId;
	Template.instance().subscribe('sections', id);
	Template.instance().subscribe('subsections', id);
	this.isExpanded = new ReactiveVar(false);
});

Template.section.helpers ({
	isExpanded: function(){
		return Template.instance().isExpanded.get();
	},
	log(){
		console.log(this);
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
      	let subsections = [];
      	for(i=0; i<Items.find({'type':"subsection"},{'parent':itemId}).count();i++){
        	id = Items.findOne({'_id':id}).children.subsection;
          		subsections.push(Items.findOne({'_id':id}));
     	}
      	return subsections;
    },
});

Template.section.events ({
	'click #collapse': function(event, template) {
		
		event.preventDefault();

		if(Template.instance().isExpanded.get() == false){
			template.isExpanded.set(true);
		}
		else{
			template.isExpanded.set(false);
		}
	}
});