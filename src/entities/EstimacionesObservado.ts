import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("EstimacionesObservado")
export class EstimacionesObservado {
  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id",
  })
  id: number;

  @Column("numeric", { name: "velocidadPropagacionFajas", nullable: false })
  velocidadPropagacionFajas: number;

  @Column("numeric", { name: "longitudLlamaFajas", nullable: false })
  longitudLlamaFajas: number;

  @Column("numeric", { name: "velocidadPropagacionFlancos", nullable: false })
  velocidadPropagacionFlancos: number;

  @Column("numeric", { name: "longitudLlamaFlancos", nullable: false })
  longitudLlamaFlancos: number;


  @Column("numeric", { name: "velocidadPropagacionPuntos", nullable: false })
  velocidadPropagacionPuntos: number;

  @Column("numeric", { name: "longitudLlamaPuntos", nullable: false })
  longitudLlamaPuntos: number;



}
