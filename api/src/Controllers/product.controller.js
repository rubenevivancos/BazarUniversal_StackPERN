import sequelize from '../db.js';
import ProductService from '../Services/product.service.js';
import ImageService from '../Services/image.service.js';

const productController = {

    productSearch: async (req, res) =>{
        console.log("[ productSearch ] INICIO");
        let { search } = req.query;
    
        if (search) {
            search = search.toLowerCase();
            console.log("[ productSearch ] El producto a buscar es: " + search);
    
            try{
                //Obteniendo el listado de la busqueda
                const result = await getListProducts(search);
    
                
                //Obteniendo la cantidad de productos por categoria del listado de la busqueda: INICIO
                const categories = result.map((object) => object.category);
                const uniqueCategories = new Set(categories);
    
                uniqueCategories.forEach((category) => {
                    console.log("category --> " + category);
                });
    
                const categoriesWithCount = [];
    
                uniqueCategories.forEach((category) => {
                    const objectsByCategory = result.filter((object) => object.category === category);
                    categoriesWithCount.push({ category: category, count: objectsByCategory.length });
                });
                //Obteniendo la cantidad de productos por categoria del listado de la busqueda:FIN
    
                for(let i=0; i<categoriesWithCount.length; i++){
                    console.log("category -->" + categoriesWithCount[i].category);
                    console.log("count -->" + categoriesWithCount[i].count);
                }
                
                //const categoriesWithCount = [];
                let resul = {listProducts: result, categoriesWithCount: categoriesWithCount};
    
                if(result.length){
                    console.log("[ productSearch ] Se encontraron " + result.length + " resultados");
                    console.log("[ productSearch ] product title: " + result[0].title);
                    console.log("[ productSearch ] category name: " + result[0].Category.name);
                    return res.status(200).json(resul);
                }
                console.log("[ productSearch ] No hay resultados");
                resul = {listProducts: [], categoriesWithCount: []};
                return res.status(200).json(resul);
    
            } catch (error) {
                console.log("[ productSearch ] Ocurrio una excepcion: " + error.message);
                return res.status(404).send(error.message);
            }
    
        }
        
        return res.status(200).json([]);
    },

    getDetail: async (req, res) => {
        console.log("[ products.js/getDetail ] INICIO");
        const { productID } = req.params;
    
        if (productID) {
            console.log("[ products.js/getDetail ] El ID del producto a buscar es: " + productID);
    
            try {

                const productDetail = await ProductService.getProductDetail(productID);
                
                console.log("[ products.js/getDetail ] Se encontro el detalle del producto");
                console.log("[ products.js/getDetail ] El producto es: " + productDetail.title);
                /*
                //Se obtiene el listado de las imágenes del producto
                const productImages = await ImageService.getImagesByProductIds(productDetail.id);
    
                if(productImages.length > 0){
                    console.log("[ products.js/getDetail ] El producto tiene " + productImages.length + " imagenes");
                    productDetail.images = productImages.map((images) => images.url);
                }else{
                    productDetail.images = [];
                }
                */
                console.log("[ products.js/getDetail ] FIN");
                return res.status(200).json(productDetail);
    
            } catch (error) {
                console.error("[ products.js/getDetail ] Error al obtener el detalle del producto: ", error);
                throw error;
            }
        }  
        return res.status(400).json({message: "Falta enviar ID del producto"});

    }

};



async function getListProducts(search) {
    console.log("[ products.js/getListProducts ] INICIO");

    try {
        //Se obtiene el listado de productos según la búsqueda
        const listProducts = await ProductService.getProductCategoryNames(search);

        /*
        //Del listado de productos obtenido, se crea un arreglo con solo los ids
        const listID = listProducts.map((product) => product.id);

        //Se obtiene el listado de las imágenes correspondientes a cada producto del listado de productos
        const listImagesByProduct = await ImageService.getImagesByProductIds(listID);

        //Se setea a cada producto su correspondiente arreglo de imagenes
        for (let product of listProducts) {
            // Filtra las imágenes correspondientes al producto actual
            const productImages = listImagesByProduct.filter(image => image.productID === product.id);

            const listUrl = productImages.map((images) => images.url);

            // Agrega el atributo "images" al objeto product con el arreglo de imágenes correspondientes
            product.images = listUrl;
        }
        */
        
        console.log("[ products.js/getListProducts ] FIN");
        return listProducts;
    } catch (error) {
        console.error("[ products.js/getListProducts ] Error al llamar a la funcion: " + functionName, error);
        throw error;
    }
}



/*

async function getProductCategoryNames(search) {
  try {
    // Realizamos la consulta con Sequelize, usando `Op.like` para las búsquedas con LIKE
    const result = await Product.findAll({
      attributes: [
        ['id', 'p_id'],
        'title',
        'description',
        'price',
        'discountPercentage',
        'rating',
        'stock',
        'brand',
        'thumbnail',
        'categoryID',
        [sequelize.col('category.id'), 'c_id'], // Alias para la columna 'id' de la tabla Category
        [sequelize.col('category.name'), 'category'] // Alias para la columna 'name' de la tabla Category
      ],
      include: {
        model: Category,
        attributes: [], // No seleccionamos más atributos de la tabla Category, solo los campos especificados
      },
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } }, // Búsqueda en 'title' de 'Product'
          { '$category.name$': { [Op.iLike]: `%${search}%` } } // Búsqueda en 'name' de 'Category'
        ]
      }
    });

    return result; // Retornamos los resultados encontrados
  } catch (error) {
    console.error('Error al obtener productos y categorías:', error);
    throw error; // Lanza el error para manejo posterior
  }
}


Asi se usa:
const searchQuery = 'some search term';
const productsWithCategories = await getProductCategoryNames(searchQuery);
console.log(productsWithCategories);

*/

export default productController;