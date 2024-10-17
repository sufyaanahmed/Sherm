const express = require('express');
const bcrypt = require('bcrypt');
const Doctor = require('../models/Doctor'); // Import Doctor model
const Patient = require('../models/Patient'); // Import Patient model
const router = express.Router(); // Define router

// Doctor Signup Route
router.post('/doctor/signup', async (req, res) => {
  const { name, email, password, dateOfBirth, gender, medicalLicenseNumber, specialty } = req.body;
  
  try {
    // Check if the doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      medicalLicenseNumber,
      specialty,
      isVerified: false, // Unverified initially
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor registered successfully. Please wait for verification.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Patient Signup Route
router.post('/patient/signup', async (req, res) => {
  const { name, email, password, dateOfBirth, gender } = req.body;

  try {
    // Check if the patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient
    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route (common for both doctors and patients)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in both Doctor and Patient collections
    let user = await Doctor.findOne({ email }) || await Patient.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Login success
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
