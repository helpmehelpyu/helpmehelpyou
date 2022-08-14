import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateJunctionTableNameAndColumns1660419533606 implements MigrationInterface {
    name = 'UpdateJunctionTableNameAndColumns1660419533606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill_users" ("skillId" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_52c253841019178ce411c069ae5" PRIMARY KEY ("skillId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea795f19b46535e5324337de9a" ON "skill_users" ("skillId") `);
        await queryRunner.query(`CREATE INDEX "IDX_85f65ef5a5700af715edac2deb" ON "skill_users" ("userId") `);
        await queryRunner.query(`ALTER TABLE "skill_users" ADD CONSTRAINT "FK_ea795f19b46535e5324337de9a7" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "skill_users" ADD CONSTRAINT "FK_85f65ef5a5700af715edac2debc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill_users" DROP CONSTRAINT "FK_85f65ef5a5700af715edac2debc"`);
        await queryRunner.query(`ALTER TABLE "skill_users" DROP CONSTRAINT "FK_ea795f19b46535e5324337de9a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85f65ef5a5700af715edac2deb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea795f19b46535e5324337de9a"`);
        await queryRunner.query(`DROP TABLE "skill_users"`);
    }

}
