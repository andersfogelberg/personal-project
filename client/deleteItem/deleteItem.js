Template.deleteItem.onCreated( function() {
	let id = Router.current().params.courseId;
  	Template.instance().subscribe('sections', id);
});


Template.deleteItem.events({
	'click #deleteItem': function(){
		let itemId = this._id;
		let parentId = this.parent;
		let childId;
		if(this.type === "section"){
			console.log(this.children.section);
			childId = this.children.section;
		}
		else if(this.type === "subsection"){
			childId = this.children.subsection;
		}
		else if(this.type === "note"){
			childId = this.children.note;
		}
		else if(this.type === "subnote"){
			childId = this.children.subnote;
		}
		Meteor.call('reverseUpdateChildren', itemId, parentId, childId);
		Meteor.call('removeItem', itemId, (error) => {
			if(error){
				console.log(error);
			}
		})
	}
});

