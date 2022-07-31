import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAvatarType1659231905349 implements MigrationInterface {
    name = 'UpdateAvatarType1659231905349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" json NOT NULL DEFAULT '{"source":"","id":""}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying NOT NULL DEFAULT ''`);
    }

}
