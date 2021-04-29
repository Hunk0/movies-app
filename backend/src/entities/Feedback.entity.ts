import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Pelicula from "./Pelicula.entity";

@Index("peliculaId", ["peliculaId"], {})
@Entity("feedback")
export default class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "feedbackId" })
  feedbackId: number;

  @Column("int", { name: "peliculaId" })
  peliculaId: number;

  @Column("int", { name: "calificacion" })
  calificacion: number;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.feedbacks, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "peliculaId", referencedColumnName: "peliculaId" }])
  pelicula: Pelicula;
}
