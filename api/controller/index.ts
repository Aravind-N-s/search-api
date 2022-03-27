require("dotenv").config;
import * as express from "express";
import data from "../helper/mock_data.json";
import {pageNumbers} from "../helper/helper"
const { OK } = require("http-status-codes");

const search = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {

  const {
    query: { s = "", sort = [], limit = 5 },
  } = req;

  const resp: any = data;

  const pageNumberStyle = pageNumbers(limit as number);
  const pageArray: any = resp.slice(0, limit);

  return res.status(OK).json({
    payload: {
      data: pageArray,
      total: resp.length,
    },
    message: "success",
  });
};

export default search;
