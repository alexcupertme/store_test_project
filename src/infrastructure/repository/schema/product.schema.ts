import { ProductDtoDB } from "@dto/domain";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class ProductSchema extends BaseEntity implements ProductDtoDB {
	@PrimaryGeneratedColumn("uuid")
	uuid: string;

	@Column()
	name: string;

	@Column()
	price: number;

	@Column()
	leftInStock: number;
}
