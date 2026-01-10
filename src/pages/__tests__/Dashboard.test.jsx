import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { AuthProvider } from '../../context/AuthContext';
import * as api from '../../api/api';

vi.mock('../../api/api');

const renderWithProviders = (component, { user = 'testuser' } = {}) => {
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

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader while fetching data', () => {
    api.fetchData.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays welcome message with username', async () => {
    api.fetchData.mockResolvedValue({
      data: [
        { id: 1, title: 'Test Post', body: 'Test body' },
      ],
    });

    renderWithProviders(<Dashboard />, { user: 'testuser' });

    await waitFor(() => {
      expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
    });
  });

  it('displays fetched data in cards', async () => {
    const mockData = [
      { id: 1, title: 'First Post', body: 'First body content' },
      { id: 2, title: 'Second Post', body: 'Second body content' },
    ];

    api.fetchData.mockResolvedValue({ data: mockData });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('First body content')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
      expect(screen.getByText('Second body content')).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    api.fetchData.mockRejectedValue(new Error('Network error'));

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  it('displays empty message when no data is returned', async () => {
    api.fetchData.mockResolvedValue({ data: [] });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  it('calls fetchData on mount', async () => {
    api.fetchData.mockResolvedValue({ data: [] });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(api.fetchData).toHaveBeenCalledTimes(1);
    });
  });
});

