
const Person = require('../models/Personmodel');

const personController = {};

personController.createPerson = (req, res) => {
  const { name, email, mobileNumber, dateOfBirth } = req.body;
  const personData = { name, email, mobileNumber, dateOfBirth };

  Person.create(personData, (err, result) => {
    if (err) {
      console.error('Error creating person:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Person entry created');
    res.status(201).json({ message: 'Person entry created' });
  });
};

personController.getAllPersons = (req, res) => {
  Person.getAll((err, result) => {
    if (err) {
      console.error('Error fetching persons:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Person entries retrieved');
    res.status(200).json(result);
  });
};

personController.updatePerson = (req, res) => {
  const id = req.params.id;
  const { name, email, mobileNumber, dateOfBirth } = req.body;
  const personData = { name, email, mobileNumber, dateOfBirth };

  Person.update(id, personData, (err, result) => {
    if (err) {
      console.error('Error updating person:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Person entry updated');
    res.status(200).json({ message: 'Person entry updated' });
  });
};

personController.deletePerson = (req, res) => {
  const id = req.params.id;

  Person.delete(id, (err, result) => {
    if (err) {
      console.error('Error deleting person:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Person entry deleted');
    res.status(200).json({ message: 'Person entry deleted' });
  });
};

module.exports = personController;
