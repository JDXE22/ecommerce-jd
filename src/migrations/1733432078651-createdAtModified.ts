import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAtModified1733432078651 implements MigrationInterface {
    name = 'CreatedAtModified1733432078651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET NOT NULL`);
    }

}
