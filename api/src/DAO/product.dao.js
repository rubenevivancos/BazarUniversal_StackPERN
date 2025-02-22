import { Op } from 'sequelize';
import sequelize from '../db.js';

const { Product, Category } = sequelize.models;


class ProductDAO {

  async getProductCategoryNames(search) {
    try {
      const result = await Product.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'price',
          'discountPercentage',
          'rating',
          'stock',
          'brand',
          'thumbnail',
          'categoryID'
        ],
        include: [
          {
            model: Category, // Relación sin alias
            attributes: ['id', 'name'] 
          }
        ],
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { '$Category.name$': { [Op.iLike]: `%${search}%` } } // $ hace que Sequelize interprete que estás referenciando un campo del modelo incluido (Category), no de la tabla principal (Product).
          ]
        },
        raw: true
      });
  
      return result;
    } catch (error) {
      console.error('Error al obtener productos y categorías:', error);
      throw error; 
    }
  }

  async getProductDetail(productID) {
    try {
      const product = await Product.findOne({
        where: { id: productID },
        raw: true
      });

      if (!product) {
        throw new Error('Producto con ID ' + productID + ' no encontrado');
      }
  
      return result;
    } catch (error) {
      console.error('Error al obtener el detalle del producto:', error);
      throw error; 
    }
  }

}



export default new ProductDAO();
