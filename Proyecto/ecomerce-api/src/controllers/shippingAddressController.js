import ShippingAddress from "../models/shippingAddress.js";

// Obtener todas las direcciones del usuario
async function getUserAddresses(req, res, next) {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const addresses = await ShippingAddress.find({ user: userId })
      .sort({ isDefault: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');

    const totalResults = await ShippingAddress.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalResults / limit);

    res.status(200).json({
      addresses,
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

// Obtener dirección por ID
async function getShippingAddressById(req, res, next) {
  try {
    const id = req.params.addressId;
    const address = await ShippingAddress.findById(id).populate('user');
    if (!address) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
}

// Obtener dirección por defecto
async function getDefaultAddress(req, res, next) {
  try {
    const userId = req.user._id;
    const address = await ShippingAddress.findOne({ user: userId, isDefault: true }).populate('user');
    if (!address) {
      return res.status(404).json({ message: 'No default address found' });
    }
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
}

// Crear dirección
async function createShippingAddress(req, res, next) {
  try {
    
    const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;
    const userId = req.user.userId;


    // Si se marca como default, limpiar otras
    if (isDefault) {
      await ShippingAddress.updateMany({ user: userId, isDefault: true }, { isDefault: false });
    }

    const newAddress = await ShippingAddress.create({
      user: userId,
      name,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      isDefault: isDefault || false,
      addressType: addressType || 'home',
    });

    await newAddress.populate('user');
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
}

// Actualizar dirección
async function updateShippingAddress(req, res, next) {
  try {
    const id = req.params.addressId;
    const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;

    // Si se marca como default, limpiar otras
    if (isDefault) {
      const userId = req.user._id;
      await ShippingAddress.updateMany({ user: userId, isDefault: true }, { isDefault: false });
    }

    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      id,
      { name, address, city, state, postalCode, country, phone, isDefault, addressType },
      { new: true }
    ).populate('user');

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    next(error);
  }
}

// Marcar dirección como default
async function setDefaultAddress(req, res, next) {
  try {
    const id = req.params.addressId;
    const userId = req.user._id;

    // Limpiar default anterior
    await ShippingAddress.updateMany({ user: userId, isDefault: true }, { isDefault: false });

    const address = await ShippingAddress.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    ).populate('user');

    if (!address) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
}

// Eliminar dirección
async function deleteShippingAddress(req, res, next) {
  try {
    const id = req.params.addressId;
    const deletedAddress = await ShippingAddress.findByIdAndDelete(id);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export {
  getUserAddresses,
  getShippingAddressById,
  getDefaultAddress,
  createShippingAddress,
  updateShippingAddress,
  setDefaultAddress,
  deleteShippingAddress
};
