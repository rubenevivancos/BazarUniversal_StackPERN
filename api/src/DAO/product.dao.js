import { Op } from 'sequelize';
import sequelize from '../db.js';

const { Product, Category } = sequelize.models;


class ProductDAO {

  async getProductCategoryNames(search) {
    try {
      const result = await Product.findAll({
        attributes: [
          'id',
          [sequelize.col('product.id'), 'p_id'], // Cambié Product.id por product.id
          'title',
          'description',
          'price',
          [sequelize.col('product.discount_percentage'), 'discountPercentage'], // Cambié Product.discount_percentage por product.discount_percentage
          'rating',
          'stock',
          'brand',
          'thumbnail',
          [sequelize.col('product.category_id'), 'categoryID'], // Cambié Product.category_id por product.category_id
          [sequelize.col('category.id'), 'c_id'], // Aquí se mantiene category.id
          [sequelize.col('category.name'), 'category'] // Aquí también se mantiene category.name
        ],
        include: [
          {
            model: Category, // Relación sin alias
            attributes: []
          }
        ],
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { 'Category.name': { [Op.iLike]: `%${search}%` } } // Aquí, 'category' es el modelo sin alias
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

}

export default new ProductDAO();
