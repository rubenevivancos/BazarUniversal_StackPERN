import ProductDAO from '../DAO/product.dao.js';


class ProductService {

    async getProductCategoryNames(search) {
      try {
        const products = await ProductDAO.getProductCategoryNames(search);
        console.log("Cantidad de productos encontrados: " + products.length);
        return products;
      } catch (error) {
        console.error('Error en el servicio de productos:', error);
        throw error;
      }
    }

    async getProductDetail(productID) {
      try {
        const product = await ProductDAO.getProductDetail(productID);
        console.log("Se encontró el detalle del producto con id: " + productID);
        return product;
      } catch (error) {
        console.error('Error en el servicio de productos:', error);
        throw error;
      }
    }
}

export default new ProductService();