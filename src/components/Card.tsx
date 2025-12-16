import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = React.memo(({
  children,
  hover = false,
  padding = 'md',
  shadow = 'sm',
  border = true,
  rounded = 'md',
  className = '',
  onClick,
  as: Component = 'div',
  ...rest
}) => {
  const classes = [
    'card',
    hover && 'card-hover',
    `card-padding-${padding}`,
    `card-shadow-${shadow}`,
    border && 'card-border',
    `card-rounded-${rounded}`,
    onClick && 'card-clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} onClick={onClick} {...rest}>
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

const CardHeader: React.FC<CardHeaderProps> = React.memo(({ children, className = '' }) => (
  <div className={`card-header ${className}`}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardBody: React.FC<CardBodyProps> = React.memo(({ children, className = '' }) => (
  <div className={`card-body ${className}`}>
    {children}
  </div>
));

CardBody.displayName = 'CardBody';

const CardFooter: React.FC<CardFooterProps> = React.memo(({ children, className = '' }) => (
  <div className={`card-footer ${className}`}>
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter };