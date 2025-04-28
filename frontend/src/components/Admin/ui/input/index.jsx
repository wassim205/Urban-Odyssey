export function Input({ className, ...props }) {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
        {...props}
      />
    );
  }