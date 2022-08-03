import { MigrationInterface, QueryRunner } from "typeorm";

export class AddYearCHKAndMakeEndYearNullable1659502049776 implements MigrationInterface {
    name = 'AddYearCHKAndMakeEndYearNullable1659502049776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" ALTER COLUMN "endDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "degree"`);
        await queryRunner.query(`CREATE TYPE "public"."education_degree_enum" AS ENUM('Bachelor''s', 'Master''s', 'Doctoral', 'Associate', 'High School Diploma')`);
        await queryRunner.query(`ALTER TABLE "education" ADD "degree" "public"."education_degree_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "CHK_f86d35f481a9fe2983633e325a" CHECK ("startYear" <= "endYear")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "CHK_f86d35f481a9fe2983633e325a"`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "degree"`);
        await queryRunner.query(`DROP TYPE "public"."education_degree_enum"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "degree" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "experience" ALTER COLUMN "endDate" SET NOT NULL`);
    }

}
