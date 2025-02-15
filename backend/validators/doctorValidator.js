import z from "zod";
import validator from "validator";

const doctorSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .nonempty(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .nonempty()
    .refine((email) => validator.isEmail(email), {
      message: "Invalid email format",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .nonempty(),
  speciality: z
    .string({
      required_error: "Speciality is required",
      invalid_type_error: "Speciality must be a string",
    })
    .nonempty(),
  degree: z
    .string({
      required_error: "Degree is required",
      invalid_type_error: "Degree must be a string",
    })
    .nonempty(),
  experience: z
    .string({
      required_error: "Experience is required",
      invalid_type_error: "Experience must be a string",
    })
    .nonempty(),
  about: z
    .string({
      required_error: "About is required",
      invalid_type_error: "About must be a string",
    })
    .nonempty(),
  fees: z
    .string({
      required_error: "Fees is required",
      invalid_type_error: "Fees must be a number",
    })
    .nonempty(),
  address: z.string({})
      .nonempty(),
});

// Función para validar el DOCTOR
function validateDoctor(object) {
  return doctorSchema.safeParse(object);
}

function validatePartialDoctor(object) {
  return doctorSchema.partial().safeParse(object); // partial: para que todas las propiedades definidas en él se vuelvan opcionales.
}

export { validateDoctor, validatePartialDoctor };
