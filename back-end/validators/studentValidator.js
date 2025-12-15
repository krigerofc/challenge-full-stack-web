const { z } = require('zod');

function isValidCPF(value) {
  const digits = String(value).replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false; // reject all-equal digits

  const calc = (arr, factor) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += Number(arr[i]) * factor--;
    }
    const result = total % 11;
    return result < 2 ? 0 : 11 - result;
  };

  const num = digits.split('');
  const d1 = calc(num.slice(0, 9), 10);
  const d2 = calc(num.slice(0, 10), 11);

  return d1 === Number(num[9]) && d2 === Number(num[10]);
}

const createStudentSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').transform(s => s.trim()),
  email: z.string().email('Invalid email').transform(s => s.trim().toLowerCase()),
  ra: z.string().min(1, 'RA is required').transform(s => s.trim()),
  cpf: z
    .string()
    .refine(val => isValidCPF(val), { message: 'Invalid CPF' })
    .transform(val => String(val).replace(/\D/g, '')),
});

// Update should not allow changing RA or CPF
const updateStudentSchema = z.object({
  fullName: z.string().min(2).optional().transform(s => (s ? s.trim() : s)),
  email: z.string().email().optional().transform(s => (s ? s.trim().toLowerCase() : s)),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};
