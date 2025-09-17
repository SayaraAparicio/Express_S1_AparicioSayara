export class UserController{
    constructor(userService){
        this.service=userService;
    }
    // OJOOOOO - Ya estamos manejando aqui el body/parametros/etc.. del request
    create = async (req,res)=>{};
    list = async (req,res)=>{};
    get = async (req,res)=>{};//Obtener por ID desde el EndPoint
    update = async (req,res)=>{};
    delete = async (req,res)=>{};
}