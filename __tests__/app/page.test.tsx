import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Home', () => {
  it('renders the coming soon heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /coming soon/i })).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Home />);
    expect(screen.getByText(/high-capacity solar storage/i)).toBeInTheDocument();
  });

  it('renders the subtext', () => {
    render(<Home />);
    expect(screen.getByText(/serious energy storage accessible to everyone/i)).toBeInTheDocument();
  });
});
