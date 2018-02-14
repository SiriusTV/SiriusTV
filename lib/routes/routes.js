Router.configure({
	layoutTemplate: 'main_layout'
});
Router.map(function(){
	//stream
	this.route('stream', {
		path: '/',
		template: 'stream'
	})
});

Router.map(function(){
	//extention
	this.route('extention', {
		path: '/extention',
		template: 'extention'
	})
});

Router.map(function(){
	//youtube
	this.route('youtube', {
		path: '/youtube',
		template: 'youtube'
	})
});

Router.map(function(){
	//planing
	this.route('planing', {
		path: '/planing',
		template: 'planing'
	})
});
Router.map(function(){
	//admin
	this.route('admin', {
		path: '/admin',
		template: 'admin'
	})
});
Router.map(function(){
	//admin
	this.route('wpadmin', {
		path: '/wp-admin',
		template: 'wpadmin'
	})
});
Router.map(function(){
	//aide
	this.route('aide', {
		path: '/aide',
		template: 'aide'
	})
});