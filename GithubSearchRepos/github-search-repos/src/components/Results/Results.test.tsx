import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from './Results';
import { describe, expect, test } from 'vitest';

// Mock data
const mockRepositories = [
  {
    id: 1,
    name: 'Test Repo 1',
    description: 'This is a test repository 1',
    html_url: 'https://github.com/test/repo1',
    stargazers_count: 100
  },
  {
    id: 2,
    name: 'Test Repo 2',
    description: 'This is a test repository 2',
    html_url: 'https://github.com/test/repo2',
    stargazers_count: 200
  }
];

describe('Results', () => {
  test('displays loading message when loading is true', () => {
    render(
      <Results 
        repositories={[]} 
        loading={true} 
        error={null} 
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    const errorMessage = 'Something went wrong';
    
    render(
      <Results 
        repositories={[]} 
        loading={false} 
        error={errorMessage} 
      />
    );
    
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });

  test('displays no results message when repositories array is empty', () => {
    render(
      <Results 
        repositories={[]} 
        loading={false} 
        error={null} 
      />
    );
    
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  test('renders repository cards when repositories are provided', () => {
    render(
      <Results 
        repositories={mockRepositories} 
        loading={false} 
        error={null} 
      />
    );
    
    // Check if repositories are rendered
    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
    
    // Check descriptions
    expect(screen.getByText('This is a test repository 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test repository 2')).toBeInTheDocument();
    
    // Check star counts
    expect(screen.getByText('Stars: 100')).toBeInTheDocument();
    expect(screen.getByText('Stars: 200')).toBeInTheDocument();
    
    // Check links
    const links = screen.getAllByText('View Repository');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://github.com/test/repo1');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/test/repo2');
  });

  test('repository cards have the correct styling', () => {
    render(
      <Results 
        repositories={mockRepositories} 
        loading={false} 
        error={null} 
      />
    );
    
    const container = screen.getByText('Test Repo 1').closest('div')?.parentElement;
    expect(container).not.toBeNull();
    expect(container).toHaveClass('grid');
    expect(container).toHaveClass('grid-cols-1');
    expect(container).toHaveClass('md:grid-cols-2');
    expect(container).toHaveClass('lg:grid-cols-3');
    
    const repoCards = screen.getAllByText(/Test Repo/).map(
      heading => heading.closest('div')
    );
    
    repoCards.forEach(card => {
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('rounded-md');
      expect(card).toHaveClass('shadow-md');
    });
  });

  test('repository links open in new tab and have security attributes', () => {
    render(
      <Results 
        repositories={mockRepositories} 
        loading={false} 
        error={null} 
      />
    );
    
    const links = screen.getAllByText('View Repository');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveClass('text-blue-500');
    });
  });
});