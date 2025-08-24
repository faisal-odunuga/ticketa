import { SignInFormValues, SignUpFormValues } from "@/hooks/definitions";
import supabase from "@/lib/supabase";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      // redirectTo: "/dashboard",
    },
  });
  if (error) console.error("Login error:", error.message);
}

export async function userLoginIn({ email, password }: SignInFormValues) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}
export async function userSignUp(formData: SignUpFormValues) {
  try {
    // 1. Sign up the user in Supabase Auth
    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          gender: formData.gender,
        },
      },
    });

    if (signUpError) {
      throw new Error(`Auth signup failed: ${signUpError.message}`);
    }

    if (!userData.user) {
      throw new Error(
        "No user returned from signup. Error creating account, Pls try again."
      );
    }

    // 2. Insert into your custom users table
    const { data: insertedData, error: insertError } = await supabase
      .from("profiles")
      .insert({
        user_id: userData.user.id,
        name: formData.name,
        gender: formData.gender,
        email: formData.email,
      })
      .select();

    if (insertError) {
      throw new Error(`User insert failed: ${insertError.message}`);
    }

    // ✅ If everything works, return data
    return { data: insertedData, error: null };
  } catch (err: unknown) {
    // Check if it's an Error object
    if (err instanceof Error) {
      console.error("Signup error:", err.message);
      return { data: null, error: err };
    }

    // Fallback for unknown types
    console.error("Signup error:", err);
    return { data: null, error: new Error("Unknown error") };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Logout error:", error.message);
  return error?.message;
}
