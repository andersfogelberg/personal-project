Router.route('/newClassForm/:schoolId', function() {
	this.layout('newClassForm');
	this.render('navBar', {to: 'navbar'});
});

Router.route('/newSchoolForm', function(){
	this.layout('newSchoolForm');
	this.render('navBar', {to: 'navbar'});
});

Router.route('/searchSchool', function(){
	this.layout('searchSchool');
	this.render('navBar', {to : 'navbar'});
});


Router.route('/classView/:courseId', function() {
	this.layout('courseView');
	this.render('navBar', {to : 'navbar'});
});
Router.route('home', function() {
	this.layout('homePage');
	this.render('navBar', {to : 'navbar'});
});

Router.route('/searchClasses/:schoolId', function() {
	this.layout('searchClasses');
	this.render('navBar', {to : 'navbar'});
});
Router.route('/userClasses', function(){
	this.layout('userClasses');
	this.render('navBar', {to : 'navbar'});
});