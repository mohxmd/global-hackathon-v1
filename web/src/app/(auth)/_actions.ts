"use server";

import { auth } from "@/lib/auth";
import {
  SignIn,
  signInSchema,
  SignUp,
  signUpSchema,
} from "@/lib/zod-validations/auth";
import { getErrorMessage } from "@/lib/utils/error";

export async function signUpAction(data: SignUp) {
  try {
    const validated = signUpSchema.parse(data);

    const result = await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        password: validated.password,
        image: validated.image,
      },
    });

    if (!result) {
      return { success: false, error: "Sign up failed" };
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function signInAction(data: SignIn) {
  try {
    const validated = signInSchema.parse(data);

    const result = await auth.api.signInEmail({
      body: {
        email: validated.email,
        password: validated.password,
        rememberMe: validated.rememberMe,
      },
    });

    if (!result) {
      return { success: false, error: "Sign in failed" };
    }

    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
