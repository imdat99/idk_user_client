import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { showToast } from 'components/Toast';
import { authPath } from 'lib/constants';
import { LockKeyhole, Mail, Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation('auth');
  const [inpPasswordType, setInpType] = useState('password');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    new Promise((resolve, reject) => {
      // Simulate an API call
      setTimeout(() => {
        console.log(data);
        reject(data);
      }, 2000);
    }).catch(() =>
      showToast({
        variant: 'error',
        title: 'Lỗi',
        description: t('login.errorMessage'),
        duration: 3000,
      }),
    );
  const EyeCom = useMemo(
    () => (inpPasswordType === 'password' ? EyeOff : Eye),
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
          variant="outline"
          className="shadow-none w-full py-2 hover:bg-gray-50 bg-transparent"
          title={t('login.signInWithGoogle')}
        >
          <img
            src="/assets/images/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {t('login.signInWithGoogle')}
        </Button>
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            {t('login.orWithEmail')}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="email"
          placeholder={t('login.emailPlaceholder')}
          prefix={<Mail className="text-muted-foreground" size={18} />}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          onPressEnter={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
          type={inpPasswordType}
          placeholder={t('login.passwordPlaceholder')}
          prefix={<LockKeyhole className="text-muted-foreground" size={18} />}
          suffix={
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setInpType((prev) =>
                  prev === 'password' ? 'text' : 'password',
                );
              }}
              className="text-muted-foreground cursor-pointer"
            >
              <EyeCom size={18} />
            </button>
          }
          {...register('password', { required: 'Password is required' })}
        />
        <Button
          className="w-full py-2 font-medium select-none"
          type="submit"
          loading={isSubmitting}
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
