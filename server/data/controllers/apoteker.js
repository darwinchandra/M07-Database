const conn = require('./db');
const async = require('async');
exports.cariObat = (req, res, next) => {
  var id = req.params.id;

  let query = 'select * from tbl_obat';

  conn.query(query, [id], (err, rows) => {
    if (err) {
      return res.status(400).send({
        message: 'Failed when query data',
      });
    } else {
      if (rows.length < 1) {
        return res.status(404).send({
          message: 'Not Found',
        });
      } else {
        return res.status(200).send({
          data: rows,
        });
      }
    }
  });
};

exports.tambahObat = (req, res, next) => {
  let namaObat = req.body.namaObat;
  let kegunaan = req.body.kegunaan;
  let harga = req.body.harga;

  let sql = 'insert into tbl_obat(namaObat,kegunaan,harga) value (?,?,?)';

  conn.query(sql, [namaObat, kegunaan, harga], (err, rows) => {
    if (err) {
      return res.status(400).send({
        status: 400,
      });
    } else {
      return res.status(200).send({
        status: 200,
      });
    }
  });
};

exports.updateObat = (req, res) => {
  var id = req.body.id;
  let namaObat = req.body.namaObat;
  let kegunaan = req.body.kegunaan;
  let harga = req.body.harga;

  var sql = 'UPDATE tbl_obat SET namaObat=?, kegunaan= ?, harga=? WHERE id= ?';

  // params dalam kurung siku "[]", diurutkan sesuai dengan tanda tanya pada query di atas.
  conn.query(sql, [namaObat, kegunaan, harga, id], (err, result) => {
    if (err) {
      return res.status(400).send({
        status: 400,
      });
    } else {
      return res.status(200).send({
        status: 200,
      });
    }
  });
};

exports.deleteObat = (req, res) => {
  var id = req.params.id;
  console.log(id);

  var sql = 'DELETE FROM tbl_obat WHERE id=?';

  // params dalam kurung siku "[]", diurutkan sesuai dengan tanda tanya pada query di atas.
  conn.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(400).send({
        status: 400,
      });
    } else {
      return res.status(200).send({
        status: 200,
      });
    }
  });
};
