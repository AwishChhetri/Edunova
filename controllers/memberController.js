const Member = require('../models/Member');

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error("Error fetching members:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Create a new member
exports.createMember = async (req, res) => {
  const {
    name, status, role, email, teams,
    workEmail, dob, gender, nationality, contactNo, profilePhoto
  } = req.body;

  const newMemberData = {
    name, status, role, email, teams,
    workEmail, dob, gender, nationality, contactNo, profilePhoto
  };

  const newMember = new Member(newMemberData);
  console.log(newMember)
  try {
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    console.error("Error saving member:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// Get a member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    console.error("Error fetching member:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Update an existing member
exports.updateMember = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // Return the updated document
    );
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(updatedMember);
  } catch (err) {
    console.error("Error updating member:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error("Error deleting member:", err.message);
    res.status(500).json({ message: err.message });
  }
};
