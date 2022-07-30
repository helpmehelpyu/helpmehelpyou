import {
    Check,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
@Check('0 <= gpa AND gpa <= 4.0')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.education)
    user: User;

    @Column({ nullable: false })
    school: string;

    @Column({ nullable: false })
    degree: string;

    @Column({ nullable: false })
    fieldOfStudy: string;

    @Column('float', { nullable: true, default: null })
    gpa: number;

    @Column({ nullable: false })
    startYear: number;

    @Column({ nullable: false })
    endYear: number;
}
