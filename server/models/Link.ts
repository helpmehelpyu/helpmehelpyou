import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('links')
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.links)
    owner: User;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({ nullable: false })
    url: string;
}
