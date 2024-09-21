import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { DeliveriesComponent } from './deliveries.component';
import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PoTableModule } from '@po-ui/ng-components';
import { Delivery } from '../../shared/types/delivery';

describe('DeliveriesComponent', () => {
  let component: DeliveriesComponent;
  let fixture: ComponentFixture<DeliveriesComponent>;
  let deliveryService: DeliveryService;

  const mockDeliveries: Delivery[] = [
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
    },
    {
      id: 3,
      documento: '55555555555',
      motorista_nome: 'John Doe',
      cliente_origem_nome: 'Stark Industries',
      cliente_origem_endereco: '321 New York Ave',
      cliente_origem_bairro: 'Manhattan',
      cliente_origem_cidade: 'New York City',
      cliente_destino_nome: 'Wayne Enterprises',
      cliente_destino_endereco: '789 Gotham St',
      cliente_destino_bairro: 'Old Gotham',
      cliente_destino_cidade: 'Gotham City',
      status_entrega: 'INSUCESSO'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveriesComponent, RouterTestingModule, PoTableModule],
      providers: [HttpClient, HttpHandler, DeliveryService,
        {
          provide: DeliveryService,
          useValue: {
            getDeliveries: () => of(mockDeliveries)
          }
        }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    deliveryService = TestBed.inject(DeliveryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set deliveries on getDeliveries()', async () => {
    spyOn(deliveryService, 'getDeliveries').and.returnValue(of(mockDeliveries));

    await component.getDeliveries();

    expect(deliveryService.getDeliveries).toHaveBeenCalled();
    expect(component.deliveries()).toEqual(mockDeliveries);
  });

});
