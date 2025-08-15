import Category from '../models/category.js';

async function getCategories(req, res, next) {
  try {
    const categories = await Category.find()
      .populate('parentCategory')
      .sort({ name: 1 });
    res.status(200).json({ message: 'Categories retrieved successfully', categories });
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findById(req.params.id).populate('parentCategory');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category retrieved successfully', category });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, description, parentCategory, imageURL } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newCategory = new Category({
      name,
      description: description || '',
      parentCategory: parentCategory || null,
      imageURL: imageURL || null,
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const { name, description, parentCategory, imageURL } = req.body;
    const idCategory = req.params.id;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      idCategory,
      { name, description, parentCategory, imageURL },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const idCategory = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(idCategory);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
