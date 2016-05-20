Template.commentsBar.onCreated( function(){
	Template.instance().subscribe('comments');
	Template.instance().subscribe('users');
	this.isExpanded = new ReactiveVar(false);
});

Template.commentsBar.helpers({
	isExpanded: function(){
		return Template.instance().isExpanded.get();
	},
	'numUnanswered': function(){
		let comments = Comments.find({'parent':this._id}).fetch();
		console.log(this._id);
		console.log(comments);
		let count = 0;
		for(let i=0; i<comments.length; i++){
			if(comments[i].children.length==0){
				count=count+1;
			}
		}
		return count;
	}
});


Template.commentsBar.events ({
	'click #comment-toggle': function(event, template) {
		
		event.preventDefault();

		if(Template.instance().isExpanded.get() == false){
			template.isExpanded.set(true);
		}
		else{
			template.isExpanded.set(false);
		}
	},

	'submit #newCommentForm': function(event, template) {
		event.preventDefault();

		let content = template.find('#commentContent').value;

		let newComment = {
			'type': "comment",
			'content': content,
			'children': [],
			'parent': this._id,
			'createdBy': {
				'id': Meteor.userId(),
				'email': Meteor.users.findOne({'_id': Meteor.userId()}).emails[0].address,
			},
			'timestamp': (new Date()).getTime(),
		}

		Meteor.call('addComment', newComment, (error) => {
			if(error){
				console.log(error);
			}
		});
	}
});