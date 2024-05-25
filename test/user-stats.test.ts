import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";
import IAd from "../src/interfaces/ad.interface";
import Ad from "../src/models/ad.model";
import IRequest from "../src/interfaces/request.interface";
import Request from "../src/models/request.model";
import { config } from "../src/config/env";
import { connectToDatabase } from "../src/config/database";
import app from "../src/app";
import { Server } from "http";

const should = chai.should();
chai.use(chaiHttp);

describe("Ads", () => {
  let testAd: IAd;
  let testRequest1: IRequest;
  let testRequest2: IRequest;
  let testRequest3: IRequest;
  let server: Server;

  before(async () => {
    connectToDatabase()
      .then(() => {
        server = app.listen(config.PORT);
      })
      .catch((err) => {
        console.error("Failed to connect to the database", err);
        process.exit(1);
      });
  });

  beforeEach(async () => {
    // Clear the database before each test
    await Ad.deleteMany({});
    await Request.deleteMany({});
    // Create a test ad
    testAd = new Ad({
      requestType: "SELL",
      area: 100,
      price: 100000,
      city: "Test City",
      district: "Test District",
      description: "Test description",
      refreshedAt: new Date(),
    }) as IAd;
    await testAd.save();
    // Create test requests
    testRequest1 = new Request({
      requestType: "BUY",
      area: 100,
      price: 90000,
      city: "Test City",
      district: "Test District",
      description: "Test request 1",
      refreshedAt: new Date(),
    }) as IRequest;
    testRequest2 = new Request({
      requestType: "BUY",
      area: 100,
      price: 110000,
      city: "Test City",
      district: "Test District",
      description: "Test request 2",
      refreshedAt: new Date(),
    }) as IRequest;
    testRequest3 = new Request({
      requestType: "BUY",
      area: 100,
      price: 120000,
      city: "Test City",
      district: "Test District",
      description: "Test request 3",
      refreshedAt: new Date(),
    }) as IRequest;
    await testRequest1.save();
    await testRequest2.save();
    await testRequest3.save();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe("GET /ad/:adId/match", () => {
    it("should GET matching requests for a given ad", (done) => {
      chai
        .request(server)
        .get(`/ad/${testAd._id}/match`)
        .query({ page: 1, limit: 10 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(2);
          res.body.data[0].should.have.property("_id");
          res.body.data[0].should.have.property("name");
          res.body.data[0].should.have.property("phone");
          res.body.data[0].should.have.property("role");
          res.body.data[0].should.have.property("status");
          res.body.data[0].should.have.property("requestsCount");
          res.body.data[0].should.have.property("totalRequestsCount");
          res.body.data[0].should.have.property("adsCount");
          res.body.data[0].should.have.property("totalAdsCount");
          res.body.total.should.be.eql(2);
          res.body.hasNextPage.should.be.eql(false);
          res.body.hasPreviousPage.should.be.eql(false);
          res.body.page.should.be.eql(1);
          res.body.limit.should.be.eql(10);
          done();
        });
    });

    it("should return 400 if the query parameters are invalid", (done) => {
      chai
        .request(server)
        .get(`/ad/${testAd._id}/match`)
        .query({ page: -1, limit: 10 }) // invalid page number
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
