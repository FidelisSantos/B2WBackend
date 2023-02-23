import UserService from "../../src/services/UserService";
import Mapping from "../../src/Mapping/Mapping";
import IUserRepository from "../../src/interfaces/repository/IUserRepository";
import { getMockReq, getMockRes } from '@jest-mock/express';
import { verify } from "crypto";

const { res, next, clearMockRes } = getMockRes();

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
  clearMockRes()
})

describe("Create user", () => {
  test("should be able to create a new user", async () => {
    const userService = new UserService(userRepository, Mapping);
    const req = getMockReq({
      body:{name: "Teste", email: "test@example.com", password: "teste123"}
    });

    await userService.create(req, res);

    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });

  test("not be able to create a new user by password", async () => {
    const userService = new UserService(userRepository, Mapping);
    const req = getMockReq({
      body:{name: "Teste", email: "test@example.com", password: "tes"}
    });

    await userService.create(req, res);

    expect(userRepository.create).toHaveBeenCalledTimes(0);
  });
})
