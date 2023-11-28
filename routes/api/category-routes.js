const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories with associated products
router.get('/', async (req, res) => {
  try {
    // Retrieve all categories with associated products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    // Check if there are no categories found
    if (!categoryData || categoryData.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    // Respond with the retrieved category data
    res.status(200).json(categoryData);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single category by its id with associated products
router.get('/:id', async (req, res) => {
  try {
    // Retrieve a single category by its id with associated products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // Check if the category is not found
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      // Respond with the retrieved category data
      res.status(200).json(categoryData);
    }
  }
  catch (err) {
    // Handle errors and respond with a 500 status code
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;

  // Validate the category_name
  if (!category_name || typeof category_name !== 'string' || category_name.trim() === '') {
    return res.status(400).json({ message: 'Invalid category_name' });
  }

  try {
    // Create a new category
    const categoryData = await Category.create({ category_name });

    // Check if the category creation was unsuccessful
    if (!categoryData) {
      res.status(500).json({ message: 'Failed to create category' });
    } else {
      // Respond with the created category data
      res.status(201).json(categoryData); // 201 status for resource creation
    }
  } catch (err) {
    // Handle errors and respond with a 500 status code
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT (Update) an existing category by its id
router.put('/:id', async (req, res) => {
  const { category_name } = req.body;

  // Validate the category_name
  if (!category_name || typeof category_name !== 'string' || category_name.trim() === '') {
    return res.status(400).json({ message: 'Invalid category_name' });
  }

  try {
    // Update an existing category by its id
    const [rowsAffected] = await Category.update({ category_name }, {
      where: {
        id: req.params.id,
      },
    });

    // Check if the category was not found or not updated
    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ message: 'Category not found or not updated' });
    }
  }
  catch (err) {
    // Handle errors and respond with a 500 status code
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a category by its id
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its id
    const rowsAffected = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if the category was not found or not deleted
    if (rowsAffected > 0) {
      res.status(204).send(); // 204 status for No Content
    } else {
      res.status(404).json({ message: 'Category not found or not deleted' });
    }
  }
  catch (err) {
    // Handle errors and respond with a 500 status code
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
