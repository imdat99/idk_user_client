import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ErrorScreen = () => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">{t('error.title')}</h1>
      <p className="text-sm text-red-600 mb-6 text-center">
        {t('error.message')}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        {t('error.reloadButton')}
      </button>
    </div>
  );
};

export default ErrorScreen;
