import * as express from "express";
import { SortObject } from "../helper/index";

const { BAD_REQUEST } = require("http-status-codes");

export const validateQuery = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
): express.Response<any> | undefined => {
	const {
		query: { s, sort, page },
	} = req;

	const searchQuery = eval(s as string);
	const filter: SortObject[] = eval(sort as any) || [];
	const pageNumber: number = Number(page as string);

	if (searchQuery === "") {
		return res.status(BAD_REQUEST).send({
			payload: null,
			message: `Search Query cannot be "", please add the data to search.`,
		});
	}

	if (
		filter.length !== 0 &&
		filter[0].type !== "name" &&
		filter[0].type !== "dateLastEdited"
	) {
		return res.status(BAD_REQUEST).send({
			payload: null,
			message: `Records can be sorted only by type "name" or "dateLastEdited".`,
		});
	}

	if (filter.length !== 0 && filter[0].value !== 1 && filter[0].value !== -1) {
		return res.status(BAD_REQUEST).send({
			payload: null,
			message: `Records can be sorted by "Ascending(1)" or "Descending(-1)".`,
		});
	}

	if (pageNumber <= 0 || pageNumber > 20 || pageNumber === NaN) {
		return res.status(BAD_REQUEST).send({
			payload: null,
			message: "Pages can only range from 1 to 20.",
		});
	}
	next();
};
