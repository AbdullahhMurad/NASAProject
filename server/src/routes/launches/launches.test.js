const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
    test('It should respond with 200 Success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});


describe("Test POST /launches", () => {

    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 b',
        launchDate: "January 4 2028",       
    };

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 b',
    };  

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 b',
        launchDate: "Lahmeh",       
    };  



    test("It should respond with 201 Success", async () => {
        const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201) 

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date (response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate);

    });

   

   
    test("It should catch missing required properties", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchDataWithoutDate)
            .expect("Content-Type", /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property",
        });

    });
    test("It should catch invalid date properties", async () => {
        const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: "Invalid launch date"
        });
    });

});