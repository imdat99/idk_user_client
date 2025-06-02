import { Button } from "components/Button";
import { authPath } from "lib/constants";
import { ContactRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { AuthInput } from "./components/Input";

const Register = () => {
  const { t } = useTranslation("auth");
  return (
    <>
      <div className="text-center">
        <h2 className="text-center text-xl font-semibold text-gray-800">
          {t("register.createAccount")}
        </h2>
        <p className="text-sm text-gray-600">{t("register.subtitle")}</p>
      </div>
      <form className="mt-6 space-y-4">
        <div className="gap-4 flex flex-col">
          <p className="text-black font-bold">
            {t("register.emailVerification")}
          </p>
          <AuthInput
            type="email"
            autoComplete="off"
            id="email"
            startAdornment={
              <Mail className="text-muted-foreground" size={18} />
            }
            placeholder={t("login.emailPlaceholder")}
          />
          <div className="flex flex-col gap-1">
            <AuthInput
              placeholder={t("register.codePlaceholder")}
              autoComplete="off"
              type="text"
              name="code"
              startAdornment={
                <ShieldCheck className="text-muted-foreground" size={18} />
              }
              endAdornment={
                <Button
                  className="shadow-none h-7 px-2 bg-primary/80"
                  size={"sm"}
                  disabled
                >
                  {t("register.sendCode")}
                </Button>
              }
            />
            <div className="text-gray-500 text-sm">
              {t("register.emailTip")}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-black font-bold">{t("register.accountInfo")}</p>
            <AuthInput
              type="text"
              autoComplete="off"
              id="text"
              placeholder={t("register.fullName")}
              startAdornment={
                <ContactRound className="text-muted-foreground" size={18} />
              }
            />
            <AuthInput
              type="password"
              autoComplete="off"
              className="indent-6"
              placeholder={t("login.passwordPlaceholder")}
              startAdornment={
                <LockKeyhole className="text-muted-foreground" size={18} />
              }
            />
          </div>
        <Button type="submit" className="w-full py-2 font-medium">
          {t("register.signUp")}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t("register.alreadyHaveAccount")} &nbsp;
        <Link to={authPath.login} className="text-blue-600 hover:underline">
          {t("login.signIn")}
        </Link>
      </div>
    </>
  );
};

export default Register;
