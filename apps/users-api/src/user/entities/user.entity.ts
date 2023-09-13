import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: true
    })
    private password: string;

    comparePassword(attempt: string): boolean {
        return attempt === this.password;
    }
}
