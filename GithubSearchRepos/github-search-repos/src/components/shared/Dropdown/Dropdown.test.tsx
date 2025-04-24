import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown } from './Dropdown';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, beforeEach, vi } from 'vitest';

describe('Dropdown', () => {
  // Mock data
  const mockOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];
  
  const defaultProps = {
    id: "test-dropdown",
    label: "Test Label",
    value: "25",
    onChange: vi.fn(),
    options: mockOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with correct label', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders with correct initial value', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<Dropdown {...defaultProps} />);
    
    // We can check that all options exist in the DOM
    mockOptions.forEach(option => {
      // Check each option is in the document
      const optionElement = screen.getByRole('option', { name: option.label });
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveValue(option.value);
    });
  });

  test('calls onChange with correct value when selection changes', async () => {
    render(<Dropdown {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '50');
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('50');
  });

  test('applies custom container class name', () => {
    const customProps = {
      ...defaultProps,
      containerClassName: 'custom-test-class'
    };
    
    const { container } = render(<Dropdown {...customProps} />);
    expect(container.firstChild).toHaveClass('custom-test-class');
  });

  test('has accessible label with matching id', () => {
    render(<Dropdown {...defaultProps} />);
    
    const label = screen.getByText('Test Label');
    const select = screen.getByRole('combobox');
    
    expect(label).toHaveAttribute('for', 'test-dropdown');
    expect(select).toHaveAttribute('id', 'test-dropdown');
  });

  test('renders with numeric value', () => {
    const numericProps = {
      ...defaultProps,
      value: 10,
    };
    
    render(<Dropdown {...numericProps} />);
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  test('renders dropdown chevron icon', () => {
    const { container } = render(<Dropdown {...defaultProps} />);
    
    // Since there's no testid, we can check for SVG element
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Check specific path attributes to verify it's the dropdown chevron
    const path = svg?.querySelector('path');
    expect(path).toHaveAttribute('d', 'M19 9l-7 7-7-7');
  });
});