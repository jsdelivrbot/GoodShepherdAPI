
module.exports = function(app) {

    var userController = require('../controllers/user.controller.js');
    
    app.post('/api/users', userController.create);              // Create User
    app.get('/api/users', userController.findAll);              // Get users
    app.get('/api/users/:userId', userController.findOne);      // Get user by ID
    app.put('/api/users/:userId', userController.update);       // Update user by ID
    app.delete('/api/users/:userId', userController.delete);    // Delete user by ID
}