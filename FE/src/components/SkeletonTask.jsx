import { Skeleton } from './ui/skeleton';

function SkeletonTask() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-[600px] h-[20px] rounded-full bg-gray-200" />
      <Skeleton className="w-[600px] h-[20px] rounded-full  bg-gray-200" />
      <Skeleton className="w-[600px] h-[20px] rounded-full  bg-gray-200" />
    </div>
  );
}

export default SkeletonTask;
