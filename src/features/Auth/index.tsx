import { Outlet } from "react-router";

const index = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center min-h-screen">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        <Outlet />
        {/* <!-- SIGN IN PAGE -->
      

      <!-- SIGN UP PAGE -->
      

      <!-- FORGOT PASSWORD PAGE -->
      <div id="forgot" className="hidden">
        <h2 className="text-center text-xl font-semibold text-gray-800">Reset Password</h2>
        <form className="mt-6 space-y-4">
          <input type="email" placeholder="Enter your email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?
          <button onclick="showPage('signin')" className="text-blue-600 hover:underline">Back to Sign In</button>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default index;
