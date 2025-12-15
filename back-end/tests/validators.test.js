const { createStudentSchema, updateStudentSchema } = require('../validators/studentValidator')

describe('Student validator schemas', () => {
  test('createStudentSchema accepts valid payload', () => {
    const payload = {
      fullName: 'Test User',
      email: 'test@example.com',
      ra: 'RA123',
      cpf: '11144477735', // valid CPF
    }
    const parsed = createStudentSchema.parse(payload)
    expect(parsed).toBeDefined()
    expect(parsed.fullName).toBe('Test User')
    expect(parsed.email).toBe('test@example.com')
    expect(parsed.ra).toBe('RA123')
    // CPF transformed to digits-only
    expect(parsed.cpf).toBe('11144477735')
  })

  test('createStudentSchema rejects invalid cpf', () => {
    const payload = {
      fullName: 'Test User',
      email: 'test@example.com',
      ra: 'RA124',
      cpf: '12345678900',
    }
    expect(() => createStudentSchema.parse(payload)).toThrow()
  })

  test('updateStudentSchema accepts partial payload', () => {
    const payload = { fullName: 'New Name' }
    const parsed = updateStudentSchema.parse(payload)
    expect(parsed.fullName).toBe('New Name')
  })
})
