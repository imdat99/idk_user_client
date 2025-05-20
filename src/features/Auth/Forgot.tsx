import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { authPath } from 'lib/constants';

const Forgot = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{t('forgot.title')}</h2>
      </div>
      <form className="mt-6 space-y-4">
        <input
          type="email"
          placeholder={t('login.emailPlaceholder')}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
        >
          {t('forgot.sendResetLink')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t('forgot.rememberPassword')}&nbsp;
        <Link to={authPath.login} className="text-blue-600 hover:underline">
          {t('forgot.backToSignIn')}
        </Link>
      </div>
    </>
  );
};

export default Forgot;
