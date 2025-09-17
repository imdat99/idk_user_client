import { authPath } from 'lib/constants';
import { LoaderCircle, Mail } from 'lucide-react';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface FormValues {
  email: string;
}
const Forgot = () => {
  const { t } = useTranslation(['auth', 'common']);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    return new Promise((resolve, reject) => {
      // Simulate an API call
      setTimeout(() => {
        console.log(data);
        resolve(data);
      }, 2000);
    });
  };
  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {t('forgot.title')}
        </h2>
        <p className="text-sm text-gray-600">{t('forgot.subtitle')}</p>
      </div>
      <form
        className="w-full flex flex-col items-center space-y-4 [&>div]:flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IconField iconPosition="left" className='w-full'>
          <InputIcon>
            <Mail className="text-muted-foreground" size={18} />
          </InputIcon>
          <InputText invalid={!!errors.email}
            {...register('email', {
              required: t('login.emailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('login.emailInvalid'),
              },
            })}
            placeholder={t('login.emailPlaceholder')} className='w-full' />
        </IconField>
        <Button
          className='w-full justify-center'
          type="submit"
          title={t('forgot.sendResetLink')}
          loading={isSubmitting}
          loadingIcon={<LoaderCircle size={14} className="animate-spin mr-1" />}
        >
          {t('common:sendRequest.title')}
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
