const db = require('../config/db');

exports.createReview = (req, res) => {
  const {
    user_id,
    restaurant_id,
    rating,
    comment
  } = req.body;

  const sql = `
    INSERT INTO ulasan
    (id_pesanan, id_pelanggan, rating_restoran, rating_pengiriman, komentar)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    user_id,
    restaurant_id,
    rating,
    comment
  ], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: 'Review added'
    });
  });
};