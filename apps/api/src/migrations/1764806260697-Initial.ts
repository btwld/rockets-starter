import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1764806260697 implements MigrationInterface {
    name = 'Initial1764806260697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_otp" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "type" character varying, "passcode" character varying NOT NULL, "expirationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "active" boolean NOT NULL DEFAULT true, "assigneeId" uuid NOT NULL, CONSTRAINT "PK_494c022ed33e6ee19a2bbb11b22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "federated" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "subject" character varying NOT NULL, "assigneeId" uuid, CONSTRAINT "PK_6037a20d155c89a0dec47ead84e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_role" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid NOT NULL, "assigneeId" uuid NOT NULL, CONSTRAINT "UQ_0aba75700a541379ebff645c8da" UNIQUE ("roleId", "assigneeId"), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_metadata" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "REL_6afb43681a21cf7815932bc38a" UNIQUE ("userId"), CONSTRAINT "PK_6b8ab049aa434c57d1cdceb2188" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "passwordHash" text, "passwordSalt" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invitation" ("dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateDeleted" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "code" character varying NOT NULL, "category" character varying NOT NULL, "constraints" jsonb NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_otp" ADD CONSTRAINT "FK_beffb5a47aeba564f383d642ea9" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "federated" ADD CONSTRAINT "FK_b4c0934f822fe13687760f42831" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_5de24d2b69d7e7cc8cbb731f053" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_metadata" ADD CONSTRAINT "FK_6afb43681a21cf7815932bc38ac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_metadata" DROP CONSTRAINT "FK_6afb43681a21cf7815932bc38ac"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_5de24d2b69d7e7cc8cbb731f053"`);
        await queryRunner.query(`ALTER TABLE "federated" DROP CONSTRAINT "FK_b4c0934f822fe13687760f42831"`);
        await queryRunner.query(`ALTER TABLE "user_otp" DROP CONSTRAINT "FK_beffb5a47aeba564f383d642ea9"`);
        await queryRunner.query(`DROP TABLE "invitation"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_metadata"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "federated"`);
        await queryRunner.query(`DROP TABLE "user_otp"`);
    }

}
