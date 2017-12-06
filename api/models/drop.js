const Product = require('./Product')

Product.deleteMany()
  .then(() => {
    console.log("Deleted everything")
    process.exit()
  })
  .catch(()=> {
    console.log('Deletion failed!!!')
  })