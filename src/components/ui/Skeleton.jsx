export const SkeletonCard = () => (
  <div className="bg-slate-200 rounded-lg p-3 animate-pulse">
    <div className="h-4 bg-slate-300 rounded w-3/4 mb-2" />
    <div className="h-3 bg-slate-300 rounded w-1/2" />
  </div>
);

export const SkeletonList = () => (
  <div className="bg-slate-200 rounded-xl p-3 w-72 flex-shrink-0 animate-pulse">
    <div className="h-5 bg-slate-300 rounded w-1/2 mb-4" />
    <div className="flex flex-col gap-2">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

export const SkeletonBoardCard = () => (
  <div className="bg-slate-200 rounded-xl p-5 animate-pulse aspect-video">
    <div className="h-5 bg-slate-300 rounded w-2/3 mb-3" />
    <div className="h-3 bg-slate-300 rounded w-1/3" />
  </div>
);
