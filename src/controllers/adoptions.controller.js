import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptionsService.getAll();
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    console.error("Error in getAllAdoptions:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId });
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
    res.status(200).send({ status: "success", payload: adoption });
  } catch (error) {
    console.error("Error in getAdoption:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createAdoption = async (req, res) => {
    try {
      const { uid, pid } = req.params;
  
      const user = await usersService.getUserById(uid);
      if (!user) {
        return res.status(404).send({ status: "error", error: "User not found" });
      }
  
      const pet = await petsService.getBy({ _id: pid });
      if (!pet) {
        return res.status(404).send({ status: "error", error: "Pet not found" });
      }
  
      if (pet.adopted) {
        return res.status(400).send({ status: "error", error: "Pet is already adopted" });
      }
  
      user.pets.push(pet._id);
      await usersService.update(user._id, { pets: user.pets });
      await petsService.update(pet._id, { adopted: true, owner: user._id });
  
      const adoption = await adoptionsService.create({ owner: user._id, pet: pet._id });
  
      return res.status(201).send({
        status: "success",
        payload: {
          userId: user._id.toString(),
          petId: pet._id.toString(),
          _id: adoption._id
        }
      });
    } catch (error) {
      console.error("Error in createAdoption:", error);
      return res.status(500).send({ status: "error", error: "Internal server error" });
    }
  }
export default {
  createAdoption,
  getAllAdoptions,
  getAdoption
};