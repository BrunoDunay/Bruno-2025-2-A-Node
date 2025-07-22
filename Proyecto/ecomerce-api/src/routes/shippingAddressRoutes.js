import express from 'express';

import {
    getShippingAddresses,
    getShippingAddressById,
    getShippingAddressByUser,
    createShippingAddress,
    updateShippingAddress,
    deleteShippingAddress
} from '../controllers/shippingAddressController.js';

const router = express.Router();

router.get('/shippingAddresses', getShippingAddresses);
router.get('/shippingAddresses/:id', getShippingAddressById);
router.get('/shippingAddresses/user/:userId', getShippingAddressByUser);
router.post('/shippingAddresses', createShippingAddress);
router.put('/shippingAddresses/:id', updateShippingAddress);
router.delete('/shippingAddresses/:id', deleteShippingAddress);

export default router;
