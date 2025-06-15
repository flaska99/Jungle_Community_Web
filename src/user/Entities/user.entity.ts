import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ unique : true, length: 13  })
    user_id : string;

    @Column()
    password: string;

    @Column()
    jungleGrade : string;

    
}