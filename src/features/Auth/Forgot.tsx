import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { authPath } from 'lib/constants';
import { Button } from 'components/Button';
import { Input } from 'components/Input';

const Forgot = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{t('forgot.title')}</h2>
      </div>
      <form className="mt-6 space-y-4">
        <Input
          type="email"
          placeholder={t('login.emailPlaceholder')}
        />
        <Button
          type="submit"
          className="w-full"
        >
          {t('forgot.sendResetLink')}
        </Button>
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
