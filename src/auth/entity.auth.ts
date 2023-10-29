import {Column, PrimaryGeneratedColumn, Entity} from 'typeorm'

@Entity()
export class AuthEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    phone: number;

}