import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Feedback from "./Feedback.entity";
import Categoria from "./Categoria.entity";

@Entity("pelicula")
export default class Pelicula extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "peliculaId" })
  peliculaId: number;

  @Column("varchar", { name: "titulo", length: 100 })
  titulo: string;

  @Column("varchar", { name: "descripcion", length: 120 })
  descripcion: string;

  @Column("varchar", { name: "trailerUrl" })
  trailerUrl: string;

  @Column("time", { name: "duracion" })
  duracion: string;

  @Column("date", { name: "estreno" })
  estreno: string;

  @Column("varchar", { name: "caratula" })
  caratula: string;

  @OneToMany(() => Feedback, (feedback) => feedback.pelicula)
  feedbacks: Feedback[];

  @ManyToMany(() => Categoria, (categoria) => categoria.peliculas)
  categorias: Categoria[];
}
