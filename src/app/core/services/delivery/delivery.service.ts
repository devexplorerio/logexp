import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { DeliveryResp } from '../../../shared/types/delivery';


@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveries() {
    const url = "https://raw.githubusercontent.com/brunochikuji/example/main/entregas.json";

    return this.http.get<DeliveryResp[]>(url)
      .pipe(
        map((deliveries) => deliveries.map((delivery) => ({
          id: delivery.id,
          documento: delivery.documento,
          motorista_nome: delivery.motorista.nome,
          cliente_origem_nome: delivery.cliente_origem.nome,
          cliente_origem_endereco: delivery.cliente_origem.endereco,
          cliente_origem_bairro: delivery.cliente_origem.bairro,
          cliente_origem_cidade: delivery.cliente_origem.cidade,
          cliente_destino_nome: delivery.cliente_destino.nome,
          cliente_destino_endereco: delivery.cliente_destino.endereco,
          cliente_destino_bairro: delivery.cliente_destino.bairro,
          cliente_destino_cidade: delivery.cliente_destino.cidade,
          status_entrega: delivery.status_entrega,
        }))
      ));
  }
}

