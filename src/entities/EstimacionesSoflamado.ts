import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("EstimacionesSoflamado")
export class EstimacionesSoflamado {

  constructor(){

  }

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id",
  })
  id: number;

  @Column("text", { name: "fecha", nullable: false })
  fecha: string;

  @Column("numeric", { name: "temperatura", nullable: false })
  temperatura: number;

  @Column("numeric", { name: "alturaArbolado", nullable: false })
  alturaArbolado: number;

  @Column("numeric", { name: "alturaRama", nullable: false })
  alturaRama: number;

  @Column("text", { name: "existenHuecos", nullable: false })
  existenHuecos: string;

  @Column("text", { name: "localizacionHuecos", nullable: false })
  localizacionHuecos: string;

  @Column("text", { name: "distanciaHuecos", nullable: false })
  distanciaHuecos: string;

  @Column("text", { name: "alturaSoflamadoMedia", nullable: false })
  alturaSoflamadoMedia: string;

  @Column("text", { name: "volumenSoflamado", nullable: false })
  volumenSoflamado: string;

  @Column("text", { name: "alturaSoflamadoHueco", nullable: false })
  alturaSoflamadoHueco: string;


}
