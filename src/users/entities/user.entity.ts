import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @Column({unique:true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    active:boolean;

}
