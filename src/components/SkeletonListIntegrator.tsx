import { Skeleton } from './ui/skeleton'

function SkeletonCard() {
  return (
    <Skeleton className="h-32 p-6 w-full flex flex-col gap-4">
      <div className="h-2 flex items-center gap-6">
        <Skeleton className="h-2 w-full" />
        <div className="flex items-center gap-3 self-start">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-2 w-2 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-2 w-1/4" />
      <Skeleton className="h-2 w-3/4" />
      <div className="h-3 flex flex-wrap gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
    </Skeleton>
  )
}

export function SkeletonListIntegrator() {
  return (
    <section
      data-testid="skeleton-integrator"
      className="grid grid-cols-1 md:grid-cols-2 gap-3 h-48"
    >
      <div>
        <SkeletonCard />
      </div>

      <div>
        <SkeletonCard />
      </div>
      <div>
        <SkeletonCard />
      </div>
      <div>
        <SkeletonCard />
      </div>
    </section>
  )
}
