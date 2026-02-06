import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import { TodoApiClient } from '@todo/api-client'
import type { Todo } from '@todo/types'

const apiClient = new TodoApiClient('http://localhost:3001')

export const Route = createFileRoute('/')({
  component: TodoPage,
})

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = useCallback(async () => {
    try {
      setError(null)
      const data = await apiClient.getTodos()
      setTodos(data)
    } catch (err) {
      setError('Failed to load todos. Make sure the backend is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const title = newTitle.trim()
    if (!title) return

    try {
      setError(null)
      const todo = await apiClient.createTodo({ title })
      setTodos((prev) => [...prev, todo])
      setNewTitle('')
    } catch {
      setError('Failed to create todo.')
    }
  }

  const handleToggle = async (todo: Todo) => {
    try {
      setError(null)
      const updated = await apiClient.updateTodo(todo.id, {
        completed: !todo.completed,
      })
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch {
      setError('Failed to update todo.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      setError(null)
      await apiClient.deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Failed to delete todo.')
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo App</h1>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleCreate} style={styles.form}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          style={styles.input}
          aria-label="New todo title"
        />
        <button type="submit" style={styles.addButton} aria-label="Add todo">
          Add
        </button>
      </form>

      {loading ? (
        <p style={styles.statusText}>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p style={styles.statusText}>No todos yet. Add one above!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                  style={styles.checkbox}
                  aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span
                  style={{
                    ...styles.todoTitle,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#333',
                  }}
                >
                  {todo.title}
                </span>
              </label>
              <button
                onClick={() => handleDelete(todo.id)}
                style={styles.deleteButton}
                aria-label={`Delete "${todo.title}"`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: '0 20px',
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c00',
    padding: '12px 16px',
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  form: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: 16,
    border: '1px solid #ddd',
    borderRadius: 8,
    outline: 'none',
  },
  addButton: {
    padding: '12px 24px',
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    cursor: 'pointer',
  },
  checkbox: {
    width: 18,
    height: 18,
    cursor: 'pointer',
  },
  todoTitle: {
    fontSize: 16,
  },
  deleteButton: {
    padding: '6px 12px',
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#dc2626',
    border: '1px solid #dc2626',
    borderRadius: 6,
    cursor: 'pointer',
  },
  statusText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
  },
}
