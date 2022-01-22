import { IsUUID, IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional, Max, Length, IsAlphanumeric } from "class-validator";
import { ThumbnailDto } from "@dto/domain/thumbnail";

export type ProductIdDto = string;

export interface ProductDto {
	name: string;
	price: number;
	leftInStock: number;
	thumbnail?: ThumbnailDto;
}

export interface LeftInStockDto {
	avaliable: boolean;
	leftInStock: number;
}

export interface OptionalProductDto {
	name?: string;
	price?: number;
	leftInStock?: number;
	uuid?: ProductIdDto;
}

export interface ProductDtoDB extends ProductDto {
	uuid: string;
}

export class ProductBodyCreate implements ProductDto {
	@IsString()
	@IsNotEmpty()
	@Length(3, 50)
	@IsAlphanumeric()
	name: string;

	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
	})
	@IsPositive()
	@IsNotEmpty()
	@Max(100000)
	price: number;

	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
	})
	@IsPositive()
	@IsNotEmpty()
	@Max(100000)
	leftInStock: number;
}

export class ProductBodySearch implements OptionalProductDto {
	@IsString()
	@IsOptional()
	@Length(3, 50)
	@IsAlphanumeric()
	name: string;

	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
	})
	@IsOptional()
	@IsPositive()
	@Max(100000)
	price: number;

	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
	})
	@IsOptional()
	@IsPositive()
	@Max(100000)
	leftInStock: number;

	@IsUUID(4)
	@IsString()
	@IsOptional()
	uuid: string;
}
