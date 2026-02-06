import type { Todo, CreateTodoInput, UpdateTodoInput } from '@todo/types';

export class TodoApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async getTodos(): Promise<Todo[]> {
    const res = await fetch(`${this.baseUrl}/api/todos`);
    if (!res.ok) throw new Error(`Failed to fetch todos: ${res.statusText}`);
    return res.json();
  }

  async createTodo(input: CreateTodoInput): Promise<Todo> {
    const res = await fetch(`${this.baseUrl}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create todo: ${res.statusText}`);
    return res.json();
  }

  async updateTodo(id: number, input: UpdateTodoInput): Promise<Todo> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to update todo: ${res.statusText}`);
    return res.json();
  }

  async deleteTodo(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Failed to delete todo: ${res.statusText}`);
  }
}

export type { Todo, CreateTodoInput, UpdateTodoInput } from '@todo/types';
