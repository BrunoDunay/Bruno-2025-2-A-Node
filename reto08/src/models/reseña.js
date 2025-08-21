import mongoose from "mongoose";

const reseñaSchema = new mongoose.Schema({
  comentario: { 
    type: String, 
    required: true 
  },
  puntuacion: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  fecha: { 
    type: Date, 
    default: Date.now 
  },
  libroId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Libro", 
    required: true 
  },
});

export default mongoose.model("Reseña", reseñaSchema);
