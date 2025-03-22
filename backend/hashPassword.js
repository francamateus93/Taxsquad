import bcrypt from "bcrypt";

const generateHash = async () => {
  const passwordPlain = "aryane";
  const hashedPassword = await bcrypt.hash(passwordPlain, 10);
  console.log("Senha hashada:", hashedPassword);
};

generateHash();
