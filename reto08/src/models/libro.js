import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: true, 
    unique: true 
  },
  año: { 
    type: Number, 
    required: true 
  },
  genero: { 
    type: String, 
    required: true 
  },
  autorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Autor", 
    required: true 
  },
});

export default mongoose.model("Libro", libroSchema);
