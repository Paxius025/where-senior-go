import { checkSession } from "./authService.js";

export const verifySessionOrRedirect = async (navigate) => {
  try {
    const session = await checkSession();
    if (!session.valid) {
      navigate("/");
    }
    return session;
  } catch (error) {
    console.error("Session verification failed:", error);
    navigate("/");
  }
};
