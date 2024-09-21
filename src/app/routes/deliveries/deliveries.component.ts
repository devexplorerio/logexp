import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoTableModule, PoTableColumn, PoInfoModule } from '@po-ui/ng-components';
import { lastValueFrom } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { Delivery } from '../../shared/types/delivery';


@Component({
  selector: 'app-deliveries',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, PoTableModule, PoInfoModule, NgxPaginationModule],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveriesComponent implements OnInit {
  columns: PoTableColumn[] = [
    { property: 'id', label: 'Id', type: 'number', width: '80px' },
    { property: 'documento', label: 'Documento' },
    { property: 'motorista_nome', label: 'Motorista' },
    { property: 'cliente_origem_nome', label: 'Cliente Origem' },
    { property: 'cliente_origem_endereco', label: 'Endereço Origem', visible: false },
    { property: 'cliente_origem_bairro', label: 'Bairro Origem', visible: false },
    { property: 'cliente_origem_cidade', label: 'Cidade Origem', visible: false },
    { property: 'cliente_destino_nome', label: 'Cliente Destino' },
    { property: 'cliente_destino_endereco', label: 'Endereço Destino' , visible: false },
    { property: 'cliente_destino_bairro', label: 'Bairro Destino', visible: false },
    { property: 'cliente_destino_cidade', label: 'Cidade Destino', visible: false },
    { property: 'status_entrega',
      label: 'Status',
      type: 'label',
      labels: [
        { value: 'ENTREGUE', label: 'Entregue', color: 'green',  },
        { value: 'PENDENTE', label: 'Pendente', color: 'orange'},
        { value: 'INSUCESSO', label: 'Insucesso', color: 'red' }
      ]
     }
  ];

  deliveries = signal<Delivery[]>([]);

  currentPage: any;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.getDeliveries();
  }

  async getDeliveries() {
    const deliveries = await lastValueFrom(this.deliveryService.getDeliveries());
    this.deliveries.set(deliveries);
  }

  onPageChange(currentPage: any) {
    this.currentPage = currentPage;
  }

}
