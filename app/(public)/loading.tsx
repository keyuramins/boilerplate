'use client';

import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Hero section skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-[80%] mx-auto" />
          <Skeleton className="h-6 w-[60%] mx-auto" />
        </div>

        {/* Features section skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 space-y-3">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          ))}
        </div>

        {/* CTA skeleton */}
        <div className="text-center mt-12">
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
} 