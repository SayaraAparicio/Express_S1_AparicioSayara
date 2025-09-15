export class UserRepository{
    constructor(UserModel){
        this.User = UserModel;//OJO --- NO OLVIDARSE QUE "User" es un atributo de UserRepository
    }
    async create(data){
        return this.User.create(data);
    }
    async findAll(){
        return this.User.find();
    }
    async findByID(id){}
    async updateById(id,data){}
    async deleteById(id){}
    async findByEmail(email){}
}