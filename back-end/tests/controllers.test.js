const request = require('supertest')
const app = require('../index')

// Mock the studentModel to avoid touching DB
jest.mock('../models/studentModel')
const studentModel = require('../models/studentModel')

describe('Student controller (update)', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('updates an existing student', async () => {
    const existing = { id: 1, fullName: 'Old', email: 'old@example.com', ra: 'RA1', cpf: '11144477735' }
    studentModel.getStudentById.mockResolvedValue(existing)
    studentModel.updateStudent.mockResolvedValue({ ...existing, fullName: 'Updated' })

    const payload = { fullName: 'Updated', email: 'updated@example.com' }

    const res = await request(app).put('/api/students/1').send(payload)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toBeDefined()
    expect(res.body.data.fullName).toBe('Updated')
  })

  test('returns 404 when student not found', async () => {
    studentModel.getStudentById.mockResolvedValue(null)
    // use a payload that passes validation (fullName length >= 2)
    const res = await request(app).put('/api/students/999').send({ fullName: 'NoOne' })
    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBe('Student not found')
  })
})
