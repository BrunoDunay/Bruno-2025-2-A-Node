import express from 'express';
import { body, param } from 'express-validator';
import validate from '../middlewares/validation.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createShippingAddress,
  getUserAddresses,
  getShippingAddressById,
  getDefaultAddress,
  updateShippingAddress,
  setDefaultAddress,
  deleteShippingAddress
} from '../controllers/shippingAddressController.js';

const router = express.Router();

// Validaciones comunes
const addressValidations = [
  body('name').notEmpty().isLength({ min: 2, max: 100 }).trim(),
  body('address').notEmpty().isLength({ min: 5, max: 200 }).trim(),
  body('city').notEmpty().isLength({ min: 2, max: 50 }).matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).trim(),
  body('state').notEmpty().isLength({ min: 2, max: 50 }).matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).trim(),
  body('postalCode').notEmpty().isLength({ min: 4, max: 6 }).isNumeric().trim(),
  body('country').optional().isLength({ min: 2, max: 50 }).matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).trim(),
  body('phone').notEmpty().isLength({ min: 10, max: 15 }).matches(/^[0-9+\-\s()]+$/).trim(),
  body('isDefault').optional().isBoolean(),
  body('addressType').optional().isIn(['home', 'work', 'other'])
];

// Rutas
router.post('/', authMiddleware, addressValidations, validate, createShippingAddress);
router.get('/', authMiddleware, getUserAddresses);
router.get('/default', authMiddleware, getDefaultAddress);
router.get('/:addressId', authMiddleware, param('addressId').isMongoId(), validate, getShippingAddressById);
router.put('/:addressId', authMiddleware, param('addressId').isMongoId(), addressValidations, validate, updateShippingAddress);
router.patch('/:addressId/default', authMiddleware, param('addressId').isMongoId(), validate, setDefaultAddress);
router.delete('/:addressId', authMiddleware, param('addressId').isMongoId(), validate, deleteShippingAddress);

export default router;
