import { Link } from "react-router";

const Login = () => {
  return (
    <div id="signin">
      <div className="text-center">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600">Sign in to continue</p>
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition">
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5" />
        Sign in with Google
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or with email</span>
        </div>
      </div>

      <form className="space-y-4">
        {/* <input type="email" placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}
        {/* <input type="password" placeholder="Password" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}
        <div className="relative my-4 group">
          <input
            type="email"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="&nbsp;"
          />
          <label
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Email
          </label>
          
        </div>
        <div className="relative my-4 group">
          <input
            type="password"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="&nbsp;"
          />
          <label
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Password
          </label>
          
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?&nbsp;
        <Link
          to="/signup"
          /*onclick="showPage('signup')"*/ className="text-blue-600 hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
