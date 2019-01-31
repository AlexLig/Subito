import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  vat: {
    type: Number,
    required: true,
    trim: true,
    min: 9,
    max: 9,
  },
  workStart: Date,
  workFinish: Date,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
