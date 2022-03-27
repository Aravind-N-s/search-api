import 'mocha';
import * as express from "express";
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

const server = require("../index");

describe("[Search Route] get /api/search?*", () => {

  it("Search without Query", () => {
    return chai.request(server).get('/search')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(5);
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });

  it("Search with Limit", () => {
    return chai.request(server).get('/search?limit=10')
      .then((res: any) => {
        chai.expect(res.body.message).to.eql("success");
        chai.expect(res.body.payload.data).to.be.an("array");
        chai.expect(res.body.payload.data).to.have.a.lengthOf(10);
        chai.expect(res.body.payload.total).to.eql(100);
      })
  });
});
