import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PoDividerModule, PoInfoModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';

import { DeliveryService } from '../../core/services/delivery/delivery.service';
import { Utils } from '../../shared/utils/utils';
import { DeliveryStatus } from '../../shared/types/status';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PoTableModule, PoInfoModule, PoDividerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  columnsDelivered : PoTableColumn[] = [
    { property: 'motorista_nome', label: 'Motorista' },
    { property: 'total_entregas', label: 'Total Entregas', type: 'number' },
    { property: 'total_entregues', label: 'Total Status Entregue', type: 'number' }
  ];

  columnsFailure: PoTableColumn[] = [
    { property: 'motorista_nome', label: 'Motorista' },
    { property: 'total_insucessos', label: 'Total Status Insucesso', type: 'number' }
  ];

  columnsDistrict: PoTableColumn[] = [
    { property: 'cliente_destino_bairro', label: 'Bairro Destino' },
    { property: 'total_entregas', label: 'Total Entregas', type: 'number' },
    { property: 'total_entregues', label: 'Total Status Entregue', type: 'number' }
  ];

  deliveriesDelivered = signal<DeliveryStatus[]>([]);
  deliveriesFailure = signal<DeliveryStatus[]>([]);
  deliveriesDistrict = signal<DeliveryStatus[]>([]);

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.getDeliveriesDelivered();
    this.getDeliveriesFailure();
    this.getDeliveriesDistrict();
  }

  private async getDeliveries() {
    return await lastValueFrom(this.deliveryService.getDeliveries());
  }

  async getDeliveriesDelivered() {
    const deliveries = await this.getDeliveries();
    const groupByDriver = Utils.groupBy(deliveries, 'motorista_nome');

    const groupByDelivery = Object.entries(groupByDriver).map(([key, value]) =>
      ({
        motorista_nome: key,
        total_entregas: value?.length,
        total_entregues: value?.filter((delivery: any) => delivery.status_entrega === 'ENTREGUE')?.length
      })
    );

    this.deliveriesDelivered.set(groupByDelivery);
  }

  async getDeliveriesFailure() {
    const deliveries = await this.getDeliveries();
    const groupByDriver = Utils.groupBy(deliveries, 'motorista_nome');

    const groupByDelivery = Object.entries(groupByDriver).map(([key, value]) =>
      ({
        motorista_nome: key,
        total_entregas: value?.length,
        total_insucessos: value?.filter((delivery: any) => delivery.status_entrega === 'INSUCESSO')?.length
      })
    );

    this.deliveriesFailure.set(groupByDelivery);
  }

  async getDeliveriesDistrict() {
    const deliveries = await this.getDeliveries();
    const groupByDistrict = Utils.groupBy(deliveries, 'cliente_destino_bairro');

    const groupByDelivery = Object.entries(groupByDistrict).map(([key, value]) =>
      ({
        cliente_destino_bairro: key,
        total_entregas: value?.length,
        total_entregues: value?.filter((delivery: any) => delivery.status_entrega === 'ENTREGUE')?.length
      })
    );

    this.deliveriesDistrict.set(groupByDelivery);
  }

}
