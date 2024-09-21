import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DeliveryService } from './delivery.service';
import { DeliveryResp } from '../../../shared/types/delivery';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryService]
    });
    service = TestBed.inject(DeliveryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve deliveries from the API via GET', () => {
    const dummyDeliveries: DeliveryResp[] = [
      {
        "id": 1,
        "documento": "12345678901",
        "motorista": {
          "nome": "John Doe"
        },
        "cliente_origem": {
          "nome": "Acme Inc.",
          "endereco": "123 Main St",
          "bairro": "Downtown",
          "cidade": "Anytown"
        },
        "cliente_destino": {
          "nome": "Bob's Burgers",
          "endereco": "456 Oak Ave",
          "bairro": "Uptown",
          "cidade": "Otherville"
        },
        "status_entrega": "ENTREGUE"
      },
      {
        "id": 2,
        "documento": "98765432109",
        "motorista": {
          "nome": "Jane Smith"
        },
        "cliente_origem": {
          "nome": "Wayne Enterprises",
          "endereco": "789 Gotham St",
          "bairro": "Old Gotham",
          "cidade": "Gotham City"
        },
        "cliente_destino": {
          "nome": "Stark Industries",
          "endereco": "321 New York Ave",
          "bairro": "Manhattan",
          "cidade": "New York City"
        },
        "status_entrega": "PENDENTE"
      }
    ];

    service.getDeliveries().subscribe(deliveries => {
      expect(deliveries.length).toBe(2);
      expect(deliveries).toEqual([
        {
          id: 1,
          documento: '12345678901',
          motorista_nome: 'John Doe',
          cliente_origem_nome: 'Acme Inc.',
          cliente_origem_endereco: '123 Main St',
          cliente_origem_bairro: 'Downtown',
          cliente_origem_cidade: 'Anytown',
          cliente_destino_nome: 'Bob\'s Burgers',
          cliente_destino_endereco: '456 Oak Ave',
          cliente_destino_bairro: 'Uptown',
          cliente_destino_cidade: 'Otherville',
          status_entrega: 'ENTREGUE'
        },
        {
          id: 2,
          documento: '98765432109',
          motorista_nome: 'Jane Smith',
          cliente_origem_nome: 'Wayne Enterprises',
          cliente_origem_endereco: '789 Gotham St',
          cliente_origem_bairro: 'Old Gotham',
          cliente_origem_cidade: 'Gotham City',
          cliente_destino_nome: 'Stark Industries',
          cliente_destino_endereco: '321 New York Ave',
          cliente_destino_bairro: 'Manhattan',
          cliente_destino_cidade: 'New York City',
          status_entrega: 'PENDENTE'
        }
      ]);
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/brunochikuji/example/main/entregas.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDeliveries);
  });
});
