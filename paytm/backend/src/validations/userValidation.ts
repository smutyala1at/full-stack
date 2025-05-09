import { signupValidation } from "./authValidation"

const updateUserValidation = signupValidation.omit({
    email: true,
}).partial()

export { updateUserValidation };