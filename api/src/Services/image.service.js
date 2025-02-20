import ImageDAO from '../DAO/image.dao.js';


class ImageService {

    async getImagesByProductIds(productIds) {
        try {

          const images = await ImageDAO.getImagesByProduct(productIds);
          console.log("Cantidad de imagenes encontradas: " + images.length);
          return images;

        } catch (error) {
          console.error('Error en el servicio de imágenes: ' + error.message);
          throw error;
        }
      }

}

export default new ImageService();