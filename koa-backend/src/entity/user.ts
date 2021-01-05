import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    // @primaryColumn()这个表示不是自动生成的主键，意味着需要手动赋予Id的值。
    id:number;

    @Column()
    name:string;

    @Column({select :false})
    password:string;

    @Column()
    email:string;
}