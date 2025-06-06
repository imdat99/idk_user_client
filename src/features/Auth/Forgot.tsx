import { Button } from "components/Button";
import { authPath } from "lib/constants";
import { Mail, SendHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Input } from "components/Input";

const Forgot = () => {
  const { t } = useTranslation("auth");
  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("forgot.title")}
        </h2>
        <p className="text-sm text-gray-600">{t("forgot.subtitle")}</p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2 [&>div]:flex-1">
        <Input
          type="email"
          placeholder={t("login.emailPlaceholder")}
          prefix={<Mail className="text-muted-foreground" size={18} />}
        />
        <Button type="submit" size="icon" title={t("forgot.sendResetLink")}>
          <SendHorizontal />
        </Button>
      </div>
      <form className="mt-6 space-y-4">
        {/* <Input
          type="email"
          placeholder={t('login.emailPlaceholder')}
        />
        <Button
          type="submit"
          className="w-full"
        >
          {t('forgot.sendResetLink')}
        </Button> */}
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {t("forgot.rememberPassword")}&nbsp;
        <Link to={authPath.login} className="text-blue-600 hover:underline">
          {t("forgot.backToSignIn")}
        </Link>
      </div>
    </>
  );
};

export default Forgot;
