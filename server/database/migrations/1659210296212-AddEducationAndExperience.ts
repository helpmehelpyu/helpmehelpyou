import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEducationAndExperience1659210296212 implements MigrationInterface {
    name = 'AddEducationAndExperience1659210296212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "jobTitle" character varying NOT NULL, "organization" character varying, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "description" character varying NOT NULL DEFAULT '', "userId" uuid, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "featuredWork" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "headline" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education" ("id" SERIAL NOT NULL, "school" character varying NOT NULL, "degree" character varying NOT NULL, "fieldOfStudy" character varying NOT NULL, "gpa" double precision, "startYear" integer NOT NULL, "endYear" integer NOT NULL, "userId" uuid, CONSTRAINT "CHK_95168a7ae08ebb7dc39cb38c4c" CHECK (0 <= gpa AND gpa <= 4.0), CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userProfileId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c6c71bce0bd3f70fc754b8ab61d" UNIQUE ("userProfileId")`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c71bce0bd3f70fc754b8ab61d" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_723e67bde13b73c5404305feb14" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_723e67bde13b73c5404305feb14"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c71bce0bd3f70fc754b8ab61d"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_cbfb1d1219454c9b45f1b3c4274"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c6c71bce0bd3f70fc754b8ab61d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userProfileId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`DROP TABLE "education"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "experience"`);
    }

}
