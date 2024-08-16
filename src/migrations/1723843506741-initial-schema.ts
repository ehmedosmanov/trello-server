import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1723843506741 implements MigrationInterface {
    name = 'InitialSchema1723843506741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "card_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "columns" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "column_id" integer NOT NULL, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_93d9a3773334ccc328e38cec696" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_2ca75a23d42a55eec6158de1e10" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_2ca75a23d42a55eec6158de1e10"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_93d9a3773334ccc328e38cec696"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
