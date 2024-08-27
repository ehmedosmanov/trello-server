import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1724792315072 implements MigrationInterface {
    name = 'InitialSchema1724792315072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying NOT NULL, "card_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "order" integer NOT NULL DEFAULT '0', "column_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "columns" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "order" integer NOT NULL DEFAULT '0', "workspace_id" integer NOT NULL, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying(255) NOT NULL, "bgColor" character varying, "backgroundImage" character varying, "workspace_id" integer NOT NULL, CONSTRAINT "UQ_9cf0ff28e768678e382fedac49d" UNIQUE ("title"), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspaces" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_618315ce95454d8ba8967ecaea0" UNIQUE ("title"), CONSTRAINT "PK_098656ae401f3e1a4586f47fd8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_93d9a3773334ccc328e38cec696" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_1c54b595af68cc3870b651e11c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_f5f9354033ac2c73f0309655f42" FOREIGN KEY ("workspace_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_bf217cf96eaeb253a7cd35b52ad" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_bf217cf96eaeb253a7cd35b52ad"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_f5f9354033ac2c73f0309655f42"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_1c54b595af68cc3870b651e11c9"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_93d9a3773334ccc328e38cec696"`);
        await queryRunner.query(`DROP TABLE "workspaces"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
