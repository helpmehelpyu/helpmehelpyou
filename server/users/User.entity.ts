import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Media } from '../media/Media.entity';
import { Education } from './education/Education.entity';
import { Experience } from './experience/Experience.entity';
import { Link } from './link/Link.entity';
import { UserProfile } from './profile/UserProfile.entity';
import { Skill } from './skills/Skill.entity';

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

  @ManyToMany(() => Skill, (skill) => skill.users)
  skills: Skill[];

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
