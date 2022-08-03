import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.experience)
    user: User;

    @Column({ nullable: false })
    jobTitle: string;

    @Column({ nullable: true })
    organization: string;

    @Column({ nullable: false })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ default: '', nullable: false })
    description: string;
}
