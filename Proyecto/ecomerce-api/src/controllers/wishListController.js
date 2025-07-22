import wishList from '../models/wishlist.js';

async function getWishlists(req, res) {
  try {
    const wishlists = await wishList.find().populate('user').sort({ createdAt: -1 });
    res.json(wishlists);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getWishlistById(req, res) {
  try {
    const wishlist = await wishList.findById(req.params.id).populate('user');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function createWishlist(req, res) {
    try {
        const { user, products } = req.body;
    
        if (!user || !products) {
        return res.status(400).json({ error: 'User and products are required' });
        }
    
        const newWishlist = await wishList.create({ user, products });
        res.status(201).json(newWishlist);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function updateWishlist(req, res) {
    try {
        const id = req.params.id;
        const { user, products } = req.body;
    
        if (!user || !products) {
        return res.status(400).json({ error: 'User and products are required' });
        }

        const updatedWishlist = await wishList.findByIdAndUpdate(id, { user, products }, { new: true });

        if (!updatedWishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
        }
    
        res.status(200).json(updatedWishlist);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async function deleteWishlist(req, res) {
  try {
    const id = req.params.id;
    const deletedWishlist = await wishList.findByIdAndDelete(id);
    if (!deletedWishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export {
  getWishlists,
  getWishlistById,
  createWishlist,
  updateWishlist,
  deleteWishlist
};
