import { Skeleton } from './ui/skeleton'

function SkeletonCard() {
  return (
    <Skeleton className="relative bg-transparent border rounded-xl h-[500px] p-6 w-full flex flex-col gap-4">
      <div className="h-8 flex items-center gap-6">
        <Skeleton className="h-6 md:w-1/3 w-2/3" />
      </div>
      <Skeleton className="absolute top-24 left-6 md:left-8 h-[380px] w-0.5" />
      <div className="h-full flex items-end justify-around">
        <Skeleton className="h-40 md:w-20 w-6" />
        <Skeleton className="h-72 md:w-20 w-6" />
        <Skeleton className="h-72 md:w-20 w-6" />
        <Skeleton className="h-80 md:w-20 w-6" />
        <Skeleton className="h-40 md:w-20 w-6" />
      </div>
      <Skeleton className="h-0.5 w-full" />
    </Skeleton>
  )
}

export function SkeletonBarChart() {
  return <SkeletonCard />
}
