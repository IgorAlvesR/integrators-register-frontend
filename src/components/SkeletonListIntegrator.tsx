import { Skeleton } from './ui/skeleton'

export function SkeletonListIntegrator() {
  return (
    <div
      data-testid="skeleton-integrator"
      className="flex justify-center items-center space-x-4 w-full"
    >
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  )
}
