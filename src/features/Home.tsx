import Toast from 'components/Toast';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation('home');
  useSWR('/todos/1');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <Toast />
      <h1 className="text-3xl font-bold h-[300px]">{t('title')}</h1>
    </div>
  );
};

export default Home;
