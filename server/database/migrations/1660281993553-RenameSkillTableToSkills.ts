import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameSkillTableToSkills1660281993553 implements MigrationInterface {
    name = 'RenameSkillTableToSkills1660281993553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_81f05095507fd84aa2769b4a522" UNIQUE ("name"), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills_users_users" ("skillsId" integer NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_04c995ecd7b1564d9e81ded8b14" PRIMARY KEY ("skillsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_49ffb8c8ff02c772673c8a18df" ON "skills_users_users" ("skillsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cc4461f4eedae60f447db4c239" ON "skills_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "skills_users_users" ADD CONSTRAINT "FK_49ffb8c8ff02c772673c8a18df4" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "skills_users_users" ADD CONSTRAINT "FK_cc4461f4eedae60f447db4c2397" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skills_users_users" DROP CONSTRAINT "FK_cc4461f4eedae60f447db4c2397"`);
        await queryRunner.query(`ALTER TABLE "skills_users_users" DROP CONSTRAINT "FK_49ffb8c8ff02c772673c8a18df4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cc4461f4eedae60f447db4c239"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49ffb8c8ff02c772673c8a18df"`);
        await queryRunner.query(`DROP TABLE "skills_users_users"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
