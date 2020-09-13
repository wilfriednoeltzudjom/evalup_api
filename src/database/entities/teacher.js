const teacherEnums = require('../enums/teacher');
const entityValidator = require('../../application/helpers/entity-validator');
const {
  BadRequestError,
  ParameterError,
} = require('../../application/helpers/errors');

module.exports = function buildStudent({
  commonDataGenerator,
  commonDataValidator,
}) {
  function validatetype(type) {
    const teacherTypes = Object.keys(teacherEnums.types);
    if (!type) throw new ParameterError('Teacher type is required');
    if (!teacherTypes.includes(type))
      throw new BadRequestError(
        `Teacher type must be one of [${teacherTypes}]`
      );
  }

  return class Teacher {
    #id;
    #type;
    #account;

    constructor({ id = commonDataGenerator.generateId(), type, account }) {
      commonDataValidator.validateId(id);
      validatetype(type);
      entityValidator.validateAccount({ account, required: true });

      this.#id = id;
      this.#type = type;
      this.#account = account;

      Object.seal(this);
    }

    get id() {
      return this.#id;
    }

    set type(type) {
      validatetype(type);
      this.#type = type;
    }

    get type() {
      return this.#type;
    }

    set account(account) {
      entityValidator.validateAccount({ account, required: true });
      this.#account = account;
    }

    get account() {
      return this.#account;
    }

    toJSON() {
      return {
        id: this.#id,
        type: this.#type,
        account: this.#account.toJSON(),
      };
    }
  };
};
