import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader', () => {
  it('renders loading text', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders spinner element', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('div[style*="border"]');
    expect(spinner).toBeInTheDocument();
  });
});

