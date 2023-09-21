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
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @Column()
    user_id: number;

    @Column()
    published_date: Date;

    @BeforeInsert()
    setPublishedDate() {
        if (!this.published_date) {
            this.published_date = new Date();
        }
    }
}
