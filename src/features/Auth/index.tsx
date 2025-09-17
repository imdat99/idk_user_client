import LanguageBtn from 'components/LanguageBtn';
import { PolicyPath, contactPath } from 'lib/constants';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router';

const index = () => {
  const { t } = useTranslation('common');
  const toastRef = useRef<Toast>(null);
  console.log("render auth layout")
  return (
    <div className="bg-background flex items-center min-h-svh flex-col">
      <div className="flex-1 items-center flex">
        <div className=":uno: w-[calc(100vw-1rem)] max-w-lg rounded-2xl p-8 space-y-6">
          <Link to="/" className="flex w-full">
            <img
              className="mx-auto animate-bounce-in duration-500 h-16"
              src="/assets/images/file.svg"
              alt="logo"
            />
          </Link>
          <Toast ref={toastRef}/>
          <Outlet context={{ toastRef }}/>
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
