import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  provider_id: String;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;


  @Column()
  user_id: String;

  /*
   - quando trazer os dados do appointments vai
   - trazer todos os dados do user

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  */

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Appointment;
