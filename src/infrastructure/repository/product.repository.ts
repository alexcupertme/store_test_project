import { ProductIdDto, ProductDto, ProductDtoDB, OptionalProductDto, LeftInStockDto } from "@dto/domain";
import { RepoResponse } from "@dto/inner";
import { IUUID } from "@interface/core/uuid.i";
import { IProductRepository } from "@interface/repository";
import { ProductSchema } from "@repository/schema/product.schema";
import { ConnectionOptions, createConnection, LessThan, Like, MoreThan, Repository } from "typeorm";

export class ProductRepository implements IProductRepository {
	constructor(private productSchema: Repository<ProductSchema>, private uuidHandler: IUUID) {}
	public static async connect(connectionOptions: ConnectionOptions) {
		const connection = await createConnection({
			...connectionOptions,
		});
		return connection;
	}
	public async remove(productId: ProductIdDto): Promise<RepoResponse<boolean>> {
		try {
			await this.productSchema.delete({ uuid: productId });

			return {
				data: true,
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async create(product: ProductDto): Promise<RepoResponse<ProductDtoDB>> {
		try {
			const result = await this.productSchema.create({ ...product, uuid: this.uuidHandler.generate() });

			const { uuid, leftInStock, price, name } = result;
			return {
				data: { uuid, leftInStock, price, name },
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async edit(productId: ProductIdDto, product: OptionalProductDto): Promise<RepoResponse<OptionalProductDto>> {
		try {
			await ProductSchema.update({ uuid: productId }, product);

			return {
				data: product,
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async replenish(productId: ProductIdDto, count: number): Promise<RepoResponse<number>> {
		try {
			await this.productSchema.increment({ uuid: productId }, "uuid", count);

			return {
				data: count,
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async sell(productId: ProductIdDto, offeredPrice: number, count: number): Promise<RepoResponse<boolean>> {
		try {
			await this.productSchema.decrement(
				{
					leftInStock: LessThan(count),
					price: MoreThan(offeredPrice),
					uuid: productId,
				},
				"uuid",
				count
			);

			return {
				data: true,
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async findMany(query: OptionalProductDto, maxCount: number = 0): Promise<RepoResponse<ProductDtoDB[]>> {
		try {
			const { name, leftInStock = null, price = null } = query;
			const result = await this.productSchema.find({
				where: {
					name: Like(name),
					leftInStock,
					price,
				},
				take: maxCount,
			});
			return {
				data: result,
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async findOne(query: OptionalProductDto): Promise<RepoResponse<ProductDtoDB>> {
		try {
			const { name, leftInStock = null, price = null, uuid = null } = query;
			const result = await this.productSchema.find({
				where: {
					name: Like(name),
					leftInStock,
					price,
					uuid,
				},
				take: 1,
			});
			return {
				data: result[0],
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async checkAvaliability(productId: ProductIdDto): Promise<RepoResponse<LeftInStockDto>> {
		try {
			const result = await this.productSchema.findOne({
				where: {
					uuid: productId,
				},
				select: ["leftInStock"],
			});
			return {
				data: {
					leftInStock: result.leftInStock,
					avaliable: result.leftInStock > 0,
				},
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}
}
