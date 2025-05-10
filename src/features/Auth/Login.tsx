import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation('auth');
  return (
    <div id="signin">
      <div className="text-center">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {t('login.title')}
        </h2>
        <p className="text-sm text-gray-600">{t('login.subtitle')}</p>
      </div>

      <button className="w-full mt-6 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition">
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5" />
        {t('login.signInWithGoogle')}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">{t('login.orWithEmail')}</span>
        </div>
      </div>

      <form className="space-y-4">
        <input
          type="email"
          placeholder={t('login.emailPlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
        >
          {t('login.signIn')}
        </button>
      </form>
      <div className="mt-6 mb-3 text-center text-sm">
        <Link to="/forgot" className="text-blue-600 hover:underline">
          {t('login.forgotPassword')}
        </Link>
      </div>
      <div className="text-center text-sm text-gray-600">
        {t('login.noAccount')}&nbsp;
        <Link to="/signup" className="text-blue-600 hover:underline">
          {t('login.signUp')}
        </Link>
      </div>
    </div>
  );
};

export default Login;
