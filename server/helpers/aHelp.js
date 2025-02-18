import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const add = 10;
    const hashPass = await bcrypt.hash(password, add);
    return hashPass;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashPass) => {
  return bcrypt.compare(password, hashPass);
};
