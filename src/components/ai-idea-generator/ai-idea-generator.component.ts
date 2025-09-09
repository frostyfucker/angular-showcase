
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-idea-generator',
  imports: [FormsModule, CommonModule],
  templateUrl: './ai-idea-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiIdeaGeneratorComponent {
  private geminiService = inject(GeminiService);

  topic = signal('a fun weekend project');
  ideas = signal<string[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  async generateIdeas() {
    if (!this.topic().trim()) return;

    this.loading.set(true);
    this.error.set(null);
    this.ideas.set([]);

    try {
      const generatedIdeas = await this.geminiService.generateIdeas(this.topic());
      this.ideas.set(generatedIdeas);
    } catch (e: any) {
      this.error.set(e.message || 'An unknown error occurred.');
    } finally {
      this.loading.set(false);
    }
  }
}
