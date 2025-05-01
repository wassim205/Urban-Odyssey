export function Button({ className, variant = "default", children, ...props }) {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
      case "ghost":
        return "hover:bg-gray-100 text-gray-700"
      case "icon":
        return "bg-transparent hover:bg-gray-100 text-gray-700 p-1 h-8 w-8 rounded-full"
      case "":
        return "bg-transparent hover:bg-gray-100 text-gray-700"
      default:
        return "bg-emerald-600 text-white hover:bg-emerald-700"
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
