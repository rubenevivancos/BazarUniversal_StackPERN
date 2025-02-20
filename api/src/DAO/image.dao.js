import sequelize from '../db.js';

const { Image } = sequelize.models;


class ImageDAO {

  async getImagesByProduct(search) {
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

}

export default new ImageDAO();
