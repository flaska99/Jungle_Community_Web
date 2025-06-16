import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, Length } from "class-validator";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @IsNotEmpty()
    @Column()
    @Length(2, 5)
    user_name : string;

    @IsNotEmpty()
    jungleGrade : string;

    @IsNotEmpty()
    @Column({ unique: true })
    @Length(4, 15)
    user_id: string;

    @IsNotEmpty()
    @Column()
    password: string;

}