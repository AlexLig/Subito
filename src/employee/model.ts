import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  vat: {
    type: Number,
    required: true,
    trim: true,
    max: 9,
    min: 9,
  },
  workStart: Date,
  workFinish: Date,
});

export const Employee = mongoose.model('Employee', employeeSchema);
