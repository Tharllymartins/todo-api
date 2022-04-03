import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";
import TagTasks from "../../models/TagTasks";

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
                    type: 'varchar',
                }
            ]
        }))

        await queryRunner.createTable( new Table({
            name: 'user_tags',
            columns: [
                {
                    name: 'user_id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'tag_id',
                    type: 'uuid',
                    isPrimary: true,
                }
            ],
            foreignKeys: [
                {
                  name: "UserId",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["user_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
                },
                {
                  name: "TagId",
                  referencedTableName: "tags",
                  referencedColumnNames: ["id"],
                  columnNames: ["tag_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE",
                },
              ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_tags', 'UserId');
        await queryRunner.dropForeignKey('user_tags', 'TagId')
        await queryRunner.dropTable('user_tags')
        await queryRunner.dropTable('tags')
    }
}
