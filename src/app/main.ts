import dotenv from "dotenv";
dotenv.config();
import { ProductController } from "@controller/product.controller";
import { UUID } from "@core/uuid";
import { ProductModel } from "@domain/product.model";
import { ProductRepository } from "@repository/product.repository";
import { StoreRepository } from "@repository/store.repository";
import { ProductSchema } from "@repository/schema/product.schema";
import express from "express";
import bodyParser from "body-parser";
import { Validation } from "@core/validation";

async function init() {
	const app = express();
	const router = express.Router();
	const productConnection = await ProductRepository.connect({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "postgres",
		database: process.env.DB_NAME,
		entities: [ProductSchema],
	});
	app.use(bodyParser.json());
	app.use(router);
	const productController = new ProductController(
		"/products",
		router,
		new ProductModel(new StoreRepository(new ProductRepository(productConnection.getRepository(ProductSchema), new UUID()))),
		new Validation()
	);
	await productController.create("/create");
	await productController.findMany("/find");

	app.listen(8000, () => {
		console.log(`Example app listening at http://localhost:${8000}`);
	});
}
init();
