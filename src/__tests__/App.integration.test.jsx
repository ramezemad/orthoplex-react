import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import * as api from '../api/api';

vi.mock('../api/api');

const renderApp = (initialEntries = ['/']) => {
  const localStorageMock = {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock;

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login when accessing dashboard without authentication', () => {
    renderApp(['/dashboard']);

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('allows navigation from login to dashboard after successful login', async () => {
    api.loginUser.mockResolvedValue({
      data: {
        success: true,
        user: { username: 'testuser', id: 123 },
        token: 'mock-token',
      },
    });

    api.fetchData.mockResolvedValue({
      data: [
        { id: 1, title: 'Test Post', body: 'Test body' },
      ],
    });

    renderApp(['/']);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
  });

  it('shows navbar with correct links based on authentication state', () => {
    renderApp(['/']);

    expect(screen.getByText('Orthoplex')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('allows logout and redirects to login page', async () => {
    const userData = { username: 'testuser' };
    const localStorageMock = {
      getItem: vi.fn(() => JSON.stringify(userData)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;

    api.fetchData.mockResolvedValue({
      data: [],
    });

    renderApp(['/dashboard']);

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    });
  });

  it('protects dashboard route and redirects unauthenticated users', () => {
    renderApp(['/dashboard']);

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
  });
});

