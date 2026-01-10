import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { AuthProvider } from '../../context/AuthContext';

const renderWithProviders = (component, { user = null } = {}) => {
  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(() => (user ? JSON.stringify({ username: user }) : null)),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock;

  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login link when user is not authenticated', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('renders dashboard link and logout button when user is authenticated', () => {
    renderWithProviders(<Navbar />, { user: 'testuser' });
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    const { container } = renderWithProviders(<Navbar />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const menu = container.querySelector('.navbar-menu');

    expect(menu).not.toHaveClass('open');
    fireEvent.click(menuButton);
    expect(menu).toHaveClass('open');
  });

  it('closes mobile menu when link is clicked', () => {
    const { container } = renderWithProviders(<Navbar />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const menu = container.querySelector('.navbar-menu');
    const loginLink = screen.getByText('Login');

    fireEvent.click(menuButton);
    expect(menu).toHaveClass('open');
    fireEvent.click(loginLink);
    expect(menu).not.toHaveClass('open');
  });

  it('calls logout and navigates to home when logout is clicked', () => {
    const { container } = renderWithProviders(<Navbar />, { user: 'testuser' });
    const logoutButton = screen.getByText('Logout');

    fireEvent.click(logoutButton);
    expect(global.localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});

