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
        <input type="text" id="name" placeholder={t("register.fullName")} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
        <input type="email" id="email" placeholder={t("login.emailPlaceholder")} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" placeholder={t("login.passwordPlaceholder")} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
          {t('register.signUp')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t("register.alreadyHaveAccount")} &nbsp;
        <Link to={authPath.login} className="text-blue-600 hover:underline">{t("login.signIn")}</Link>
      </div>
    </>
  )
}

export default Register