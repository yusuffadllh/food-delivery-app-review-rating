const db = require('../config/db');

exports.createReview = (req, res) => {
  const {
    id_pesanan,
    id_pelanggan,
    rating_restoran,
    rating_pengiriman,
    komentar
  } = req.body;

  const sql = `
    INSERT INTO ulasan
    (
      id_pesanan,
      id_pelanggan,
      rating_restoran,
      rating_pengiriman,
      komentar
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      id_pesanan,
      id_pelanggan,
      rating_restoran,
      rating_pengiriman,
      komentar
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Review added"
      });
    }
  );
};

exports.getReviewOrder = (req, res) => {
  const orderId = req.params.orderId;

  const sql = `
    SELECT
      p.id_pesanan,
      p.total_harga,
      p.waktu_pesan,

      r.nama_restoran,

      m.nama_menu,
      dp.jumlah,
      dp.subtotal

    FROM pesanan p

    JOIN restoran r
      ON r.id_restoran = p.id_restoran

    JOIN detail_pesanan dp
      ON dp.id_pesanan = p.id_pesanan

    JOIN menu m
      ON m.id_menu = dp.id_menu

    WHERE p.id_pesanan = ?
  `;

  db.query(sql,[orderId],(err,result)=>{
    if(err) return res.status(500).json(err);

    res.json(result);
  });
};