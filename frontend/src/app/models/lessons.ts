import mongoose, { Schema, Document, model, models } from 'mongoose';

// Define interfaces
export interface IExample extends Document {
  description: string;
  imageUrl: string;
}

export interface ITask extends Document {
  taskNumber: number;
  description: string;
  maxPhotos: number;
}

export interface ILesson extends Document {
  lessonNumber: number;
  title: string;
  content: string;
  examples: IExample[];
  tasks: ITask[];
}

export interface ISublevel extends Document {
  title: string;
  lessons: ILesson[];
  tasks: ITask[];
}

export interface ILevel extends Document {
  level: string;
  sublevels: ISublevel[];
}

// Define schemas
const exampleSchema = new Schema<IExample>({
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const taskSchema = new Schema<ITask>({
  taskNumber: { type: Number, required: true },
  description: { type: String, required: true },
  maxPhotos: { type: Number, required: true }
});

const lessonSchema = new Schema<ILesson>({
  lessonNumber: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  examples: [exampleSchema],
  tasks: [taskSchema]
});

const sublevelSchema = new Schema<ISublevel>({
  title: { type: String, required: true },
  lessons: [lessonSchema],
  tasks: [taskSchema]
});

const levelSchema = new Schema<ILevel>({
  level: { type: String, required: true },
  sublevels: [sublevelSchema]
});

// Create and export the model
const Lesson = models.Lesson || model<ILevel>('Lesson', levelSchema);

export default Lesson;
