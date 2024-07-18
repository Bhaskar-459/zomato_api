import { Router } from "express";
import getAllFunc from "./getFunc/getAllFunc.js";
import getByIdFunc from "./getFunc/getByIdFunc.js";
import getPageFunc from "./getFunc/getPageFunc.js";
import getFilterByQuery from "./getFunc/getFilterByQuery.js"
import getSearchFunc from "./getFunc/getSearchFunc.js";

const router = Router();

router.get('/all',getAllFunc);
router.get('/page/all',getPageFunc);
router.get('/getById/:id',getByIdFunc);
router.get('/filter/all',getFilterByQuery);
router.get('/search',getSearchFunc);

export default router;
