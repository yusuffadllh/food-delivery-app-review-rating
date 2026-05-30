exports.getMenuByRestaurant = (req, res) => {
  const restaurantId = req.params.id;

  const sql = `
    SELECT *
    FROM menu
    WHERE id_restoran = ?
    AND is_available = 1
  `;

  db.query(sql, [restaurantId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};