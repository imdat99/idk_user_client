import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { showToast } from 'components/Toast';
import { authPath } from 'lib/constants';
import {
  ContactRound,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { type MouseEvent, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface RegisterFormValues {
  email: string;
  code: string;
  fullName: string;
  password: string;
}
const Register = () => {
  const { t } = useTranslation('auth');
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [inpPasswordType, setInpType] = useState('password');
  const [countdown, setCountdown] = useState(0);
  const { register, handleSubmit, getValues, getFieldState } =
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
          showToast({
            // variant: "info",
            title: t('register.codeSent'),
            description: t('register.codeSentDescription', { email }),
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
          <Input
            type="email"
            prefix={<Mail className="text-muted-foreground" size={18} />}
            {...register('email', {
              required: t('login.emailRequired'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('login.emailInvalid'),
              },
            })}
            placeholder={t('login.emailPlaceholder')}
          />
          <div className="flex flex-col gap-1">
            <Input
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
                <Button
                  className="shadow-none h-7 px-2 bg-primary/80"
                  size={'sm'}
                  onClick={sendCode}
                  loading={sendCodeLoading}
                  disabled={countdown > 0}
                >
                  {countdown ? `${countdown}s` : t('register.sendCode')}
                </Button>
              }
            />
            <div className="text-gray-500 text-sm">
              {t('register.emailTip')}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-black font-bold">{t('register.accountInfo')}</p>
          <Input
            type="text"
            autoComplete="off"
            placeholder={t('register.fullName')}
            {...register('fullName', {
              required: t('register.fullNameRequired'),
              minLength: {
                value: 2,
                message: t('register.fullNameMinLength'),
              },
            })}
            prefix={
              <ContactRound className="text-muted-foreground" size={18} />
            }
          />
          <Input
            type={inpPasswordType}
            autoComplete="off"
            onPressEnter={(e) => e.preventDefault()}
            placeholder={t('login.passwordPlaceholder')}
            {...register('password', {
              required: t('login.passwordRequired'),
              minLength: {
                value: 6,
                message: t('login.passwordMinLength'),
              },
            })}
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
            prefix={<LockKeyhole className="text-muted-foreground" size={18} />}
          />
        </div>
        <Button type="submit" className="w-full py-2 font-medium">
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
