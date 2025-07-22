import ShippingAddress from "../models/shippingAddress";

async function getShippingAddresses(req, res) {
  try {
    const userId = req.user._id;
    const addresses = await ShippingAddress.find({ user: userId }).sort({ isDefault: -1 });
    res.json(addresses);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getShippingAddressById(req, res) {
  try {
    const id = req.params.id;
    const address = await ShippingAddress.findById(id).populate('user');
    if (!address) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
    res.status(200).json(address);
    } catch (error) {
    res.status(500).send({ error });
    }
}

async function getShippingAddressByUser(req, res) {
  try {
    const userId = req.user._id;
    const addresses = await ShippingAddress.find({ user: userId }).sort({ isDefault: -1 });
    if (addresses.length === 0) {
      return res.status(404).json({ message: 'No shipping addresses found for this user' });
    }
    res.json(addresses);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function createShippingAddress(req, res) {
    try {
        const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;
        const userId = req.user._id;
    
        if (!name || !address || !city || !state || !postalCode || !country || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
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
    
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function updateShippingAddress(req, res) {
  try {
    const id = req.params.id;
    const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;

    if (!name || !address || !city || !state || !postalCode || !country || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      id,
      { name, address, city, state, postalCode, country, phone, isDefault, addressType },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function deleteShippingAddress(req, res) {
  try {
    const id = req.params.id;
    const deletedAddress = await ShippingAddress.findByIdAndDelete(id);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}

export {
  getShippingAddresses,
  getShippingAddressById,
  getShippingAddressByUser,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};