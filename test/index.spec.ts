import 'mocha';
import * as express from "express";
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

const server = require("../index");

describe("[Search Route] get /api/search?*", () => {
  it("[/api/search] - Search without Query", () => {
    return chai.request(server).get('/api/search')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });

  it("[/api/search?limit=10] - Search with Limit", () => {
    return chai.request(server).get('/api/search?limit=10')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(10);
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });

  it(`[/api/search?sort=[{type:"name", value:1}]] Sort Name Asc`, () => {
    return chai.request(server).get('/api/search?sort=[{type:"name", value:1}]')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
        chai.expect(res.body.payload.data[0].name).to.eql("Central Creative Producer");
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });

  it(`[/api/search?sort=[{type:"name", value:-1}]] Sort Name Asc`, () => {
    return chai.request(server).get('/api/search?sort=[{type:"name", value:-1}]')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
        chai.expect(res.body.payload.data[0].name).to.eql("The Lord of the Rings: The Return of the King");
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });

  it(`[/api/search?sort=[{type:"dateLastEdited", value:1}]] Sort dateLastEdited Asc`, () => {
    return chai.request(server).get('/api/search?sort=[{type:"dateLastEdited", value:1}]')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
        chai.expect(res.body.payload.data[0].dateLastEdited).to.eql("2017-10-15T21:10:51.560Z");
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });

  it(`[/api/search?sort=[{type:"dateLastEdited", value:-1}]] Sort dateLastEdited Asc`, () => {
    return chai.request(server).get('/api/search?sort=[{type:"dateLastEdited", value:-1}]')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
        chai.expect(res.body.payload.data[0].dateLastEdited).to.eql("2018-10-05T01:06:12.605Z");
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });
});
