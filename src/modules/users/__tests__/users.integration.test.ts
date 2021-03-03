import dotenv from "dotenv";

dotenv.config();

import chai from "chai";
import chaiHttp from "chai-http";
import { app } from "../../../infrastructure/http/app";
import { userRepository } from "../infrastructure/repository/index";

chai.use(chaiHttp);

describe("Users integration test suit", () => {
  let requester: ChaiHttp.Agent;

  beforeAll( async (done) => {
    requester = chai.request(app).keepOpen();
    await userRepository.delete({ first_name: "[users::create] firstName" });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user.", async (done) => {
      const res = await requester
      .post("/api/v1/users")
      .send({
        "firstName": "[users::create] firstName",
        "lastName": "[users::create] lastName",
        "email": "users.create@email.com",
        "password": "12345678"
      });
      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual("string");
      done();
    });
  });
});