const { conn } = require('../db.js'); // Importa tu instancia de Sequelize


async function productSearch(req, res){
    console.log("[ productSearch ] INICIO");
    let { search } = req.query;
    console.log("[ productSearch ] search --> " + search);

    if (search) {
        search = search.toLowerCase();
        console.log("[ productSearch ] El producto a buscar es: " + search);

        try{
            //Obteniendo el listado de la busqueda usando la FUNCTION
            const result = await getListProducts(search);

            /*
            //Obteniendo la cantidad de productos por categoria del listado de la busqueda: INICIO
            const categories = result.map((object) => object.category);
            const uniqueCategories = new Set(categories);

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
            */
            const categoriesWithCount = [];
            let resul = {listProducts: result, categoriesWithCount: categoriesWithCount};

            if(result.length){
                console.log("[ productSearch ] Se encontraron " + result.length + " resultados");
                console.log("[ productSearch ] product_title: " + result[0].product_title);
                console.log("[ productSearch ] category_name: " + result[0].category_name);
                return res.status(200).json(resul);
            }
            console.log("[ productSearch ] No hay resultados");
            return res.status(422).json({message: "No hay resultados"}); 

        } catch (error) {
            console.log("[ productSearch ] Ocurrio una excepcion: " + error.message);
            return res.status(404).send(error.message);
        }

    }
    
    return res.status(200).json([]);
}

function getDetail(req, res){
    console.log("[ src/routes/products.js/:id ] INICIO");
    const { idProduct } = req.params;
    const listProducts = getListProducts();

    if (idProduct) {
        console.log("[ src/routes/products.js/:idProduct ] El id a buscar es: " + idProduct);
        const product = listProducts.filter(p => p.id == idProduct);
        if(product.length){
            console.log("[ src/routes/products.js/:idProduct ] Se encontro el detalle del producto");
            console.log("[ src/routes/products.js/:idProduct ] El producto es: " + product[0].title);
            return res.status(200).json(product[0]);
        }
        console.log("[ src/routes/products.js/:idProduct ] No hay resultados");
        return res.status(422).json({message: "No hay resultados"}); 
    }

    return res.status(400).json({message: "Falta enviar datos obligatorios"});
}



async function getListProducts(search) {
    try {
        const results = await conn.query('SELECT * FROM "BazarUniversal"."getProductCategoryNames"(:search)', {
            replacements: { search: search },
            type: conn.QueryTypes.SELECT
        });
    
        return results;
    } catch (error) {
        console.error('Error al llamar a la funcion:', error);
        throw error;
    }
}

module.exports = {
    productSearch,
    getDetail
};