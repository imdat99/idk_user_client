import { useTranslation } from "react-i18next";
import { Link } from "react-router"

const Register = () => {
  const { t } = useTranslation('auth');
  return (
    <div id="signup">
        <h2 className="text-center text-xl font-semibold text-gray-800">{t("register.createAccount")}</h2>
        <form className="mt-6 space-y-4">
          <input type="text" placeholder={t("register.fullName")} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder={t("login.emailPlaceholder")} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder={t("login.passwordPlaceholder")} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition">
            {t('register.signUp')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {t("register.alreadyHaveAccount")} &nbsp;
          <Link to="/login" className="text-blue-600 hover:underline">{t("login.signIn")}</Link>
        </div>
      </div>
  )
}

export default Register