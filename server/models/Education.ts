import {
    Check,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

export enum DegreeType {
    BACHELORS = "Bachelor's",
    MASTERS = "Master's",
    DOCTORAL = 'Doctoral',
    ASSOCIATE = 'Associate',
    HIGHSCHOOL = 'High School Diploma',
}

@Entity()
@Check('0 <= gpa AND gpa <= 4.0')
@Check('startYear <= endYear')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.education)
    user: User;

    @Column({ nullable: false })
    school: string;

    @Column({
        type: 'enum',
        enum: DegreeType,
        nullable: false,
    })
    degree: DegreeType;

    @Column({ nullable: false })
    fieldOfStudy: string;

    @Column('float', { nullable: true, default: null })
    gpa: number;

    @Column({ nullable: false })
    startYear: number;

    @Column({ nullable: false })
    endYear: number;
}
