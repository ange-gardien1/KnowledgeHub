import { IconLoader } from "@tabler/icons-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <IconLoader className="animate-spin text-primary-500" size={48} />
  </div>
);

export default LoadingSpinner;
