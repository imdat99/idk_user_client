import LanguageBtn from 'components/LanguageBtn';
import { PolicyPath, contactPath } from 'lib/constants';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router';

const index = () => {
  const { t } = useTranslation('common');
  return (
    <div className="bg-background flex items-center min-h-svh flex-col">
      <div className="flex-1 items-center flex">
        <div className=":uno: bg-white w-[calc(100vw-1rem)] md:w-[500px] max-w-md rounded-2xl p-8 space-y-6">
          <div className="flex">
            <img
              className="mx-auto animate-bounce-in duration-500 h-10 w-10"
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </div>
          <Outlet />
        </div>
      </div>
      <div className="flex justify-between" />
      <div className="mb-8 text-center text-xs text-gray-500">
        <p>{t('footer.text', { year: new Date().getFullYear() })}</p>
        <div className="mt-2 space-x-4">
          <LanguageBtn />
          <Link to={PolicyPath.privacy} className="hover:text-gray-700">
            {t('policy.title')}
          </Link>
          <Link to={contactPath.help} className="hover:text-gray-700">
            {t('helper.title')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
