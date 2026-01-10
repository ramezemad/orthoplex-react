import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

const TestComponent = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.username : 'null'}</div>
      <button onClick={() => login('testuser')}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('provides null user initially when localStorage is empty', () => {
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('null');
  });

  it('loads user from localStorage on mount', () => {
    const userData = { username: 'saveduser' };
    const localStorageMock = {
      getItem: vi.fn(() => JSON.stringify(userData)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('saveduser');
  });

  it('login function sets user and saves to localStorage', () => {
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Login');
    act(() => {
      loginButton.click();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('testuser');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ username: 'testuser' })
    );
  });

  it('logout function clears user and removes from localStorage', () => {
    const userData = { username: 'testuser' };
    const localStorageMock = {
      getItem: vi.fn(() => JSON.stringify(userData)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user')).toHaveTextContent('testuser');

    const logoutButton = screen.getByText('Logout');
    act(() => {
      logoutButton.click();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    const localStorageMock = {
      getItem: vi.fn(() => 'invalid json'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;

    // Should not throw error
    expect(() => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    }).not.toThrow();
  });
});

