require("dotenv").config;
import * as express from "express";
import data from "../helper/mock_data.json";
import { pageNumbers } from "../helper/helper";
import unidecode from "unidecode";
import { MockData, SortObject } from "../helper/index";
const { OK } = require("http-status-codes");

const pattern = /"([^"\\]*(\\.[^"\\]*)*)"/;

const search = async (
	req: express.Request,
	res: express.Response,
): Promise<any> => {
	const {
		query: { s, sort, page },
	} = req;

	const searchQuery: string = s ? unidecode((s as string).trim()) : "";
	const filter: SortObject[] = eval(sort as any) || [];
	const pageNumber: number = Number(page as string) || 1;

	let resp: MockData[] = [];

	if (s === undefined) {
		resp = data;
	}

	if (searchQuery) {
		if ((searchQuery as string).match(pattern)) {
			const s1: string = (searchQuery as string).replace(/"/g, "");

			data.filter((el) => {
				if (el.name.toLowerCase().includes((s1 as string).toLowerCase())) {
					resp.push(el);
				}
			});
		} else {
			data.filter((el) => {
				(searchQuery as string).split(" ").map((e: any) => {
					if (el.name.toLowerCase().includes(e.toLowerCase())) {
						resp.push(el);
					}
				});
			});
		}
	}

	if (filter.length) {
		switch (filter[0].type) {
			case "name":
				resp.sort((a: MockData, b: MockData): number => {
					if (a.name.toLowerCase() < b.name.toLowerCase())
						return -1 * filter[0].value;
					if (a.name.toLowerCase() > b.name.toLowerCase())
						return 1 * filter[0].value;
					return 0;
				});
				break;
			case "dateLastEdited":
				resp.sort((a: MockData, b: MockData): number => {
					if (Date.parse(a.dateLastEdited) < Date.parse(b.dateLastEdited))
						return -1 * filter[0].value;
					if (Date.parse(a.dateLastEdited) > Date.parse(b.dateLastEdited))
						return 1 * filter[0].value;
					return 0;
				});
				break;
			default:
				break;
		}
	}

	const { lowerLimit, upperLimit } = pageNumbers(pageNumber);
	const pageArray: any = resp.slice(lowerLimit, upperLimit);

	return res.status(OK).json({
		payload: {
			data: pageArray,
			page_number: pageNumber,
			total: resp.length,
		},
		message: "success",
	});
};

export default search;
