import { signupValidation } from "./authValidation"

const updateUserValidation = signupValidation.partial()

export { updateUserValidation };