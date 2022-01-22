import { OptionalProductDto, ProductDto, ProductDtoDB, ProductIdDto, LeftInStockDto, ThumbnailFileDto } from "@dto/domain";
import { IProductModel } from "@interface/model";
import { IStoreRepository } from "@interface/repository";

export class ProductModel implements IProductModel {
	constructor(private storeRepository: IStoreRepository) {}
	async remove(productId: ProductIdDto): Promise<boolean> {
		const result = await this.storeRepository.remove(productId);
		return result.data;
	}

	async create(productDto: ProductDto, photoData: ThumbnailFileDto): Promise<ProductDtoDB> {
		const result = await this.storeRepository.create(productDto, photoData);
		return result.data;
	}

	async edit(productId: ProductIdDto, product: OptionalProductDto): Promise<OptionalProductDto> {
		const result = await this.storeRepository.edit(productId, product);
		return result.data;
	}

	async replenish(productId: ProductIdDto, count: number): Promise<number> {
		const result = await this.storeRepository.replenish(productId, count);
		return result.data;
	}

	async sell(productId: ProductIdDto, offeredPrice: number, count: number): Promise<boolean> {
		const result = await this.storeRepository.sell(productId, offeredPrice, count);
		return result.data;
	}

	async findMany(query: OptionalProductDto, maxCount: number): Promise<ProductDtoDB[]> {
		const result = await this.storeRepository.findMany(query, maxCount);
		return result.data;
	}

	async findOne(query: OptionalProductDto): Promise<ProductDtoDB> {
		const result = await this.storeRepository.findOne(query);
		return result.data;
	}

	async checkAvaliability(productId: ProductIdDto): Promise<LeftInStockDto> {
		const result = await this.storeRepository.checkAvaliability(productId);
		return result.data;
	}
}
