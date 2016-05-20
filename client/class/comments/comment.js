Template.comment.onCreated( function(){
	Template.instance().subscribe('comments');
	Template.instance().subscribe('users');
});

Template.comment.helpers({
	'comments': function(){
		let comments = Comments.find({'parent':this._id},{'sort':{'timestamp':-1}});
		return comments;
	},
	'subComments': function(){
		let subComments = Comments.find({'parent':this._id},{'sort':{'timestamp':-1}});
		return subComments;
	},
	'createdByUser': function(){
		if(this.createdBy.id == Meteor.userId()){
			return true;
		} else{
			return false;
		}
	},
	'responseToUser': function(){
		if(Comments.findOne({'_id': this.parent}).createdBy.id == Meteor.userId()){
			return true;
		} else{
			return false;
		}
	},
});

Template.comment.events({
	'submit #newSubCommentForm': function(event, template) {
		event.preventDefault();

		console.log(this);

		let content = template.find('#subCommentContent'+this._id).value;

		let newComment = {
			'type': "subcomment",
			'content': content,
			'parent': this._id,
			'createdBy': {
				'id': Meteor.userId(),
				'email': Meteor.users.findOne({'_id': Meteor.userId()}).emails[0].address,
			},
			'timestamp': (new Date()).getTime(),
		}

		Meteor.call('addComment', newComment, (error, data) => {
			if(error){
				console.log(error);
			} else{
				console.log(data);
				Meteor.call('updateCommentChildren', this._id, data);
			}
		});
	},
	'click #delete-comment': function(event, template) {
		
		event.preventDefault();

		Meteor.call('removeSubcomments', this._id, (error) => {
			if(error){
				console.log(error);
			}
		});
		Meteor.call('removeComments', this._id, (error) => {
			if(error){
				console.log(error);
			}
		});
	},
	'click #delete-subcomment': function(event, template) {
		
		event.preventDefault();

		Meteor.call('removeComments', this._id, (error) => {
			if(error){
				console.log(error);
			}
		});
	},
});
