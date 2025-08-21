import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  nacionalidad: { 
    type: String, 
    required: true 
  },
  fechaNacimiento: { 
    type: Date 
  },
});

export default mongoose.model("Autor", autorSchema);
