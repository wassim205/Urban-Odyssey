export function Badge({ className, variant = "default", ...props }) {
    const getVariantClasses = () => {
      switch (variant) {
        case "outline":
          return "border border-gray-200 bg-transparent text-gray-900";
        default:
          return "bg-gray-900 text-gray-50";
      }
    };
  
    return (
      <div
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getVariantClasses()} ${className}`}
        {...props}
      />
    );
  }