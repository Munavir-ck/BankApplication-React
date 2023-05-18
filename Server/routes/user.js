import express from "express";

import {signup,login,deposit,withdraw,transfer,trasactions, profile} from "../controller/user.js"
import { verifyuserJWT } from "../middileware/auth.js";

const router=express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.post("/deposit",verifyuserJWT,deposit)
router.post( "/withdraw",verifyuserJWT,withdraw)
router.post("/transfer",verifyuserJWT,transfer)
router.get('/transactions',verifyuserJWT,trasactions)
router.get("/profile",verifyuserJWT,profile)

export default router