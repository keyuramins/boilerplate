import dynamic from 'next/dynamic';
import { Circle } from 'lucide-react';

function toKebabCase(name) {
  return name
    .replace(/_/g, '-') // Replace underscores with hyphens
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Insert hyphen between lowercase and uppercase letters
    .toLowerCase(); // Convert to lowercase
}

export const getIconComponent = (iconName) => {
  const kebabCaseName = toKebabCase(iconName);
  return dynamic(
    () =>
      import(`lucide-react/dist/esm/icons/${kebabCaseName}.js`)
        .then((mod) => mod.default)
        .catch(() => Circle), // Fallback to Circle if the icon doesn’t exist
    {
      loading: () => <Circle className="animate-spin opacity-60" />, // Show Circle while loading
    }
  );
};
