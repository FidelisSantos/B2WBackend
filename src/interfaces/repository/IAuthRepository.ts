interface IAuthRepository {
  findByEmail(email: string):Promise<any>;
}

export default IAuthRepository;
