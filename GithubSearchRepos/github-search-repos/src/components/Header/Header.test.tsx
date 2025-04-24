import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { describe, expect, test } from 'vitest';

describe('Header', () => {
  test('renders the header component', () => {
    const { container } = render(<Header />);
    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the title with correct text', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Github Repository Search');
  });

  test('title has the appropriate styling classes', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveClass('font-bold');
  });

  test('title is responsive with different text alignments', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', { level: 1 });
    // Default/mobile alignment is center
    expect(titleElement).toHaveClass('text-center');
    // Large screens have left alignment
    expect(titleElement).toHaveClass('lg:text-left');
  });

  test('title has different font sizes for different screen sizes', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', { level: 1 });
    
    // Base/mobile size
    expect(titleElement).toHaveClass('text-3xl');
    
    // Responsive sizes
    expect(titleElement).toHaveClass('sm:text-4xl');
    expect(titleElement).toHaveClass('md:text-5xl');
    expect(titleElement).toHaveClass('lg:text-6xl');
  });
});