import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    story: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    userId: number;

    @Column()
    publishedDate: Date;

    @BeforeInsert()
    setPublishedDate() {
        if (!this.publishedDate) {
            this.publishedDate = new Date();
        }
    }
}
