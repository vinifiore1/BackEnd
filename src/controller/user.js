const model = require("../models");
const Yup = require("yup");
const User = model.User;

module.exports = {
  async createUser(req, res) {
    try {
      const { name, login, password_hash, email, isAdmin } = req.body;

      const loginExists = await User.findOne({
        where: { login: req.body.login },
      });

      const emailExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (loginExists || emailExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        password_hash: Yup.string().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Validation fails" });
      }

      const SaveUser = await User.create({
        name,
        login,
        password_hash,
        email,
        isAdmin,
      });

      SaveUser.password_hash = undefined;

      return res.json({ SaveUser });
    } catch (error) {
      return res.json({ error });
    }
  },
};
