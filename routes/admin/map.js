const express = require('express');
const router = express.Router();

const mapController= require('../../controllers/admin/map');
const auth= require('../../middleware/admin/auth');

router.get('/map', mapController.getMap);
router.get('/Maparicha', mapController.arichaMap);
router.get('/Maparicha1', mapController.arichaMap1);
router.get('/Mapsylhet', mapController.sylhetMap);
router.get('/Mapsylhet1', mapController.sylhetMap1);
router.get('/Mapcox', mapController.coxMap);
router.get('/Mapcox1', mapController.coxMap1);

module.exports=router;