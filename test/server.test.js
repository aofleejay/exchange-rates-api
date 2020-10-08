const request = require("supertest");
const axios = require("axios");
const server = require("../src/server");

describe("e2e", () => {
  let app;
  let runningServer;
  beforeAll(async () => {
    runningServer = server.listen();
    app = await request.agent(runningServer);
  });

  afterAll(async () => {
    await runningServer.close();
  });

  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        rates: {
          THB: 31.2302463891,
          USD: 1.0,
        },
        base: "USD",
        date: "2020-10-07",
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('GET /ping should returns text "pong"', async () => {
    await app
      .get("/ping")
      .expect(200)
      .then((res) => {
        expect(res.text).toBe("pong");
      });
  });

  it("GET /rates?base=thb should returns 200 with exchange rates", async () => {
    await app
      .get("/rates?base=thb")
      .expect(200)
      .then((res) => {
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  });

  it("GET /rates without specify base should returns 422", async () => {
    await app.get("/rates").expect(422);
  });
});
