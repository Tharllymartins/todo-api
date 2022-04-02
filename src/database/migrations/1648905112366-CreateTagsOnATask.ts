import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export default class CreateTagsOnATask1648905112366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tags',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: true
                }
            ]
        }))

        await queryRunner.createForeignKey('tags', new TableForeignKey({
            name: 'userId',
            columnNames: [ 
                'user_id'
            ],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.addColumn('tasks', new TableColumn({
            name: 'tags',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tags', 'userId');

        await queryRunner.dropTable('tags')
    }
}
