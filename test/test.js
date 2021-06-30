const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
    /****************************Getting Product By Id*****************************/
    it("Getting Product By Id", done => {
        chai.request(app).get("/api/getProductById")
            .send({ id: 715990 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                done();
            });
    });
    /*****************************Getting Product With Invalid Id*****************************/
    it("Getting Product With Invalid Id", done => {
        chai.request(app).get("/api/getProductById")
            .send({ id: 7159910 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("The product with the provided ID does not exist");
                done();
            });
    });
    /*****************************Getting Product Type By Id*****************************/
    it("Getting Product Type By Id", done => {
        chai.request(app).get("/api/getProductTypeId")
            .send({ id: 32 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                done();
            });
    });

    /*****************************Getting Product Type With Invalid Id***********************/
    it("Getting Product Type With Invalid Id", done => {
        chai.request(app).get("/api/getProductTypeId")
            .send({ id: 99 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("The product type with the provided ID does not exist");
                done();
            });
    });

    /*****************************Getting Product Insurance Cost By Id*****************************/
    it("Getting Product Insurance Cost By Valid Id", done => {
        chai.request(app)
            .get("/api/getProductInsCostById")
            .send({ id: 827074 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                done();
            });
    });

    /*****************************Getting Product Insurance Cost By Invalid Id**********************/
    it("Getting Product Insurance Cost By Invalid Id", done => {
        chai.request(app)
            .get("/api/getProductInsCostById")
            .send({ id: 8270741 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("The product and it type does not exist");
                done();
            });
    });


    /*****************************Getting Product is Entitled to insurance**********************/
    it("Getting product can be Insured is true", done => {
        chai.request(app)
            .get("/api/getProductInsCostById")
            .send({ id: 780829 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                done();
            });
    });

    /*****************************Getting Product is not Entitled to insurance**********************/
    it("Getting product can be Insured is false", done => {
        chai.request(app)
            .get("/api/getProductInsCostById")
            .send({ id: 819148 })
            .set('content-type', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("The Product is not entitled for insurance.");
                done();
            });
    });
});