import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Buddies')
export class Buddy {

    @PrimaryColumn('text',{
        unique:true,
        nullable:false
    })
    name: string;

    @Column('int',{
        nullable:false
    })
    head: number;

    @Column('int',{
        nullable:false
    })
    hair: number;

    @Column('int',{
        nullable:false
    })
    clothes: number;    

    @Column('jsonb', {
        nullable: false,
        default: () => "'[0,0,0,0]'::jsonb"
    })
    hairColor: number[];

    @Column('jsonb', {
        nullable: false,
        default: () => "'[0,0,0,0]'::jsonb"
    })
    clothesColor: number[];
}
