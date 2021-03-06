import "mocha";
import * as express from "express";
const chai = require("chai");
const chaiHttp = require("chai-http");
import { ResponseBody } from "../api/helper/";

const expect = chai.expect;

chai.use(chaiHttp);

const server = require("../index");

describe("[Search Route] get /api/search?*", () => {
	describe("Positive Test Cases", () => {
		it("[/api/search] - Search without Query", () => {
			return chai
				.request(server)
				.get("/api/search")
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
					chai.expect(res.body.payload.total).to.eql(100);
				});
		});

		it("[/api/search?page=10] - Search with Page", () => {
			return chai
				.request(server)
				.get("/api/search?page=1")
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
					chai.expect(res.body.payload.total).to.eql(100);
				});
		});

		it(`[/api/search?sort=[{type:"name", value:1}]] Sort Name Asc`, () => {
			return chai
				.request(server)
				.get('/api/search?sort=[{type:"name", value:1}]')
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
					chai
						.expect(res.body.payload.data[0].name)
						.to.eql("Central Creative Producer");
					chai.expect(res.body.payload.total).to.eql(100);
				});
		});

		it(`[/api/search?sort=[{type:"name", value:-1}]] Sort Name Asc`, () => {
			return chai
				.request(server)
				.get('/api/search?sort=[{type:"name", value:-1}]')
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
					chai
						.expect(res.body.payload.data[0].name)
						.to.eql("The Lord of the Rings: The Return of the King");
					chai.expect(res.body.payload.total).to.eql(100);
				});
		});

		it(`[/api/search?sort=[{type:"dateLastEdited", value:1}]] Sort dateLastEdited Asc`, () => {
			return chai
				.request(server)
				.get('/api/search?sort=[{type:"dateLastEdited", value:1}]')
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
					chai
						.expect(res.body.payload.data[0].dateLastEdited)
						.to.eql("2017-10-15T21:10:51.560Z");
					chai.expect(res.body.payload.total).to.eql(100);
				});
		});

		it(`[/api/search?sort=[{type:"dateLastEdited", value:-1}]] Sort dateLastEdited Asc`, () => {
			return chai
				.request(server)
				.get('/api/search?sort=[{type:"dateLastEdited", value:-1}]')
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
					chai
						.expect(res.body.payload.data[0].dateLastEdited)
						.to.eql("2018-10-05T01:06:12.605Z");
					chai.expect(res.body.payload.total).to.eql(100);
				});
		});

		it(`[/api/search?search=the king Search without ""`, () => {
			return chai
				.request(server)
				.get("/api/search?s=the%20king")
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(4);
					chai.expect(res.body.payload.total).to.eql(4);
				});
		});

		it(`[/api/search?search="the king" Search with ""`, () => {
			return chai
				.request(server)
				.get('/api/search?s="the%20king"')
				.then((res: ResponseBody) => {
					chai.expect(res.body.message).to.eql("success");
					chai.expect(res.body.payload.data).to.be.an("array");
					chai.expect(res.body.payload.data).to.have.a.lengthOf(1);
					chai.expect(res.body.payload.total).to.eql(1);
				});
		});
	});
	describe("Negetive Test Cases", () => {
		it("[/api/search?page=-1] - Search with Page", () => {
			return chai
				.request(server)
				.get("/api/search?page=-1")
				.then((res: ResponseBody) => {
					chai
						.expect(res.body.message)
						.to.eql("Pages can only range from 1 to 20.");
					chai.expect(res.body.payload).to.be.eql(null);
				});
		});

		it("[/api/search?page=21] - Search with Page", () => {
			return chai
				.request(server)
				.get("/api/search?page=21")
				.then((res: ResponseBody) => {
					chai
						.expect(res.body.message)
						.to.eql("Pages can only range from 1 to 20.");
					chai.expect(res.body.payload).to.be.eql(null);
				});
		});

		it(`[/api/search?sort=[{type:"description", value:-1}]] Sort Name Asc`, () => {
			return chai
				.request(server)
				.get('/api/search?sort=[{type:"description", value:-1}]')
				.then((res: ResponseBody) => {
					chai
						.expect(res.body.message)
						.to.eql(
							'Records can be sorted only by type "name" or "dateLastEdited".',
						);
					chai.expect(res.body.payload).to.be.eql(null);
				});
		});

		it(`[/api/search?sort=[{type:"dateLastEdited", value:2}]] Sort dateLastEdited Asc`, () => {
			return chai
				.request(server)
				.get('/api/search?sort=[{type:"dateLastEdited", value:2}]')
				.then((res: ResponseBody) => {
					chai
						.expect(res.body.message)
						.to.eql(
							'Records can be sorted by "Ascending(1)" or "Descending(-1)".',
						);
					chai.expect(res.body.payload).to.be.eql(null);
				});
		});

		it(`[/api/search?search="" Search with ""`, () => {
			return chai
				.request(server)
				.get("/api/search?s=%22%22")
				.then((res: ResponseBody) => {
					chai
						.expect(res.body.message)
						.to.eql(
							'Search Query cannot be "", please add the data to search.',
						);
					chai.expect(res.body.payload).to.be.eql(null);
				});
		});
	});
});
