import express from 'express';

import {
    getWishLists,
    getWishListById,
    createWishList,
    updateWishList,
    deleteWishList
} from '../controllers/wishListController.js';

const router = express.Router();

router.get('/wishLists', getWishLists);
router.get('/wishLists/:id', getWishListById);
router.post('/wishLists', createWishList);
router.put('/wishLists/:id', updateWishList);
router.delete('/wishLists/:id', deleteWishList);

export default router;
