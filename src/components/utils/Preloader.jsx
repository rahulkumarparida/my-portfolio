export default function Preloader({ progress }) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="text-white text-2xl font-mono">
        Loading {progress}%
      </div>
    </div>
  );
}
