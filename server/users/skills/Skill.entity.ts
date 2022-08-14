import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User.entity';

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @ManyToMany(() => User, (user) => user.skills)
    @JoinTable({
        name: 'skill_users',
        joinColumn: {
            name: 'skillId',
        },
        inverseJoinColumn: {
            name: 'userId',
        },
    })
    users: User[];
}
