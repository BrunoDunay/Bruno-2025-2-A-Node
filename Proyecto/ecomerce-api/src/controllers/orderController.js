import Order from '../models/order.js';
import mongoose from 'mongoose';


async function getOrders(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Obtener orders con paginación
    const orders = await Order.find()
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod')
      .sort({ status: 1 })
      .skip(skip)
      .limit(limit);

    const totalResults = await Order.countDocuments();
    const totalPages = Math.ceil(totalResults / limit);

    res.status(200).json({
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const id = req.params.id;
    const order = await Order.findById(id)
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

async function getOrdersByUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId })
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod')
      .sort({ status: 1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const {
      user,
      products,
      shippingAddress,
      paymentMethod,
      shippingCost = 0
    } = req.body;

    // Validaciones básicas
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Products array is required and must not be empty' });
    }

    if (!mongoose.Types.ObjectId.isValid(shippingAddress)) {
      return res.status(400).json({ error: 'Invalid shipping address ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method ID' });
    }

    // Validar estructura de productos
    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ error: `Invalid productId in product item` });
      }
      if (!item.quantity || item.quantity < 1) {
        return res.status(400).json({ error: `Invalid quantity for product ${item.productId}` });
      }
      if (!item.price || item.price <= 0) {
        return res.status(400).json({ error: `Invalid price for product ${item.productId}` });
      }
    }

    // Verificar existencia de usuario
    const userExists = await mongoose.model('User').exists({ _id: user });
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verificar existencia de productos
    for (const item of products) {
      const productExists = await mongoose.model('Product').exists({ _id: item.productId });
      if (!productExists) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
    }

    // Verificar existencia de shippingAddress
    const addressExists = await mongoose.model('ShippingAddress').exists({ _id: shippingAddress });
    if (!addressExists) {
      return res.status(404).json({ error: 'Shipping address not found' });
    }

    // Verificar existencia de paymentMethod
    const paymentExists = await mongoose.model('PaymentMethod').exists({ _id: paymentMethod });
    if (!paymentExists) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    // Calcular totalPrice
    const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalPrice = subtotal + shippingCost;

    // Crear la orden
    const newOrder = await Order.create({
      user,
      products,
      shippingAddress,
      paymentMethod,
      shippingCost,
      totalPrice
    });

    // Poblamos las referencias
    await newOrder.populate('user');
    await newOrder.populate('products.productId');
    await newOrder.populate('shippingAddress');
    await newOrder.populate('paymentMethod');

    res.status(201).json(newOrder);

  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Solo permitir actualizar ciertos campos
    const allowedFields = ['status', 'paymentStatus', 'shippingCost'];
    const filteredUpdate = {};

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredUpdate[field] = updateData[field];
      }
    }

    // Si se actualiza shippingCost, recalcular totalPrice
    if (filteredUpdate.shippingCost !== undefined) {
      const order = await Order.findById(id);
      if (order) {
        const subtotal = order.products.reduce((total, item) => total + (item.price * item.quantity), 0);
        filteredUpdate.totalPrice = subtotal + filteredUpdate.shippingCost;
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      filteredUpdate,
      { new: true }
    )
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod');

    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Solo permitir cancelar si el estado lo permite
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        message: 'Cannot cancel order with status: ' + order.status
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status: 'cancelled',
        paymentStatus: order.paymentStatus === 'paid' ? 'refunded' : 'failed'
      },
      { new: true }
    )
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod');

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Valid statuses: ' + validStatuses.join(', ')
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod');

    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
}

async function updatePaymentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        error: 'Invalid payment status. Valid statuses: ' + validPaymentStatuses.join(', ')
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    )
      .populate('user')
      .populate('products.productId')
      .populate('shippingAddress')
      .populate('paymentMethod');

    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Solo permitir eliminar órdenes canceladas
    if (order.status !== 'cancelled') {
      return res.status(400).json({
        message: 'Only cancelled orders can be deleted'
      });
    }

    await Order.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  cancelOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};