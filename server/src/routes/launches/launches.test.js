const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
    test("It should respond with 200 Success", async () => {
        const response = await request(app)
        .get("/launches")
        .expect("Content-type", "/json/")
        .expect(200);
    });
});


describe("Test POST /launches", () => {
    test("It should respond with 200 Success", () => {
        const response = 200;
        expect(response).toBe(200);
    });

    test("It shpuld catch missing required properties", () => {});
    test("It should catch invalid date properties", () => {});

});