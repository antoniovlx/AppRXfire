import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EstimacionesSoflamado } from "src/entities/EstimacionesSoflamado";
import { Repository } from "typeorm";
import { MainRepository } from "./MainRepository";

@Injectable({
    providedIn: 'root'
})
export class EstimacionesSoflamadoRepository extends MainRepository {
    getEstimacionesSoflamado(): Observable<EstimacionesSoflamado[]> {

        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesSoflamado> = connection.getRepository(EstimacionesSoflamado);
            return repository.createQueryBuilder("estimacionesSoflamado")
                .getMany().then(resultado => subscriber.next(resultado));
        };
        return this.runQuery(queryFunction);
    }

    getEstimacionesSoflamadoByDate(date: string): Observable<EstimacionesSoflamado[]> {

        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesSoflamado> = connection.getRepository(EstimacionesSoflamado);
            return repository.createQueryBuilder("estimacionesSoflamado")
                .where("estimacionesSoflamado.fecha LIKE :date", { date: date + '%' })
                .getMany().then(resultado => subscriber.next(resultado));
        };
        return this.runQuery(queryFunction);
    }

    deleteEstimacionesSoflamado(id: number) {
        let queryFunction = (connection, subscriber) => {
            const repository: Repository<EstimacionesSoflamado> = connection.getRepository(EstimacionesSoflamado);
            return repository.createQueryBuilder("estimacionesSoflamado")
                .delete()
                .from(EstimacionesSoflamado)
                .where("id = :id", { id: id })
                .execute().then(resultado => subscriber.next(resultado));
        };
            

        return this.runQuery(queryFunction);
    }

    saveOrUpdateSoflamado(resultadoSoflamado: EstimacionesSoflamado) {
        let queryFunction = (connection, subscriber) => {
            const repo = connection.getRepository(EstimacionesSoflamado);
            const item = repo.create(resultadoSoflamado);
            repo.save(item).then((estimaciones: EstimacionesSoflamado) => subscriber.next(estimaciones));
        };
        return this.runQuery(queryFunction);
    }
}