const db = require("../database/db-config");

class User {
  query() {
    return db("users");
  }

  find() {
    return this.query().select("id", "displayName", "department", "email");
  }

  create(user) {
    return this.query()
      .insert(user)
      .then((ids) => this.findById(ids[0]));
  }

  findById(id) {
    return this.query()
      .where({ id })
      .select("id", "displayName", "department", "email")
      .first();
  }

  async isExist(email) {
    const user = await this.query().where({ email }).first();
    return user ? true : false;
  }
}

module.exports = new User();
