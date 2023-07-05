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

  const products = await apiData;

  const formattedData = data.map((product) => ({
    ...product._doc,
    price: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(product.price),
  }));

  res.status(200).json(formattedData);
};

const getAllProductsTest = async (req, res) => {
  const { company, name, price, createdAt, rating, featured, sort, select } =
    req.query;
  const queryObject = {};

  // ..?company=appl...
  if (company) {
    queryObject.company = { $regex: company, $options: 'i' };
  }

  // ..?name=ipho...
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

  // ..?featured=<boolean> {true or false}
  if (featured) {
    queryObject.featured = featured;
  }

  let apiData = Product.find(queryObject);

  // ..?sort=<field>
  if (sort) {
    //let sortFix = sort.replace(',', ' '); //" " => replace comma with space

    let sortFix = select.split(',').join(' ');

    apiData = apiData.sort(sortFix);
    console.log(sortFix);
    //http://localhost:5000/api/products/test?sort=-name => -<field> => descnding order

    //http://localhost:5000/api/products/test?sort=name => <field> => ascending order
  }

  // ..?select=<field>
  if (select) {
    //let selectFix = select.replace(',', ' '); //" " => replace comma with space
    //👆this doesnt work with three inputs in select example below
    //  http://localhost:5000/api/products/test?select=name,company,price

    let selectFix = select.split(',').join(' ');

    apiData = apiData.select(selectFix);
    console.log(selectFix);
    //http://localhost:5000/api/products/test?sort=-name => -<field> => descnding order

    //http://localhost:5000/api/products/test?sort=name => <field> => ascending order
  }

  let page = Number(req.query.page) || 1; // 1 is start of the pg
  // pg numbere written in the url
  let limit = Number(req.query.limit) || 5; // 5 is the limit
  // limit is limiting the DATA obj in a page

  let skipObj = (page - 1) * limit; // skip is skips the prev obj and shows the given DATA obj on the pg
  // for eg: on pg-3 limit of DATA obj shown would be 3 and skipobj would skip the prev 6 DATA obj show obj7 obj8 obj9 on pg-3

  // eg: pg=3; limit=3; skip = (3-1)*3 = 6 => skip 6 DATA obj/elements

  apiData = apiData.skip(skipObj).limit(limit);

  console.log(queryObject);
  const data = await apiData;
  //directly applying sort :=> const data = await apiData.sort('-name');

  // selecting particular field name to display :=> const data = await apiData.select('name company');

  //http://localhost:5000/api/products/test?company=samsung  => ?company=samsung => { company: 'samsung' }

  // Format the 'price' field as currency strings
  const formattedData = data.map((product) => ({
    ...product, // Shallow copy of the product object
    price: new Intl.NumberFormat('en-IN', {
      // Format price as currency string using Indian Rupee (INR)
      style: 'currency',
      currency: 'INR',
    }).format(product.price),
  }));

  // The map() function takes a callback function as an argument. This callback function is executed for each element in the data array. In this code, the callback function takes the current product as its parameter.

  // Inside the callback function, a new object is created using the spread operator (...product). This creates a shallow copy of the product object, preserving all its properties.

  // The price property of the new object is then overridden with a formatted currency string. The Intl.NumberFormat function is used to format the product.price value as a currency string, using the 'en-IN' locale (English, India) and the currency code 'INR' (Indian Rupee).

  // Finally, the formattedData array is populated with the transformed objects, where each product object is replaced with a new object that has the formatted price field.

  // In summary, data.map() is used to iterate over the data array, apply the formatting operation to each element, and store the formatted data in a new array called formattedData.

  res.status(200).json(formattedData);
};

module.exports = { getAllProducts, getAllProductsTest };
