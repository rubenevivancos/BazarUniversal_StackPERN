import sequelize from '../db.js';

const { Image } = sequelize.models;


class ImageDAO {

  async getImagesByProduct(productIds) {
    try {

        // Realizamos la consulta a la base de datos, filtrando por los productIds proporcionados
        const images = await Image.findAll({
            where: {
                productID: productIds,  // Filtramos por los IDs de los productos
            },
            raw: true,
        });
        return images;

    } catch (error) {
      console.error('[ image.dao.js ] Error al obtener las imágenes: ' + error.message);
      throw error;
    }
  }

}

export default new ImageDAO();
