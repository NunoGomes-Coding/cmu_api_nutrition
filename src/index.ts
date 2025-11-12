import { Hono } from "hono";
import { Food } from "./models/food";
import { connect } from "mongoose";
import { extractQuantity, scaleValue } from "./utils";

const LIMIT_PER_QUERY = 10;

const app = new Hono();

if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === "") {
  console.error("MongoDB URI missing");
  process.exit(1);
}

if (!process.env.TOKEN || process.env.TOKEN.trim() === "") {
  console.error("Auth Token missing");
  process.exit(1);
}

connect(process.env.MONGODB_URI).catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

app.use(async (c, next) => {
  const header = c.req.header("Authorization");
  if (header !== process.env.TOKEN) {
    return c.json({ message: "API Token missing" }, 401);
  }
  await next();
});

app.get("/v1/nutrition", async (c) => {
  try {
    const rawQuery = c.req.query("query");
    
    if (!rawQuery || rawQuery.trim() === "") {
      return c.json({message: "query not provided"}, 400)
    }

    const { cleanQuery: query, quantity } = extractQuantity(rawQuery);

    if (!query) {
      return c.json({ error: "query parameter is required" }, 400);
    }

    console.log(`Searching for: "${query}" with quantity: ${quantity}`);

    // Normalize spacing and case
    const searchTerms = query
      .trim()
      .split(/\s+/)
      .filter((term) => term.length > 0);

    // Build a regex that matches all terms in any order (case-insensitive)
    const regex = new RegExp(
      searchTerms.map((t) => `(?=.*${t})`).join(""),
      "i"
    );

    // Search in the "nome" field
    const foods = await Food
      .find({ nome: { $regex: regex } })
      .limit(LIMIT_PER_QUERY);

    if (foods.length === 0) {
      return c.json([]);
    }

    const results = foods.map((food) => {
      const scale = quantity / 100;

      return {
        name: food.nome,
        calories: scaleValue(food.calorias, scale),
        serving_size_g: quantity,
        fat_total_g: scaleValue(food.lipidos_g, scale),
        fat_saturated_g: scaleValue(food.acidos_gordos_saturados_g, scale),
        protein_g: scaleValue(food.proteinas_g, scale),
        sodium_mg: scaleValue(food.sodio_mg, scale),
        potassium_mg: scaleValue(food.postassio_mg, scale),
        cholesterol_mg: scaleValue(food.colestrol_mg, scale),
        carbohydrates_total_g: scaleValue(food.hidratos_carbono_g, scale),
        fiber_g: scaleValue(food.fibra_g, scale),
        sugar_g: scaleValue(food.acucares_g, scale),
      };
    });

    return c.json(results);
  } catch (error) {
    return c.json(
      {
        error: "Failed to fetch nutrition data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export default app;
