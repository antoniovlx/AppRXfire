import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstimacionesEstimado } from "./EstimacionesEstimado";
import { EstimacionesObservado } from "./EstimacionesObservado";

@Entity("EstimacionesPatrones")
export class EstimacionesPatrones {

  constructor(){
    this.observado = new EstimacionesObservado();
    this.estimado = new EstimacionesEstimado();
  }

  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id",
  })
  id: number;

  @Column("text", { name: "fecha", nullable: false })
  fecha: string;

  @Column("numeric", { name: "velocidadViento", nullable: false })
  velocidadViento: number;

  @Column("numeric", { name: "cargaTotal", nullable: false })
  cargaTotal: number;

  @Column("numeric", { name: "cargaCombustibleFinoMuerto", nullable: false })
  cargaCombustibleFinoMuerto: number;

  @Column("numeric", { name: "numeroLineasEncendido", nullable: false })
  numeroLineasEncendido: number;

  @Column("numeric", { name: "distanciaLineasEncendido", nullable: false })
  distanciaLineasEncendido: number;

  @OneToOne(() => EstimacionesObservado, (observado) => observado.id, { primary: true, cascade: true })
  @JoinColumn([{ name: "observado", referencedColumnName: "id" }])
  observado: EstimacionesObservado;

  @OneToOne(() => EstimacionesEstimado, (estimado) => estimado.id, { primary: true, cascade: true })
  @JoinColumn([{ name: "estimado", referencedColumnName: "id" }])
  estimado: EstimacionesEstimado;

}
