import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1642449088616 implements MigrationInterface {
    name = 'CreateDatabase1642449088616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_schema" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "leftInStock" integer NOT NULL, CONSTRAINT "PK_6933d2a3c812951ec7bf8c1c329" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_schema"`);
    }

}
