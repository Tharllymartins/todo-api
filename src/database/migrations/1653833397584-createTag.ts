import {Column, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class createTag1653833397584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tags",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: 'userId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )

        await queryRunner.addColumn("tasks", new TableColumn({
            name: "tagId",
            type: "uuid",
            isNullable: true,
        }))

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            name: "tagId",
            columnNames: ["tagId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tags",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('tags', new TableForeignKey({
            name: 'userId',
            columnNames: [ 
                'userId'
            ],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("tasks", "tagId")
        await queryRunner.dropColumn("tasks", "tagId")
        await queryRunner.dropForeignKey("tags", "userId")
        await queryRunner.dropColumn("tags", "userId")
        await queryRunner.dropTable("tags")
    }

}
