const ErrorScreen = () => {
  return (
    <body className="min-h-screen-sm flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-xl">
        <img src="/assets/images/logo.svg" alt="Xemdi Logo" className="h-10" />

        <p>
          <b>500.</b>{' '}
          <ins className="text-red-500 decoration-none">Server Error.</ins>
        </p>
        <p className="text-gray-600">
          Something went wrong on our end. Please try again.
        </p>
      </div>
    </body>
  );
};

export default ErrorScreen;
