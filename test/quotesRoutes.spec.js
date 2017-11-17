const should = require("chai").should();
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");

chai.use(chaiHttp);
