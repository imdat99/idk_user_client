import { Button } from "components/Button";
import { Input } from "components/Input";
import { authPath } from "lib/constants";
import { useTranslation } from "react-i18next";
import { Link } from "react-router"

const Register = () => {
  const { t } = useTranslation('auth');
  return (
    <>
      <div className="text-center">
        <h2 className="text-center text-xl font-semibold text-gray-800">{t("register.createAccount")}</h2>
        <p className="text-sm text-gray-600">{t('register.subtitle')}</p>
      </div>
      <form className="mt-6 space-y-4">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">Họ và tên</label>
        <Input type="text" id="name" placeholder={t("register.fullName")} />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
        <Input type="email" id="email" placeholder={t("login.emailPlaceholder")} />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Mật khẩu</label>
        <Input type="password" id="password" placeholder={t("login.passwordPlaceholder")} />
        <Button type="submit" className="w-full py-2 font-medium">
          {t('register.signUp')}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t("register.alreadyHaveAccount")} &nbsp;
        <Link to={authPath.login} className="text-blue-600 hover:underline">{t("login.signIn")}</Link>
      </div>
    </>
  )
}

export default Register