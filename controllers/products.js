const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  const {
    company,
    name,
    price,
    createdAt,
    rating,
    featured,
    sort,
    select,
    index,
  } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = { $regex: company, $options: 'i' };
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (price) {
    queryObject.price = price;
  }

  if (createdAt) {
    queryObject.createdAt = createdAt;
  }

  if (rating) {
    queryObject.rating = rating;
  }

  if (featured) {
    queryObject.featured = featured;
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(',').join(' ');
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(',').join(' ');
    apiData = apiData.select(selectFix);
  }

  if (index) {
    queryObject.index = index;
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skipObj = (page - 1) * limit;

  apiData = apiData.skip(skipObj).limit(limit);

  const totalCount = await Product.countDocuments(queryObject);

  const productsData = await apiData;

  const formattedData = productsData.map((product) => ({
    ...product._doc,
    price: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(product.price),
  }));

  res.status(200).json({
    total: totalCount,
    page: page,
    limit: limit,
    data: formattedData,
  });
};

module.exports = { getAllProducts };
