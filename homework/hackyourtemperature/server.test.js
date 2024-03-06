import supertest from "supertest";
import app from "./server.js";
const request = supertest(app);

describe("GET /", () => {
  it('should return "hello from backend to frontend!"', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("hello from backend to frontend!");
  });
});

describe("POST /weather", () => {
  it("should return weather information for a valid city", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "Berlin" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("Berlin");
  });

  it("should return a 404 status for missing city name", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(404);
    expect(response.text).toBe("City name is required");
  });

  it("should handle errors and return a 404 status", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "InvalidCity" });
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });
});
