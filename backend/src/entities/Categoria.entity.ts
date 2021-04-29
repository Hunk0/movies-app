import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Pelicula from "./Pelicula.entity";

@Entity("categoria")
export default class Categoria extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "categoriaId" })
  categoriaId: number;

  @Column("varchar", { name: "nombre", length: 60 })
  nombre: string;

  @ManyToMany(() => Pelicula, (pelicula) => pelicula.categorias)
  @JoinTable({
    name: "filtros",
    joinColumns: [{ name: "categoriaId", referencedColumnName: "categoriaId" }],
    inverseJoinColumns: [
      { name: "peliculaId", referencedColumnName: "peliculaId" },
    ],
    schema: "peliculas",
  })
  peliculas: Pelicula[];
}
