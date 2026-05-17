const db = require('../config/db');

exports.createOrder = (req, res) => {
  const {
    user_id,
    total,
    payment_method,
    items
  } = req.body;

  const orderSql = `
    INSERT INTO pesanan (id_pelanggan, id_restoran, status_pesanan, total_harga, biaya_kirim, catatan)
    VALUES (?, ?, 'menunggu_konfirmasi', ?, ?, ?)
  `;

  db.query(orderSql, [user_id, total, payment_method], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    const orderId = result.insertId;

    items.forEach((item) => {
      const itemSql = `
        INSERT INTO detail_pesanan
        (id_pesanan, id_menu, jumlah, harga_satuan, subtotal, catatan_item)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(itemSql, [
        orderId,
        item.menu_id,
        item.quantity,
        item.subtotal
      ]);
    });

    res.json({
      message: 'Order created',
      orderId
    });
  });
};

exports.getOrderHistory = (req, res) => {
  const userId = req.params.userId;

  const sql = 'SELECT * FROM pesanan WHERE id_pelanggan = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};