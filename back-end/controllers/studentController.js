const studentModel = require('../models/studentModel');
const { createStudentSchema, updateStudentSchema } = require('../validators/studentValidator');

async function createStudent(req, res) {
  try {
    const parsed = createStudentSchema.parse(req.body);
    // Ensure RA uniqueness
    const existing = await studentModel.getStudentByRa(parsed.ra);
    if (existing) return res.status(409).json({ error: 'RA already exists' });

    try {
      const created = await studentModel.createStudent(parsed);
      return res.status(201).json({ data: created, message: 'Student created successfully' });
    } catch (err) {
      if (err && err.code === 'P2002') {
        const fields = err.meta?.target ? err.meta.target.join(', ') : 'field';
        return res.status(409).json({ error: `${fields} already exists` });
      }
      throw err;
    }
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message });
  }
}



async function listStudents(req, res) {
  try {
    const students = await studentModel.getAllStudents();
    return res.json({ data: students });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



async function getStudent(req, res) {
  try {
    const { id } = req.params;
    const student = await studentModel.getStudentById(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    return res.json({ data: student });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const parsed = updateStudentSchema.parse(req.body);
    const student = await studentModel.getStudentById(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    // Prevent RA/CPF updates
    const data = { ...parsed };
    try {
      const updated = await studentModel.updateStudent(id, data);
      return res.json({ data: updated, message: 'Student updated successfully' });
    } catch (err) {
      if (err && err.code === 'P2002') {
        const fields = err.meta?.target ? err.meta.target.join(', ') : 'field';
        return res.status(409).json({ error: `${fields} already exists` });
      }
      throw err;
    }
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: err.message });
  }
}



async function removeStudent(req, res) {
  try {
    const { id } = req.params;
    const student = await studentModel.getStudentById(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    await studentModel.deleteStudent(id);
    return res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



module.exports = {
  createStudent,
  listStudents,
  getStudent,
  updateStudent,
  removeStudent,
};
