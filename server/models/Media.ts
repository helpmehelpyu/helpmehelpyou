import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Media {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User, (user) => user.workSamples, {
        nullable: false,
    })
    author: User;

    @Column({ nullable: false })
    source: string;

    @Column({ nullable: false })
    title: string;

    @Column({
        nullable: false,
        default: '',
    })
    description: string;

    @CreateDateColumn({ nullable: false })
    uploadDate: Date;
}
