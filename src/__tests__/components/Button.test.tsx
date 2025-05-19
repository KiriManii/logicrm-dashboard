// src/__tests__/components/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/core/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-primary-600');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary-600');
  });

  test('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading').closest('button')).toBeDisabled();
  });
});
