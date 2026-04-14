import User from "../database/models/users.js";
import bcrypt from 'bcrypt';



//Get all users

export const getAllUsers=async(re,res)=>{
    try {
        const users=await User.findAll();
         if(!users){
            return res.status(404).json({message:"No user in the database"})
        }
        res.status(200).json(users);
        console.log("All users",users)
    } catch(error) {
        res.status(500).json({error:error.message})
    }
}

//Get Single user
export const singleUser=async(req,res)=>{
    try {
        const user=await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json(`We get user called ${user}`)
    } catch(error) {
        res.status(500).json({error:error.message})
    }
}
//create user

export const createUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role, date_of_birth, gender, location, profile_image, status, emergency_contact  } = req.body;

    // ✅ Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      date_of_birth,
      gender,
      location,
      profile_image,
      status,
      emergency_contact

    });

    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = req.body;

    let updatedData = { ...userData };

    // If password is being updated, hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    await user.update(updatedData);

    res.status(200).json({
      message: "User updated successfully ✅",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      message: "User deleted successfully 🗑️"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = Math.random().toString(36).substring(2);

    // 🔐 Hash token
    const hashedToken = await bcrypt.hash(resetToken, 10);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // ⚠️ Send raw token to user (for now we return it)
    res.status(200).json({
      message: "Reset token generated",
      token: resetToken
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//reset password


export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // clear token after use
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//change password


export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare old password with hashed one
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // hash new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};