const data = require('../shared/product-data');
const db = require('../shared/db');

module.exports = async function (context, req) {

  const Link = await db();

  try {
    const products = await Link.find({})
      .sort({
        date: 'desc',
      })
      .exec();
      console.log(Link)
    context.res.status(200).json(products);
  } catch (error) {
    context.res.status(500).send(error);
  }
};