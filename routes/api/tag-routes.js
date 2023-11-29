const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tags' }],
    });

    res.status(200).json(tagsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tags' }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tagData = await Tag.create(req.body);

    res.status(201).json(tagData); // 201 status for resource creation
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const [rowsAffected] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected > 0) {
      res.status(200).json({ message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ message: 'Tag not found or not updated' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const rowsAffected = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected > 0) {
      res.status(204).send(); // 204 status for No Content
    } else {
      res.status(404).json({ message: 'Tag not found or not deleted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
