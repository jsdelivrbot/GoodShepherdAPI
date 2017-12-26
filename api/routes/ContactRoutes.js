'use strict';
module.exports = function(app) {
  var contact = require('../controllers/ContactListController');

  // todoList Routes
  app.route('/contacts')
    .get(contact.list_all_contacts)
    .post(contact.create_a_contact);


  app.route('/contacts/:contactID')
    .get(contact.read_a_contact)
    .put(contact.update_a_contact)
    .delete(contact.delete_a_contact);

  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

};
