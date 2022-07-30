import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    featuredWork: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    headline: string;
}
