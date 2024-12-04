import { MigrationInterface, QueryRunner } from "typeorm";

export class ImgUrlNullTrue1733343326269 implements MigrationInterface {
    name = 'ImgUrlNullTrue1733343326269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "data" bytea NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
