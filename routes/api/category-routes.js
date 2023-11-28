const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoryData || categoryData.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(categoryData);
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;

  if (!category_name || typeof category_name !== 'string' || category_name.trim() === '') {
    return res.status(400).json({ message: 'Invalid category_name' });
  }

  try {
    const categoryData = await Category.create({ category_name });

    if (!categoryData) {
      res.status(500).json({ message: 'Failed to create category' });
    } else {
      res.status(201).json(categoryData); // 201 status for resource creation
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
