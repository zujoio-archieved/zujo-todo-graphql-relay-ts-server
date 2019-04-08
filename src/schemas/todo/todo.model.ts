import mongoose from "mongoose"

import { TodoModel } from "./todo.typedef"

const todoSchema = new mongoose.Schema(
    {
        complete: { type: Boolean, default: false },
        text: String,
        attachmentpath: { type: String, default: "Null" }
    }, 
    { 
      timestamps: true,
      toJSON:{
        transform: (doc, ret) =>{
          delete ret._v
        }
      }
    }
);

const ToDo = mongoose.model<TodoModel>("ToDo", todoSchema);
export { ToDo } 