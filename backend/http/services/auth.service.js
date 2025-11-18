import { signup, signin } from "../services/auth.service.js";

export async function postSignup(req, res) {
  try {
    const { email, name, password } = req.body;

    let data = await signup({ email, name, password });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Signup Failed",
    });
  }
}

export async function postSignin(req, res) {
  try {
    const { email, name, password } = req.body;

    let data = await signin({ email, password });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Signin Failed",
    });
  }
}
