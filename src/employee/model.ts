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
    type: String,
    required: true,
    trim: true,
    maxlength: 9,
  },
  workStart: Date,
  workFinish: Date,
});

export const Employee = mongoose.model('Employee', employeeSchema);
