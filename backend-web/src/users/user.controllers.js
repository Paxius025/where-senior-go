import { getUserProfileService, updateUserProfileService } from "./user.services.js";

const getUserProfileController = async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const userProfile = await getUserProfileService(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
}

const updateUserProfileController = async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { username, email, contact, ku_year, major_id, faculty_id, role } = req.body;
    console.log("Update Profile contoller:" ,role)
    const updatedUser = await updateUserProfileService(userId, username, email, contact, ku_year, major_id, faculty_id, role);
    
    // Update session with new user data
    req.session.user = {
      userId: updatedUser.user_id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export { getUserProfileController, updateUserProfileController };