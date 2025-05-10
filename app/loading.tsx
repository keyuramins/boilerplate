import { Loader2 } from "lucide-react";

export default function SimpleLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-medium text-lg">Loading...</p>
      </div>
    </div>
  );
}
