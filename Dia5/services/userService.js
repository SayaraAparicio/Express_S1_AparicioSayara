export class UserService{
    constructor(userRepository){
        this.repo=userRepository
    }

    async createUser(dto){
        /*
        Lógica para cuando se ingrese el correo
        pues no esté existente...
         */
    }
    async listUser(){
        /*
        Limitar a exportar máximo 10 */
    }
    async getUser(id){
        return this.repo.findById(id);
    }
    async updateUser(id,dto){}
    async deleteUser(id){}
}