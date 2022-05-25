exports.allAccess = (req, res) => {
    res.status(200).send("contenue toue publique ");
  };
  exports.userBoard = (req, res) => {
    res.status(200).send("Contenue utilisateur");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Contenue admin");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Contenue modérateur");
  };