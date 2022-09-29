const express = require('express');
const {
  getSingleInventory,
  getInventoriesOfUser,
  addInventory,
  addItemToInventory,
  updateInventory,
  updateItemInInventory,
  removeItemInInventory,
  getAllPublicInventories,
  nodeCategoryWithInventory,
  updateItemLinkInInventory,
  nodeGroupWithInventory,
  getJointInventory,
  getTripInventory,
} = require('../controllers/inventoryController');
const router = express.Router();

router.get('/:inventory', getSingleInventory);
router.get('/all/public', getAllPublicInventories);
router.get('/joint-inventory/:group', getJointInventory);
router.get('/trip-inventory/:trip', getTripInventory);
router.get('/all/:user', getInventoriesOfUser);

router.post('/add', addInventory);
router.post('/add/item', addItemToInventory);

router.patch('/:inventory', updateInventory);
router.patch('/update/item', updateItemInInventory);
router.patch('/update/item-link', updateItemLinkInInventory);
router.patch('/remove/item', removeItemInInventory);
router.patch('/node/category', nodeCategoryWithInventory);
router.patch('/node/group', nodeGroupWithInventory);

module.exports = router;
