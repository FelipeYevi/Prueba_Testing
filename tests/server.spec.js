const request = require("supertest");
const app = require("../index.js");

// Grupo de pruebas
describe("Operaciones CRUD de cafes", () => {
  // GET /cafes → debe responder 200
  test("GET /cafes debe retornar 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(app).get("/cafes");

    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Array);

    expect(response.body.length).toBeGreaterThan(0);
  });

  //  DELETE debe retornar 404 cuando el ID no existe
  test("DELETE /cafes/:id debe retornar 404 si el café no existe", async () => {
    const idInexistente = 999;

    const response = await request(app)
      .delete(`/cafes/${idInexistente}`)
      .set("Authorization", "Bearer tokenPrueba");

    expect(response.statusCode).toBe(404);
  });

  //  POST debe agregar un nuevo café y retornar 201
  test("POST /cafes agrega un nuevo café y retorna 201", async () => {
    const nuevoCafe = { id: 123, nombre: "Americano Especial" };

    const response = await request(app).post("/cafes").send(nuevoCafe);

    expect(response.statusCode).toBe(201);

    expect(response.body).toBeInstanceOf(Array);

    expect(response.body).toContainEqual(nuevoCafe);
  });

  //  PUT  debe retornar 400 si los IDs no coinciden
  test("PUT /cafes/:id debe retornar 400 si el id del parámetro es distinto al del body", async () => {
    const idParametro = 10;
    const bodyInvalido = { id: 5, nombre: "Capuccino XL" };

    const response = await request(app)
      .put(`/cafes/${idParametro}`)
      .send(bodyInvalido);

    expect(response.statusCode).toBe(400);
  });
});
