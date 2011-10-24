// Sencha demo. Please see the README.md file for more information.

// Load everything
Ext.require(['*']);

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: ['id','name', 'email'],
    hasMany: 'Item',
    proxy: {
        type: 'rest',
        url : 'data/users',
        reader: {
	    type: 'json',
	    root: 'users'
        }
    }    
});

Ext.define('Item', {
    extend: 'Ext.data.Model',
    fields: ['id','name', 'color'],
    belongsTo: 'User',
    proxy: {
        type: 'rest',
        url : 'data/items',
        reader: {
	    type: 'json',
	    root: 'items'
        }
    }    
});

Ext.onReady(function() {

    // Create each data Store via each Model Proxy.
    Ext.create('Ext.data.Store', {model: 'User', autoLoad: true});

    // Get a reference to the models; this is shorthand.
    var User = Ext.ModelMgr.getModel('User');

    console.log("Loading User 1...");
    
    // Loads User with ID 1 and related items via User's Proxy.
    User.load(1, {
	success: function(user) {
            console.log("User: " + user.get('name'));
            user.items().each(function(post) {
		console.log("Item: " + item.get('name'));
            });
	},
	failure: function() {
	    console.log("Failure: User.load(1) did not work");
	}
    });

});