// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: "product_id",
  through: {
    model: ProductTag,
    // Because we are using many to many relationship, using some additional paramters will be more expressive.
    unique: false,
  },
  // Creating an alias
  as: "tags"
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: "tag_id",
  through: {
    model: ProductTag,
    // Because we are using many to many relationship, using some additional paramters will be more expressive.
    unique: false,
  },
  // Creating an alias
  as: "products"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
