import * as Lucide from 'lucide-react';


// Function to dynamically resolve lucide-react icon component from string
export const getIconComponent = (iconName: string) => {
  // Ensure the iconName is capitalized (lucide-react uses PascalCase)
  const capitalizedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  // Checkresielect the icon component or fallback to Circle
  const IconComponent = (Lucide[capitalizedIconName as keyof typeof Lucide] || Lucide.Circle) as React.ComponentType<{ className?: string }>;
  return IconComponent;
};