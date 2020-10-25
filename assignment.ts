import mongoose from 'mongoose';

 const mongoSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    assignmentName: {type: String}
}) 

export const assignmentSchema =  mongoose.model('Assignment', mongoSchema);
