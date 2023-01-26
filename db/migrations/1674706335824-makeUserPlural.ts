import { MigrationInterface, QueryRunner } from "typeorm";

export class makeUserPlural1674706335824 implements MigrationInterface {
    name = 'makeUserPlural1674706335824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
