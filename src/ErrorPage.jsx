import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="text-lg text-gray-700">Sorry, an unexpected error has occurred.</p>
      {error?.statusText || error?.message ? (
        <p className="text-gray-500 mt-4">
          <i>{error.statusText || error.message}</i>
        </p>
      ) : null}
      <a
        href="/"
        className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Back to Home
      </a>
    </div>
  );
}

export default ErrorPage;
