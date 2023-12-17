import React from "react";

const ErrorBoundaryPage = () => {
  return (
    <div>
      Something went wrong. Please refresh this page.
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default ErrorBoundaryPage;
