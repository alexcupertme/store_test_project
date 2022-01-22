import { IValidation, ValidationError } from "@interface/core";
import { Request, Response, Router } from "express";
import { ClassConstructor, plainToInstance } from "class-transformer";

export abstract class ControllerFactory {
	constructor(public prefixRoute: string, public router: Router, private validation: IValidation) {}

	private async controllerHandler<BT, MT>(
		req: Request<MT, any, BT>,
		res: Response<MT | ValidationError>,
		dto: ClassConstructor<Record<any, any>>,
		callback: (req: Request<MT, any, BT>, res: Response<MT>) => MT
	) {
		const errors = await this.validation.validate(plainToInstance(dto, req.body));
		if (!errors.isValid) return res.json(errors);
		const cb = await callback(req, res);
		await res.json(cb);
	}
	protected createPUTController<BT, MT>(
		route: string,
		dto: ClassConstructor<Record<any, any>>,
		callback: (req: Request<MT, any, BT>, res: Response<MT>) => MT
	): Router {
		return this.router.put(this.prefixRoute + route, async (req: Request<MT, any, BT>, res: Response<MT | ValidationError>) => {
			return await this.controllerHandler(req, res, dto, callback);
		});
	}

	protected createGETController<BT, MT>(
		route: string,
		dto: ClassConstructor<Record<any, any>>,
		callback: (req: Request<MT, any, BT>, res: Response<MT>) => MT
	): Router {
		return this.router.get(this.prefixRoute + route, async (req: Request<MT, any, BT>, res: Response<MT | ValidationError>) => {
			return await this.controllerHandler(req, res, dto, callback);
		});
	}

	protected createPOSTController<BT, MT>(
		route: string,
		dto: ClassConstructor<Record<any, any>>,
		callback: (req: Request<MT, any, BT>, res: Response<MT>) => MT
	): Router {
		return this.router.post(this.prefixRoute + route, async (req: Request<MT, any, BT>, res: Response<MT | ValidationError>) => {
			return await this.controllerHandler(req, res, dto, callback);
		});
	}

	protected createDELETEController<BT, MT>(
		route: string,
		dto: ClassConstructor<Record<any, any>>,
		callback: (req: Request<MT, any, BT>, res: Response<MT>) => MT
	): Router {
		return this.router.delete(this.prefixRoute + route, async (req: Request<MT, any, BT>, res: Response<MT | ValidationError>) => {
			return await this.controllerHandler(req, res, dto, callback);
		});
	}
}
