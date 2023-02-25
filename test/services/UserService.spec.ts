import UserService from "../../src/services/UserService";
import Mapping from "../../src/mapping/Mapping";
import IUserRepository from "../../src/interfaces/repository/IUserRepository";
import { getMockReq, getMockRes } from '@jest-mock/express';
import { BadRequestError } from '../../src/error/BadRequestError';
import { ConflictError } from '../../src/error/ConflictError';
import { describe } from "node:test";

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
}

beforeEach(() => {
  clearMockRes();
  userRepository.existsEmail.mockClear;
  userRepository.exists.mockClear;
})

describe("Create user", () => {
  test("should be able to create a new user", async () => {
    const userService = new UserService(userRepository, Mapping);
    const req = getMockReq({
      body:{name: "Teste", email: "test@example.com", password: "teste123"}
    });

    await userService.create(req);

    expect(userRepository.create).toBeCalledTimes(1);
  });
  test("Error Name Empty", async () => {
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
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
    const userService = new UserService(userRepository, Mapping);
    const result = await userService.findAll();

    expect(result).toBe(null);
  });
});

describe("Delete User", () => {
  test("Delete a user", async () => {
    const userService = new UserService(userRepository, Mapping);
    userRepository.exists.mockImplementation(async() => true)
    const req = getMockReq()
    req.params.id = "hauahua";

    await userService.delete(req)
    expect(userRepository.delete).toBeCalled();
  });

  test("Delete a dont exists", async () => {
    const userService = new UserService(userRepository, Mapping);
    userRepository.exists.mockImplementation(async() => false)
    const req = getMockReq()
    req.params.id = "ahuahuha";
    try {
      await userService.delete(req)
    } catch (err) {
      expect(err instanceof BadRequestError &&
              err.message == "Usuário não encontrado").toBe(true);
    }

  });
});
