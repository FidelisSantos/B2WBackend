import UserService from "../../src/services/UserService";
import Mapping from "../../src/mapping/Mapping";
import IUserRepository from "../../src/interfaces/repository/IUserRepository";
import { getMockReq, getMockRes } from '@jest-mock/express';
import { BadRequestError } from '../../src/error/BadRequestError';
import { ConflictError } from '../../src/error/ConflictError';
import { describe } from "node:test";
import UserRoleEnum from '../../src/enum/UserRoleEnum';
import User from "../../src/models/User";

const { clearMockRes } = getMockRes();


const userRepository: jest.Mocked<IUserRepository> ={
  create: jest.fn(),
  existsEmail: jest.fn(),
  exists: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  updateRole: jest.fn(),
  validUser: jest.fn(),
  changePassword: jest.fn(),
  update: jest.fn(),
};

const userService = new UserService(userRepository, Mapping);

beforeEach(() => {
  clearMockRes();
  userRepository.existsEmail.mockClear();
  userRepository.exists.mockClear();
  userRepository.findOne.mockClear();
})

describe("Create user", () => {
  test("should be able to create a new user", async () => {
    const req = getMockReq({
      body:{name: "Teste", email: "test@example.com", password: "teste123"}
    });

    await userService.create(req);

    expect(userRepository.create).toBeCalledTimes(1);
  });
  test("Error Name Empty", async () => {
    const req = getMockReq({
      body:{name: "", email: "test@example.com", password: "teste123"}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
              err.message == "Campo nome obrigatório").toBe(true);

    }
  });

  test("Error Email Empty", async () => {
    const req = getMockReq({
      body:{name: "Teste", email: "", password: "teste123"}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
              err.message == "Campo email obrigatório").toBe(true);
    }
  });

  test("Error Password Empty", async () => {
    const req = getMockReq({
      body:{name: "Teste", email: "test@example.com", password: ""}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
              err.message == "Campo senha obrigatório").toBe(true);
    }
  });

  test("Error Email Exists", async () => {
    const email = "test@example.com";
    userRepository.existsEmail.mockResolvedValue(true);
    const req = getMockReq({
      body:{name: "Teste", email: email , password: "teste123"}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof ConflictError &&
            err.message == `Já existe usuário com email ${email}`).toBe(true);
    }
  });

  test("Error Name Invalid", async () => {
    const req = getMockReq({
      body:{name: "Teste1", email: "test@example.com", password: "tehauahuahas"}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
            err.message === "Nome inválido").toBe(true);
    }
  });

  test("Error Email Invalid", async () => {
    const req = getMockReq({
      body:{name: "Teste", email: "testexample.com", password: "tehauahuahas"}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
            err.message === "Email inválido").toBe(true);
    }
  });

  test("Error Password Invalid", async () => {
    const req = getMockReq({
      body:{name: "Teste", email: "test@example.com", password: "tes"}
    });
    try {
      await userService.create(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
            err.message === "Senha tem que ter no minimo 6 digitos").toBe(true);
    }
  });
});

describe("List All Users", () => {
  test("List All Users", async () => {
    userRepository.findAll.mockImplementation(async () => {
      [
        {
          "name": "Isabela Acioli Medardo",
          "email": "isabela_medardo_ext_1@carrefour.com",
          "role": "user",
          "isValid": true
        },
        {
          "name": "Vitoria Clara de Paula Cordeiro",
          "email": "vitoria_cordeiro_ext@carrefour.com",
          "role": "admin",
          "isValid": true
        }
      ]
    });
    expect(userService.findAll).not.toBeNull();
  });

  test("List All Users Empity", async () => {
    const result = await userService.findAll();

    expect(result).toBe(null);
  });
});

describe("Delete User", () => {

  test("Delete a user", async () => {
    userRepository.exists.mockImplementation(async() => true);
    const req = getMockReq()
    req.params.id = "hauahua";

    await userService.delete(req)
    expect(userRepository.delete).toBeCalled();
  });

  test("Delete a dont exists", async () => {
    const userService = new UserService(userRepository, Mapping);
    const req = getMockReq();
    req.params.id = "ahuahuha";
    try {
      await userService.delete(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
              err.message == "Usuário não encontrado").toBe(true);
    }
  });
});

describe("Reset Password", () => {

  test("Reset Password", async () => {
    userRepository.exists.mockImplementation(async () => true);
    const req = getMockReq();
    req.params.id = "ahuahuha";


    await userService.resetPassword(req);

    expect(userRepository.changePassword).toBeCalledTimes(1);
  });

  test("Reset User Don't Exist", async () => {
    const req = getMockReq();
    req.params.id = "ahuahuha";

    try {
      await userService.resetPassword(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
              err.message == "Usuário não encontrado").toBe(true);
    }
  });
});

describe("New Password", () => {

  test("New Password", async () => {
    userRepository.exists.mockImplementation(async () => true);
    const req = getMockReq();
    req.params.id = "ahuahuha";
    req.body.password = "password";
    await userService.newPassword(req);

    expect(userRepository.changePassword).toBeCalledTimes(1);
  });

  test("New Password User Don't exists", async () => {
    const req = getMockReq();
    req.params.id = "ahuahuha";
    req.body.password = "password";
    try {
      await userService.newPassword(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
        err.message == "Usuário não encontrado").toBe(true);
    }
  });

  test("New Password password empty", async () => {
    const req = getMockReq();
    req.params.id = "ahuahuha";

    try {
      await userService.newPassword(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
        err.message == "Campo senha obrigatório").toBe(true);
    }
  });

  test("New Password password invalid", async () => {
    const req = getMockReq();
    req.params.id = "ahuahuha";
    req.body.password = "p";
    try {
      await userService.newPassword(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
        err.message == "Senha tem que ter no minimo 6 digitos").toBe(true);
    }
  });
});

describe("Update Role", () => {

  test("Update Role", async () => {
    userRepository.exists.mockImplementation(async () => true);
    const req = getMockReq();
    req.params.id = "ahuahuha";

    await userService.updateRole(req, UserRoleEnum.USER);

    expect(userRepository.updateRole).toBeCalledTimes(1);
  });

  test("Update Role User Don't Exists", async () => {
    const req = getMockReq();

    try {
      await userService.updateRole(req, UserRoleEnum.USER);
    } catch (err) {
      expect(err instanceof BadRequestError &&
        err.message == "Usuário não encontrado").toBe(true);
    }
  });
});

describe("Update", () => {

  test("Update Role", async () => {
    const user: User = {
      name: "Isabela Acioli Medardo",
      email: "isabela_medardo_ext_1@carrefour.com",
      role: UserRoleEnum.USER,
      isValid: true,
      password:"password"
    };

    const req = getMockReq({
      params: {id: "ajajijaajiaia"},
      body:{name: "Teste", email: "test@example.com"}
    });

    userRepository.findOne.mockImplementation(async () => user);

    userRepository.existsEmail.mockImplementation(async () => false);

    await userService.update(req);

    expect(userRepository.update).toBeCalledTimes(1);
  });

  test("Update Role Don't exists", async () => {
    const req = getMockReq({
      params: {id: "ajajijaajiaia"},
      body:{name: "Teste", email: "test@example.com"}
    });

    try {
      await userService.update(req);
    } catch (err) {
      expect(err instanceof BadRequestError &&
        err.message == "Usuário não encontrado").toBe(true);
    }
  });

  test("Update Role Email Exists", async () => {
    const req = getMockReq({
      params: {id: "ajajijaajiaia"},
      body:{name: "Teste", email: "test@example.com"}
    });

    const user: User = {
      name: "Isabela Acioli Medardo",
      email: "isabela_medardo_ext_1@carrefour.com",
      role: UserRoleEnum.USER,
      isValid: true,
      password:"password"
    };

    userRepository.findOne.mockImplementation(async () => user);

    userRepository.existsEmail.mockImplementation(async () => true);

    try {
      await userService.update(req)
    } catch (err) {
      expect(err instanceof ConflictError &&
        err.message == `Já existe usuário com email ${req.body.email}`).toBe(true);
    }
  });
});
