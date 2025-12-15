const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createStudent(data) {
  return prisma.student.create({ data });
}

async function getAllStudents() {
  return prisma.student.findMany({ orderBy: { createdAt: 'desc' } });
}

async function getStudentById(id) {
  return prisma.student.findUnique({ where: { id: Number(id) } });
}

async function getStudentByRa(ra) {
  return prisma.student.findUnique({ where: { ra } });
}

async function updateStudent(id, data) {
  return prisma.student.update({ where: { id: Number(id) }, data });
}

async function deleteStudent(id) {
  return prisma.student.delete({ where: { id: Number(id) } });
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByRa,
  updateStudent,
  deleteStudent,
};
