import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillsTable1660273962673 implements MigrationInterface {
    name = 'AddSkillsTable1660273962673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skill_users_users" ("skillId" integer NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_d50e7901856243511026dbfb6a3" PRIMARY KEY ("skillId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_694e0f61a6c7d39bf578f075b3" ON "skill_users_users" ("skillId") `);
        await queryRunner.query(`CREATE INDEX "IDX_df01050542ffda7b22c67e0c68" ON "skill_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "skills"`);
        await queryRunner.query(`ALTER TABLE "skill_users_users" ADD CONSTRAINT "FK_694e0f61a6c7d39bf578f075b30" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "skill_users_users" ADD CONSTRAINT "FK_df01050542ffda7b22c67e0c680" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_users_users" DROP CONSTRAINT "FK_df01050542ffda7b22c67e0c680"`);
        await queryRunner.query(`ALTER TABLE "skill_users_users" DROP CONSTRAINT "FK_694e0f61a6c7d39bf578f075b30"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "skills" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df01050542ffda7b22c67e0c68"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_694e0f61a6c7d39bf578f075b3"`);
        await queryRunner.query(`DROP TABLE "skill_users_users"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
