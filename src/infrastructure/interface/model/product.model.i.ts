import { OptionalProductDto, ProductDto, ProductDtoDB, ProductIdDto, LeftInStockDto, ThumbnailFileDto } from "@dto/domain";

export interface IProductModel {
	remove(productId: ProductIdDto): Promise<boolean>;

	create(product: ProductDto, photoData: ThumbnailFileDto): Promise<ProductDto>;

	edit(productId: ProductIdDto, product: OptionalProductDto): Promise<OptionalProductDto>;

	replenish(productId: ProductIdDto, count: number): Promise<number>;

	sell(productId: ProductIdDto, offeredPrice: number, count: number): Promise<boolean>;

	findMany(query: OptionalProductDto, maxCount: number): Promise<ProductDtoDB[]>;

	findOne(query: OptionalProductDto): Promise<ProductDtoDB>;

	checkAvaliability(productId: ProductIdDto): Promise<LeftInStockDto>;
}
