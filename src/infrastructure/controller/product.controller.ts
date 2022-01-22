import { ProductBodyCreate, ProductBodySearch, ProductDto, ProductDtoDB } from "@dto/domain";
import { ControllerFactory } from "@factory";
import { IValidation } from "@interface/core";
import { IProductModel } from "@interface/model";
import { Router } from "express";

export class ProductController extends ControllerFactory {
	constructor(public prefixRoute: string, public router: Router, private productModel: IProductModel, validation: IValidation) {
		super(prefixRoute, router, validation);
	}

	public async create(route: string) {
		return this.createPUTController<ProductBodyCreate, Promise<ProductDto>>(route, ProductBodyCreate, async (req, res) => {
			return await this.productModel.create(req.body, "123123");
		});
	}

	public async edit(route: string) {}

	public async replenish(route: string) {}

	public async sell(route: string) {}

	public async findMany(route: string) {
		return this.createGETController<ProductBodySearch, Promise<ProductDtoDB[]>>(route, ProductBodySearch, async (req, res) => {
			return await this.productModel.findMany(req.body, 100);
		});
	}

	public async findOne(route: string) {}

	public async checkAvaliability(route: string) {}

	public async getThumbnail(route: string) {}
}
