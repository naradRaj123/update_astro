// textarea.jsx (no classnames)
import React from "react";

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full ${className}`}
      {...props}
    />
  );
});
