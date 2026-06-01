const db = require('../config/db');

exports.createOrder = (req, res) => {
  const {
    id_pelanggan,
    id_restoran,
    biaya_kirim,
    catatan,
    alamat,
    items
  } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: 'Items cannot be empty'
    });
  }

  let totalHarga = 0;

  const menuIds = items.map(item => item.menu_id);

  const menuSql = `
    SELECT id_menu, harga
    FROM menu
    WHERE id_menu IN (?)
  `;

  db.query(menuSql, [menuIds], (err, menus) => {
    if (err) {
      return res.status(500).json(err);
    }

    const menuMap = {};

    menus.forEach(menu => {
      menuMap[menu.id_menu] = menu.harga;
    });

    for (const item of items) {
      if (!menuMap[item.menu_id]) {
        return res.status(400).json({
          message: `Menu ID ${item.menu_id} not found`
        });
      }

      totalHarga += menuMap[item.menu_id] * item.quantity;
    }

    const orderSql = `
      INSERT INTO pesanan
      (
        id_pelanggan,
        id_restoran,
        status_pesanan,
        total_harga,
        biaya_kirim,
        catatan
      )
      VALUES (?, ?, 'diproses', ?, ?, ?)
    `;

    db.query(
      orderSql,
      [
        id_pelanggan,
        id_restoran,
        totalHarga,
        biaya_kirim,
        catatan
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        const orderId = result.insertId;
        const randomKurir = Math.floor(Math.random() * 3) + 1;
        const pengirimanSql = `
          INSERT INTO pengiriman
          (
            id_pesanan,
            id_kurir,
            status_pengiriman,
            alamat_tujuan
          )
          VALUES (?, ?, 'dijemput', ?)
          `;

          db.query(
            pengirimanSql,
            [
              orderId,
              randomKurir,
              alamat
            ]
          );

        items.forEach(item => {
          const hargaSatuan = menuMap[item.menu_id];
          const subtotal = hargaSatuan * item.quantity;

          const itemSql = `
            INSERT INTO detail_pesanan
            (
              id_pesanan,
              id_menu,
              jumlah,
              harga_satuan,
              subtotal,
              catatan_item
            )
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          db.query(itemSql, [
            orderId,
            item.menu_id,
            item.quantity,
            hargaSatuan,
            subtotal,
            item.catatan_item || null
          ]);
        });

        res.json({
          message: 'Order created',
          order_id: orderId,
          total_harga: totalHarga,
          biaya_kirim
        });
      }
    );
  });
};

exports.getOrderHistory = (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT
      p.id_pesanan,
      p.status_pesanan,
      p.total_harga,
      p.biaya_kirim,
      p.waktu_pesan,
      r.nama_restoran
    FROM pesanan p
    JOIN restoran r
      ON r.id_restoran = p.id_restoran
    WHERE p.id_pelanggan = ?
    AND p.status_pesanan = 'terkirim'
    ORDER BY p.waktu_pesan DESC
  `;

  db.query(sql, [userId], (err, orders) => {
    if (err) return res.status(500).json(err);

    if (orders.length === 0) {
      return res.json([]);
    }

    const orderIds = orders.map(o => o.id_pesanan);

    const itemSql = `
  SELECT
    dp.id_pesanan,
    m.nama_menu,
    dp.jumlah,
    dp.subtotal
  FROM detail_pesanan dp
  JOIN menu m
    ON m.id_menu = dp.id_menu
  WHERE dp.id_pesanan IN (?)
`;

db.query(itemSql, [orderIds], (err, items) => {
  if (err) return res.status(500).json(err);

  const itemMap = {};

  items.forEach(item => {
    if (!itemMap[item.id_pesanan]) {
      itemMap[item.id_pesanan] = [];
    }

    itemMap[item.id_pesanan].push({
      nama_menu: item.nama_menu,
      jumlah: item.jumlah,
      subtotal: item.subtotal
    });
  });
  const result = orders.map(order => ({
    ...order,
    driver: {
      id_kurir: order.id_kurir,
      nama_kurir: order.nama_kurir,
      no_hp: order.no_hp,
      kendaraan: order.kendaraan
    },
    items: itemMap[order.id_pesanan] || []
  }));

  res.json(result);
  });
  });
};

exports.getOrderById = (req, res) => {
  const orderId = req.params.orderId;

  const sql = `
  SELECT
    p.id_pesanan,
    p.status_pesanan,
    p.total_harga,
    p.biaya_kirim,
    p.waktu_pesan,
    r.nama_restoran,

    pg.status_pengiriman,

    k.id_kurir,
    k.nama_kurir,
    k.no_hp,
    k.kendaraan

  FROM pesanan p

  JOIN restoran r
    ON r.id_restoran = p.id_restoran

  LEFT JOIN pengiriman pg
    ON pg.id_pesanan = p.id_pesanan

  LEFT JOIN kurir k
    ON k.id_kurir = pg.id_kurir

  WHERE p.id_pesanan = ?
  `;

  db.query(sql, [orderId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    const order = result[0];

    const itemSql = `
      SELECT
        m.nama_menu,
        dp.jumlah,
        dp.subtotal
      FROM detail_pesanan dp
      JOIN menu m
        ON m.id_menu = dp.id_menu
      WHERE dp.id_pesanan = ?
    `;

    db.query(itemSql, [orderId], (err, items) => {
      if (err) return res.status(500).json(err);

      res.json({
        ...order,
        driver: order.id_kurir
    ? {
        id_kurir: order.id_kurir,
        nama_kurir: order.nama_kurir,
        no_hp: order.no_hp,
        kendaraan: order.kendaraan
      }
    : null,
        items
      });
    });
  });
};

exports.getActiveOrders = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT
      p.id_pesanan,
      p.status_pesanan,
      p.total_harga,
      r.nama_restoran,

      pg.status_pengiriman,

      k.id_kurir,
      k.nama_kurir,
      k.no_hp,
      k.kendaraan

    FROM pesanan p

    JOIN restoran r
      ON r.id_restoran = p.id_restoran

    LEFT JOIN pengiriman pg
      ON pg.id_pesanan = p.id_pesanan

    LEFT JOIN kurir k
      ON k.id_kurir = pg.id_kurir

    WHERE p.id_pelanggan = ?
    AND p.status_pesanan != 'selesai'

    ORDER BY p.waktu_pesan DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};