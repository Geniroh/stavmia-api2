import { Request, Response } from "express";
import Innovation from "../models/innovations.model";

export const uploadInnovation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newInnovation = await Innovation.create({
      product_name: req.body.innovation_name,
      year_invented: req.body.innovation_year,
      country: req.body.innovation_country,
      cost: Number(req.body.innovation_cost),
      product_chain: req.body.innovation_value_chain,
      product_phase: req.body.innovation_phase,
      product_use: req.body.product_usage,
      product_description: req.body.product_description,
      product_media: req.body.product_media,
      is_example: req.body.isUsageExample,
      product_example: req.body.instances,
      product_instruction: req.body.instructions,
      product_inventor: req.body.inventor,
      product_supplier: req.body.supplier,
      product_guidelines: req.body.hseguidelines,
      is_gender_friendly: req.body.isGenderFriendly,
      product_gender_description: req.body.gender_description,
    });

    res.json(newInnovation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// if (req.body.isUsageExample) {
//   const instancePromises = req.body.instances.map(async (instance: any) => {
//     return ProductInstance.create({
//       description: instance.instance_description,
//       media: instance.instance_media,
//       innovation: newInnovation._id, // Associate the instance with the created innovation
//     });
//   });

//   // Await the completion of all instance creations
//   const newInstances = await Promise.all(instancePromises);
//   newInnovation.product_example = newInstances.map(instance => instance._id);
// }

// await newInnovation.save(); // Save the updated innovation with instance references

// import { Request, Response } from "express";
// import mongoose from "mongoose";
// import Innovation from "../models/innovations.model";
// import Supplier from "../models/suppliers.model";
// import ProductInstance from "../models/instance.model";

// export const uploadInnovation = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const session = await mongoose.startSession();

//   try {

//     // Create the new innovation
//     const newInnovation = await Innovation.create({
//       product_name: req.body.innovation_name,
//       year_invented: req.body.innovation_year,
//       country: req.body.innovation_country,
//       cost: Number(req.body.innovation_cost),
//       product_chain: req.body.innovation_value_chain,
//       product_phase: req.body.innovation_phase,
//       product_use: req.body.product_usage,
//       product_description: req.body.product_description,
//       product_media: req.body.product_media,
//       is_example: req.body.isUsageExample,
//       product_example: req.body.instances,
//       product_instruction: req.body.instructions,
//       product_inventor: req.body.inventor,
//       product_supplier: req.body.supplier,
//       product_guidelines: req.body.hseguidelines,
//       is_gender_friendly: req.body.isGenderFriendly,
//       product_gender_description: req.body.gender_description
//     });

//     await session.commitTransaction();

//     res.json(newInnovation);
//   } catch (error) {
//     await session.abortTransaction();
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   } finally {
//     session.endSession();
//   }
