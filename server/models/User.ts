import {
    Check,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Education } from './Education';
import { Experience } from './Experience';
import { Link } from './Link';
import { Media } from './Media';
import { UserProfile } from './UserProfile';

@Entity('users')
@Check('0 <= rating AND rating <= 100')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    phoneNumber: string;

    @Column({
        type: 'int',
        default: 50,
    })
    rating: number;

    @OneToMany(() => Media, (media) => media.author)
    workSamples: Media[];

    @OneToMany(() => Link, (link) => link.owner)
    links: Link[];

    @Column('text', {
        array: true,
        default: [],
    })
    skills: string[];

    @OneToMany(() => Experience, (experience) => experience.user)
    experience: Experience[];

    @OneToMany(() => Education, (education) => education.user)
    education: Education[];

    @Column('json', { default: { source: '', id: '' } })
    avatar: { source: string; id: string };

    @OneToOne(() => UserProfile)
    @JoinColumn()
    userProfile: UserProfile;
}
