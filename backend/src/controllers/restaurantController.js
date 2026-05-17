const db = require('../config/db');

exports.getRestaurants = (req, res) => {
  db.query('SELECT * FROM restoran', (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.getRestaurantMenus = (req, res) => {
  const restaurantId = req.params.id;

  const sql = 'SELECT * FROM menu WHERE id_restoran = ?';

  db.query(sql, [restaurantId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};