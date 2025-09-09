import { authPath } from 'lib/constants';
import {
  ContactRound,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { type Toast } from 'primereact/toast';
import { type MouseEvent, RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useLoaderData, useOutletContext, useRevalidator } from 'react-router';

interface RegisterFormValues {
  email: string;
  code: string;
  fullName: string;
  password: string;
}
type ContextType = {
  toastRef: RefObject<Toast>;
};
const Register = () => {
  const { t } = useTranslation('auth');
  const { toastRef } = useOutletContext<ContextType>();
  const revalidator = useRevalidator();
  const data = useLoaderData();
  useEffect(() => {
    if (!data) {
      revalidator.revalidate();
    }
  }, [data, revalidator]);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [inpPasswordType, setInpType] = useState('password');
  const [countdown, setCountdown] = useState(0);
  const { register, handleSubmit, getValues, getFieldState, formState: { errors, isSubmitting } } =
    useForm<RegisterFormValues>();
  const sendCodeCountdown = useCallback(() => {
    let countdown = 60 * 5; // 5 minutes in milliseconds
    setCountdown(countdown);
    const interval = setInterval(() => {
      countdown -= 1; // Decrease countdown by 1 second
      if (countdown <= 0) {
        clearInterval(interval);
      }
      setCountdown(countdown);
    }, 1000);
  }, []);
  const sendCode = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.stopPropagation();
    const error = getFieldState('email').error;
    const email = getValues('email');
    if (!error && email) {
      setSendCodeLoading(true);
      fetch('http://ip-api.com/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => {
          sendCodeCountdown();
          toastRef.current?.show({
            severity: "info",
            // variant: "info",
            summary: t('register.codeSent'),
            detail: t('register.codeSentDescription', { email }),
          });
        })
        .finally(() => {
          setSendCodeLoading(false);
        });
    }
  };
  const EyeCom = useMemo(
    () => (inpPasswordType === 'password' ? EyeOff : Eye),
    [inpPasswordType],
  );
  return (
    <>
      <div className="text-center">
        <h2 className="text-center text-xl font-semibold text-gray-800">
          {t('register.createAccount')}
        </h2>
        <p className="text-sm text-gray-600">{t('register.subtitle')}</p>
      </div>
      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="gap-4 flex flex-col">
          <p className="text-black font-bold">
            {t('register.emailVerification')}
          </p>
          <IconField iconPosition="left">
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
          <div className="flex flex-col gap-1">
            <IconField>
              <InputIcon className='left-2 !right-100'>
                <ShieldCheck className="text-muted-foreground" size={18} />
              </InputIcon>
              <div className=':uno: flex flex-col justify-center pr-0 absolute top-0 right-2 h-full' >
                <Button
                  className="shadow-none h-7 px-2 bg-primary/80"
                  size="small"
                  onClick={sendCode}
                  loading={sendCodeLoading}
                  disabled={countdown > 0}
                >
                  {countdown ? `${countdown}s` : t('register.sendCode')}
                </Button>
              </div>
              <InputText invalid={!!errors.email}
                {...register('code', {
                  required: t('register.codeRequired'),
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: t('register.codeInvalid'),
                  },
                })}
                // onPressEnter={(e) => e.preventDefault()}
                placeholder={t('register.codePlaceholder')}
                className='w-full !px-8' />
            </IconField>
            {/* <Input
              onPressEnter={(e) => e.preventDefault()}
              placeholder={t('register.codePlaceholder')}
              autoComplete="off"
              type="text"
              {...register('code', {
                required: t('register.codeRequired'),
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: t('register.codeInvalid'),
                },
              })}
              prefix={
                <ShieldCheck className="text-muted-foreground" size={18} />
              }
              suffix={
                
              }
            /> */}
            <div className="text-gray-500 text-sm">
              {t('register.emailTip')}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-black font-bold">{t('register.accountInfo')}</p>
          <IconField iconPosition="left">
            <InputIcon>
              <ContactRound className="text-muted-foreground" size={18} />
            </InputIcon>
            <InputText invalid={!!errors.email}
              autoComplete="off"
              placeholder={t('register.fullName')}
              {...register('fullName', {
                required: t('register.fullNameRequired'),
                minLength: {
                  value: 2,
                  message: t('register.fullNameMinLength'),
                },
              })}
              className='w-full' />
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
        </div>
        <Button
          className="w-full justify-center"
          type="submit"
          loading={isSubmitting}
          loadingIcon={<LoaderCircle size={14} className="animate-spin mr-1" />}
        >
          {t('register.signUp')}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t('register.alreadyHaveAccount')} &nbsp;
        <Link to={authPath.login} className="text-blue-600 hover:underline">
          {t('login.signIn')}
        </Link>
      </div>
    </>
  );
};

export default Register;
