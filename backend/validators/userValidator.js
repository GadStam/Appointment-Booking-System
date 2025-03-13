import z from "zod";
import validator from "validator";

const userSchema = z.object({
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
});

// Función para validar el DOCTOR
function validateUser(object) {
  return userSchema.safeParse(object);
}



export { validateUser };
