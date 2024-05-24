import React, { ReactNode } from 'react';

// Props for the Layout component
interface LayoutProps {
  children: ReactNode;
}

// Layout component to wrap around children components
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {children}  {/* Render the children components */}
    </div>
  );
};

export default Layout; // Export the component
