import { query } from "express";
import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateRelationTaskToUser1648306971339 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tasks', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
        }))

        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            name: 'userId',
            columnNames: [ 
                'user_id'
            ],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tasks', 'userId');

        await queryRunner.dropColumn('tasks', 'user_id')
    }

}
