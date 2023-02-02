import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EstimacionesPatrones } from "src/entities/EstimacionesPatrones";
import { getManager, Repository } from "typeorm";
import { ResultadosPatrones } from "../patrones/patrones.service";
import { MainRepository } from "./MainRepository";

@Injectable({
    providedIn: 'root'
})
export class EstimacionesPatronesRepository extends MainRepository {


    /*getEstimacionesPatrones(modelo: string, pendiente: number, humedad: number, velocidad: number): Observable<{longitudLlama: number, velocidadPropagacion: number}> {
        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesPatrones> = connection.getRepository(Tcr);
            return repository.createQueryBuilder("tcr")
            .where("tcr.modelo = :modelo", { modelo: modelo })
            .andWhere("tcr.humedad = :humedad", { humedad: humedad })
            .andWhere("tcr.pendiente = :pendiente", { pendiente: pendiente })
            .andWhere("tcr.velocidad = :velocidad", { velocidad: velocidad })
            .getOne().then(resultado => subscriber.next(resultado));
        };
        return this.runQuery(queryFunction);
    }*/

    getEstimacionesPatrones(): Observable<EstimacionesPatrones[]> {

        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesPatrones> = connection.getRepository(EstimacionesPatrones);
            return repository.createQueryBuilder("estimacionesPatrones")
                .leftJoinAndSelect("estimacionesPatrones.observado", "estimacionesObservado")
                .leftJoinAndSelect("estimacionesPatrones.estimado", "estimacionesEstimado")
                .getMany().then(resultado => subscriber.next(resultado));
        };
        return this.runQuery(queryFunction);
    }

    getEstimacionesPatronesByDate(date: string): Observable<EstimacionesPatrones[]> {

        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesPatrones> = connection.getRepository(EstimacionesPatrones);
            return repository.createQueryBuilder("estimacionesPatrones")
                .leftJoinAndSelect("estimacionesPatrones.observado", "estimacionesObservado")
                .leftJoinAndSelect("estimacionesPatrones.estimado", "estimacionesEstimado")
                .where("estimacionesPatrones.fecha LIKE :date", { date: date + '%' })
                .getMany().then(resultado => subscriber.next(resultado));
        };
        return this.runQuery(queryFunction);
    }

    deleteEstimacionesPatrones(id: number) {
        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesPatrones> = connection.getRepository(EstimacionesPatrones);
            return repository.createQueryBuilder("estimacionesPatrones")
                .delete()
                .from(EstimacionesPatrones)
                .where("id = :id", { id: id })
                .execute().then(resultado => subscriber.next(resultado));
        };
              
        /*let queryFunction = (connection, subscriber) => {
            return getManager().query(
                "DELETE FROM estimacionesPatrones " +
                "WHERE id = " + id).then(() => subscriber.next(true));
        };*/
        return this.runQuery(queryFunction);
    }

    saveOrUpdatePatrones(resultadoPatrones: EstimacionesPatrones) {
        let queryFunction = (connection, subscriber) => {
            const repo = connection.getRepository(EstimacionesPatrones);
            const item = repo.create(resultadoPatrones);
            repo.save(item).then((estimaciones: EstimacionesPatrones) => subscriber.next(estimaciones));
        };
        return this.runQuery(queryFunction);
    }
}