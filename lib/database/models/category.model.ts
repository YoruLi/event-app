import { Document, Schema, SchemaDefinition, model, models } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema<SchemaDefinition>({
  name: { type: String, required: true, unique: true },
});

const Category = (models && models?.Category) || model("Category", CategorySchema);

export default Category;
