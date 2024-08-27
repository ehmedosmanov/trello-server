import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1724795509795 implements MigrationInterface {
    name = 'InitialSchema1724795509795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "EmailVerifyTokens" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_f0f4138c7a8e894423988ba1aeb" UNIQUE ("token"), CONSTRAINT "REL_420d7d4af646186116345386f2" UNIQUE ("userId"), CONSTRAINT "PK_1c16b2f91725b71ad5b330bffb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "EmailVerifyTokens" ADD CONSTRAINT "FK_420d7d4af646186116345386f26" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "EmailVerifyTokens" DROP CONSTRAINT "FK_420d7d4af646186116345386f26"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`DROP TABLE "EmailVerifyTokens"`);
    }

}
