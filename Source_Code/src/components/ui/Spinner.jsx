import React from 'react';

export function Spinner({ size = 'md', color = 'primary' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  const colors = {
    primary: 'border-blue-600',
    white: 'border-white',
    emerald: 'border-emerald-500',
  };

  return (
    <div className={`${sizes[size]} rounded-full animate-spin ${colors[color]} border-t-transparent`} />
  );
}

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Spinner size="lg" />
      <p className="text-secondary-color text-sm">{message}</p>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      {icon && <div className="text-5xl">{icon}</div>}
      <div>
        <h3 className="font-semibold text-primary-color mb-1">{title}</h3>
        {description && <p className="text-secondary-color text-sm max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
