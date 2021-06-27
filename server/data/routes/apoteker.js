const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const apotekerCtrl = require('../controllers/apoteker');

//Method
router.get('/obat', apotekerCtrl.cariObat);
router.post('/obat/', apotekerCtrl.tambahObat);
router.put('/obat/', apotekerCtrl.updateObat);
router.delete('/obat/:id', apotekerCtrl.deleteObat);

module.exports = router;
