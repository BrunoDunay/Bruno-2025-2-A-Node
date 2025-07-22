import User from '../models/user.js';

async function getUsers(req, res) {
  try {
    const users = await User.find().sort({ displayName: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { displayName, email, hashPassword, role, phone, avatar } = req.body;

    if (!displayName || !email || !hashPassword || !role || !phone) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = await User.create({
      displayName,
      email,
      hashPassword,
      role,
      phone,
      avatar // opcional
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { displayName, email, hashPassword, role, phone, avatar, isActive } = req.body;

    if (!displayName || !email || !hashPassword || !role || !phone) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { displayName, email, hashPassword, role, phone, avatar, isActive },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
