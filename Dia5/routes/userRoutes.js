import {Router} from "express";

//La famosa vista...
export function buildUserRouter(UserController){
    const router = Router();
    router.get("/",UserController.list);
    router.get("/:id",UserController.get);
    router.post("/",UserController.create);
    router.put("/:id",UserController.update);
    router.delete("/:id",UserController.delete);

    return router;
}