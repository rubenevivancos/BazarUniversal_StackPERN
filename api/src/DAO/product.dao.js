import ProductModel from "../Models/Product.js";

export class ProductDAO {

  async findAll(info) {
    return await Appointments.find(info);
  }


  async findPopulate(data, otherModels = "", populateExclude = "") {
    return await Appointments.find(data).populate({
      path: otherModels,
      select: populateExclude,
    });
  }
}
