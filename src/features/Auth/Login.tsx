import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { authPath } from 'lib/constants';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { LoaderCircle } from 'lucide-react';

const Login = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <div className="text-center">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {t('login.title')}
        </h2>
        <p className="text-sm text-gray-600">{t('login.subtitle')}</p>
      </div>

      <Button variant="outline" className="shadow-none w-full mt-6 py-2 hover:bg-gray-50 bg-transparent">
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5" />
        {t('login.signInWithGoogle')}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">{t('login.orWithEmail')}</span>
        </div>
      </div>

      <form className="space-y-4">
        <Input
          type="email"
          placeholder={t('login.emailPlaceholder')}
        />
        <Input
          type="password"
          placeholder={t('login.passwordPlaceholder')}
        />
        <Button
          type="submit"
          className="w-full py-2 font-medium"
          loading
        >
          {t('login.signIn')}
        </Button>
      </form>
      <div className="mt-6 mb-3 text-center text-sm">
        <Link to={authPath.forgotPassword} className="text-blue-600 hover:underline">
          {t('login.forgotPassword')}
        </Link>
      </div>
      <div className="text-center text-sm text-gray-600">
        {t('login.noAccount')}&nbsp;
        <Link to={authPath.register} className="text-blue-600 hover:underline">
          {t('login.signUp')}
        </Link>
      </div>
    </>
  );
};

export default Login;
