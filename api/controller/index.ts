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

  const filter:any = eval(sort as string);
  const resp: any = data;

  const pageNumberStyle = pageNumbers(limit as number);

  if (filter.length) {
    switch(filter[0].type){
        case "name":
            resp.sort((a:any, b:any): number | undefined => {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1 * filter[0].value
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1 * filter[0].value
            })
            break;
        case "dateLastEdited":
            resp.sort((a:any, b:any): number | undefined => {
                if(Date.parse(a.dateLastEdited) < Date.parse(b.dateLastEdited)) return -1 * filter[0].value
                if(Date.parse(a.dateLastEdited) > Date.parse(b.dateLastEdited)) return 1 * filter[0].value
            })
            break;
        default:
            break;
    }
  }

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
