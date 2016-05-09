Meteor.publish('schools', function(){
	return Items.find({'type':"school"});
});
Meteor.publish('courses', function(){
	return Items.find({'type':"class"});
});

Meteor.publish('sections', function(courseId){
	if(courseId){
		return Items.find({'type':"section"},{'parent':courseId})
	}
});

Meteor.publish('subsections', function(courseId){
	if(courseId){
		return Items.find({'type':"subsection"},{'classref':courseId});
	}
});

Meteor.publish('notes', function(courseId){
	if(courseId){
		return Items.find({'type':"note"},{'classref':courseId});
	}
});

Meteor.publish('subnotes', function(courseId){
	if(courseId){
		return Items.find({'type':"subnote"},{'classref':courseId});
	}
});

Meteor.publish('item', function( id ){
	if(id){
		return Items.find({'_id': id});
	}
	else{
		return null;
	}
});

Meteor.publish('profiles', function(){
		return Profiles.find();
});

Meteor.publish('profile', function(userId){
	return Profiles.findOne({'userId':userId});
});

/*Meteor.publish('user', function(){
	return users.find({'_id':this.userId()});
});*/