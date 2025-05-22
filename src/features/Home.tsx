import GoogleModalDemo from 'components/Dialog';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import mathService from 'worker/mathService';
import { Link } from 'react-router';
const Home = () => {
  const { t } = useTranslation('home');
  useSWR('/todos/1');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          mathService.add([1, 2, 3]).then((result) => {
            console.log('Result from worker:', result);
          }).catch((error) => {
            console.error('Error from worker:', error);
          });
        }}
      >
        Click me to test worker
      </button>
      <Link to="/login">
        Go to About Page
      </Link>
      {/* <GoogleModalDemo /> */}
      <h1 className="text-3xl font-bold h-[300px]">{t('title')}</h1>
    </div>
  );
};

export default Home;
