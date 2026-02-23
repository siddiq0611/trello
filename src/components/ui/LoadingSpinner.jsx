// const LoadingSpinner = ({ fullScreen = false }) => {
//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//           <p className="text-slate-400 font-body text-sm tracking-wide">
//             Loading...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center p-8">
//       <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
//     </div>
//   );
// };

// export default LoadingSpinner;

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-body text-sm tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
