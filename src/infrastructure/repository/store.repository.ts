import { ProductIdDto, ProductDto, ProductDtoDB, OptionalProductDto, LeftInStockDto } from "@dto/domain/product";
import { RepoResponse } from "@dto/inner";
import { IProductRepository, IStoreRepository } from "@interface/repository";

export class StoreRepository implements IStoreRepository {
	constructor(private productRepository: IProductRepository) {}
	public async remove(productId: ProductIdDto): Promise<RepoResponse<boolean>> {
		try {
			const result = await this.productRepository.remove(productId);

			return {
				data: true,
				state: result.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async create(product: ProductDto): Promise<RepoResponse<ProductDtoDB>> {
		try {
			const productResult = await this.productRepository.create(product);
			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async edit(productId: ProductIdDto, product: OptionalProductDto): Promise<RepoResponse<OptionalProductDto>> {
		try {
			const productResult = await this.productRepository.edit(productId, product);

			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async replenish(productId: ProductIdDto, count: number): Promise<RepoResponse<number>> {
		try {
			const productResult = await this.productRepository.replenish(productId, count);

			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async sell(productId: ProductIdDto, offeredPrice: number, count: number): Promise<RepoResponse<boolean>> {
		try {
			const productResult = await this.productRepository.sell(productId, offeredPrice, count);

			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async findMany(query: OptionalProductDto, maxCount: number = 0): Promise<RepoResponse<ProductDtoDB[]>> {
		try {
			const productResult = await this.productRepository.findMany(query, maxCount);
			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async findOne(query: OptionalProductDto): Promise<RepoResponse<ProductDtoDB>> {
		try {
			const productResult = await this.productRepository.findOne(query);

			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}

	public async checkAvaliability(productId: ProductIdDto): Promise<RepoResponse<LeftInStockDto>> {
		try {
			const productResult = await this.productRepository.checkAvaliability(productId);

			return {
				data: productResult.data,
				state: productResult.state,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}
}
