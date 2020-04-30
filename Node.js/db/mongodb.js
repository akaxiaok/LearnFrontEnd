const MongoClient = require('mongodb').MongoClient;
const Mock = require('mockjs');
const uri = 'mongodb+srv://admin:toor@cluster0-7nogt.azure.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(async err => {
  const db = client.db('test');
  // perform actions on the collection object
  try {
    await insertDocuments(db);
    // await findDocuments(db);
  } catch (e) {
    console.log(e);
  }
  client.close();
});


async function insertDocuments(db, callback) {
  const categories = [
    'Bagels',
    'Cookies',
    'Pizza',
    'Pasta',
    'Italian',
    'Coffee',
    'Sandwiches'
  ];

  const one = () => Mock.mock({
    'name': '@title(2, 6)',
    'stars|0-5': 1,
    'categories': Mock.Random.shuffle(categories).slice(0, Mock.Random.integer(1, categories.length))
  });

  const count = Mock.Random.integer(1, 5);
  const restaurants = Array(count).fill(0);
  restaurants.forEach((v, i) => {
    restaurants[i] = one();
  });
  const results = await db
    .collection('restaurants')
    .insertMany(restaurants);
  console.log(restaurants.length);

  return results;
}

async function findDocuments(db) {
  // Get the documents collection
  const collection = db.collection('restaurants');
  const docs = await collection.find({ stars: { $gt: 3 } }).toArray();
  console.log('Found the following records');
  console.log(docs);
  return docs;
}

