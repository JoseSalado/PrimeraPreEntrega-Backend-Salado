const { Router } = require('express')
const fs = require('fs')
const ProductManager = require('../ProductManager.js');
const router = Router()

const pm1 = new ProductManager("./");

// Get all Products in file
router.get('/', async (req, res) => {
  let consultas = req.query;
  let productsList = await pm1.getProducts();
  console.log(productsList)
  
  res.json( productsList )
})

const convertToNumber = (req, res, next) => {
  req.params.id = Number(req.params.id)
  next()
}

// Get product with id
router.get('/:id', convertToNumber, async (req, res) => {
  let id = req.params.id;
  let product = await pm1.getProductById(id);

  typeof product === "object" ? res.json(product) : res.send({ status: 500, message: "Server cant find the file" });
  }
)
//post
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const product = {
      title,
      description,
      code,
      price,    
      status,
      stock,
      category,
      thumbnails,
    };
    const savedProduct = await productManager.addProducts(product);
    res.json({ savedProduct });
  } catch (error) {
    console.log(error);
  }
});

//PUT
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const product = {
      title,
      description,
      code, 
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    const updatedProduct = await productManager.updateProduct(pid, product);
    res.json({updatedProduct});
  } catch (error) {
    res.json({ error: error });
  }
}); 

//DELETE

router.delete("/:pid", async (req, res) => {    
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid)
    res.json({deletedProduct});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router