interface IStorage {
  upload(path: string, file: Express.Multer.File):Promise<string>;
  delete(imageLink: string|undefined): Promise<void>
}

export default IStorage
