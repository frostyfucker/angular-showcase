
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InteractiveProfileComponent } from './components/interactive-profile/interactive-profile.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AiIdeaGeneratorComponent } from './components/ai-idea-generator/ai-idea-generator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InteractiveProfileComponent,
    TodoListComponent,
    AiIdeaGeneratorComponent,
  ]
})
export class AppComponent {
  title = 'Angular Showcase';
}
