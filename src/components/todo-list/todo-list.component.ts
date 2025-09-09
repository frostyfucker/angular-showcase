
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  newTodoText = signal('');
  todos = signal<Todo[]>([
    { id: 1, text: 'Master Angular Signals', done: true },
    { id: 2, text: 'Build a trendy UI', done: true },
    { id: 3, text: 'Integrate Gemini API', done: false },
  ]);

  addTodo() {
    const text = this.newTodoText().trim();
    if (text) {
      this.todos.update(currentTodos => [
        ...currentTodos,
        { id: Date.now(), text, done: false }
      ]);
      this.newTodoText.set('');
    }
  }

  removeTodo(todoId: number) {
    this.todos.update(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  }

  toggleDone(todoId: number) {
    this.todos.update(currentTodos => 
      currentTodos.map(todo => 
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    );
  }
}
