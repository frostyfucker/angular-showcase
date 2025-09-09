
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-interactive-profile',
  templateUrl: './interactive-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractiveProfileComponent {
  firstName = signal('Ada');
  lastName = signal('Lovelace');

  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  initials = computed(() => {
    const first = this.firstName()?.[0] || '';
    const last = this.lastName()?.[0] || '';
    return `${first}${last}`;
  });

  onFirstNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.firstName.set(input.value);
  }

  onLastNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.lastName.set(input.value);
  }
}
