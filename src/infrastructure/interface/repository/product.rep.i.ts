import { LeftInStockDto, OptionalProductDto, ProductDto, ProductDtoDB, ProductIdDto } from "@dto/domain";
import { RepoResponse } from "@dto/inner";

export interface IProductRepository {
	remove(productId: ProductIdDto): Promise<RepoResponse<boolean>>;

	create(product: ProductDto): Promise<RepoResponse<ProductDtoDB>>;

	edit(productId: ProductIdDto, product: OptionalProductDto): Promise<RepoResponse<OptionalProductDto>>;

	replenish(productId: ProductIdDto, count: number): Promise<RepoResponse<number>>;

	sell(productId: ProductIdDto, offeredPrice: number, count: number): Promise<RepoResponse<boolean>>;

	findMany(query: OptionalProductDto, maxCount: number): Promise<RepoResponse<ProductDtoDB[]>>;

	findOne(query: OptionalProductDto): Promise<RepoResponse<ProductDtoDB>>;

	checkAvaliability(productId: ProductIdDto): Promise<RepoResponse<LeftInStockDto>>;
}
