import { authPath } from 'lib/constants';
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { Button } from 'primereact/button';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { type Toast } from 'primereact/toast';
import { RefObject, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router';

type FormValues = {
  email: string;
  password: string;
};
type ContextType = {
  toastRef: RefObject<Toast>;
};
const Login = () => {
  const { t } = useTranslation('auth');
  const { toastRef } = useOutletContext<ContextType>();
  const [inpPasswordType, setInpType] = useState('password');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    new Promise((resolve, reject) => {
      // Simulate an API call
      setTimeout(() => {
        console.log(data);
        reject(data);
      }, 2000);
    }).catch(() =>
      toastRef.current.show({ severity: "error", summary: 'Delete', detail: 'Data Deleted' })
    );
  const EyeCom = useMemo(
    () => (inpPasswordType === 'password' ? Eye : EyeOff),
    [inpPasswordType],
  );
  return (
    <>
      <div className="text-center">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {t('login.title')}
        </h2>
        <p className="text-sm text-gray-600">{t('login.subtitle')}</p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2 [&>button]:flex-1">
        <Button
          className="w-full justify-center"
          severity="secondary"
          outlined
          title={t('login.signInWithGoogle')}
        >
          <img
            src="/assets/images/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          {t('login.signInWithGoogle')}
        </Button>
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-gray-500">
            {t('login.orWithEmail')}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <Input
          type="email"
          placeholder={t('login.emailPlaceholder')}
          prefix={<Mail className="text-muted-foreground" size={18} />}
          {...register('email', { required: 'Email is required' })}
        /> */}
        <IconField iconPosition="left">
          <InputIcon>
            <Mail className="text-muted-foreground" size={18} />
          </InputIcon>
          <InputText invalid={!!errors.email} {...register('email', { required: 'Email is required' })} placeholder={t('login.emailPlaceholder')} className='w-full' />
        </IconField>
        <IconField>
          <InputIcon className='cursor-pointer select-none' onClick={(e) => {
            e.preventDefault();
            setInpType((prev) =>
              prev === 'password' ? 'text' : 'password',
            );
          }}>
            <EyeCom className="text-muted-foreground" size={18} />
          </InputIcon>
          <InputIcon className='left-2 !right-100'>
            <LockKeyhole className="text-muted-foreground" size={18} />
          </InputIcon>
          <InputText {...register('password', { required: 'Password is required' })} type={inpPasswordType} invalid={!!errors.password} placeholder={t('login.passwordPlaceholder')} className='w-full !px-8' />
        </IconField>
        <Button
          className="w-full justify-center"
          type="submit"
          loading={isSubmitting}
          loadingIcon={<LoaderCircle size={14} className="animate-spin mr-1" />}
        >
          {t('login.signIn')}
        </Button>
      </form>
      <div className="mt-6 mb-3 text-center text-sm">
        <Link
          to={authPath.forgotPassword}
          className="text-blue-600 hover:underline"
        >
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
