import { Op } from 'sequelize';
import sequelize from '../db.js';

const { Product, Category, Image } = sequelize.models;


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
            model: Category,
            attributes: ['id', 'name'] 
          },
          {
            model: Image,
            attributes: ['url']
          }
        ],
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { '$Category.name$': { [Op.iLike]: `%${search}%` } } // $ hace que Sequelize interprete que estás referenciando un campo del modelo incluido (Category), no de la tabla principal (Product).
          ]
        }
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
        include: [
          {
            model: Category,
            attributes: ['id', 'name'] 
          },
          {
            model: Image,
            attributes: ['url']
          }
        ],
        where: { id: productID }
      });

      if (!product) {
        throw new Error('Producto con ID ' + productID + ' no encontrado');
      }
  
      return product;
    } catch (error) {
      console.error('Error al obtener el detalle del producto:', error);
      throw error; 
    }
  }

}



export default new ProductDAO();
