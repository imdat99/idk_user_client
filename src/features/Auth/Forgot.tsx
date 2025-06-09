import { Button } from "components/Button";
import { authPath } from "lib/constants";
import { Mail, SendHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Input } from "components/Input";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
}
const Forgot = () => {
  const { t } = useTranslation("auth");
   const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    return new Promise((resolve, reject) => {
      // Simulate an API call
      setTimeout(() => {
        console.log(data);
        resolve(data);
      }, 2000);
    })
  }
  return (
    <>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {t("forgot.title")}
        </h2>
        <p className="text-sm text-gray-600">{t("forgot.subtitle")}</p>
      </div>
      <form className="flex w-full max-w-sm items-center space-x-2 [&>div]:flex-1" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder={t("login.emailPlaceholder")}
          prefix={<Mail className="text-muted-foreground" size={18} />}
          {...register("email", {
            required: t("login.emailRequired"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("login.emailInvalid"),
            },
          })}
        />
        <Button type="submit" size="icon" title={t("forgot.sendResetLink")} loading={isSubmitting}>
          <SendHorizontal />
        </Button>
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
