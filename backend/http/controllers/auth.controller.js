import { signup, signin } from "../services/auth.service.js";
import { signupSchema, signinSchema } from "../schemas/auth.schema.js";

export async function postSignup(req, res) {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Signup Validation failed",
        details: JSON.parse(result.error.message),
      });
    }

    const { email, name, password } = result.data;
    let data = await signup({ email, name, password });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error,
      message: "Signup Failed",
    });
  }
}

export async function postSignin(req, res) {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Signin Validation failed",
        details: JSON.parse(result.error.message),
      });
    }

    const { email, password } = result.data;
    const data = await signin({ email, password });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Signin Failed",
    });
  }
}

export async function getMe(req, res) {
  return res.status(200).json({
    user: req.user,
  });
}
