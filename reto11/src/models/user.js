import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true, 
    minlength: 3 
  },
  correo: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contraseña: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  rol: { 
    type: String, 
    default: "usuario" 
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
