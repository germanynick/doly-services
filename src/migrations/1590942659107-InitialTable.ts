import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialTable1590942659107 implements MigrationInterface {
  name = 'InitialTable1590942659107'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Customer" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar NOT NULL, "email" varchar NOT NULL, "gender" varchar NOT NULL, "type" varchar NOT NULL, "balance" integer, "phone" varchar, "address" varchar, "status" varchar, "accountNumber" varchar)`,
    )
    await queryRunner.query(
      `CREATE TABLE "User" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "name" varchar, "email" varchar, "username" varchar NOT NULL, "password" varchar NOT NULL, "profileUrl" varchar, "salt" varchar NOT NULL)`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "User"`)
    await queryRunner.query(`DROP TABLE "Customer"`)
  }
}
