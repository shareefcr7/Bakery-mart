import { Skeleton } from "@/components/ui/skeleton"

export function ProductGridSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-24 lg:w-full rounded-full lg:rounded-r-3xl" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
