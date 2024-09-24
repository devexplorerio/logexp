import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoContainerModule, PoInfoModule, PoSearchFilterMode, PoSearchFilterSelect, PoSearchModule} from '@po-ui/ng-components';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, PoSearchModule, PoInfoModule, PoContainerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  items = input.required<any[]>();
  filterSelect = input.required<PoSearchFilterSelect[]>();
  filteredItems = output<any[]>();
  filterMode = PoSearchFilterMode.contains;

  onFilter(event: any[]) {
    this.filteredItems.emit(event);
  }

  changeModel(event: string) {
    if(event === '') {
      this.filteredItems.emit([]);
    }
  }
}
