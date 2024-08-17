import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1723928884255 implements MigrationInterface {
    name = 'InitialSchema1723928884255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD "order" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "order"`);
    }

}
