import Form, { Field, FieldContext, FormInstance } from 'rc-field-form';
import { Button } from "components/Button";
import { authPath } from "lib/constants";
import { LockKeyhole, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { showToast } from "components/Toast";
import { Input } from 'components/Input';
import { useContext, useEffect } from 'react';
interface FieldStateProps<T = any> {
  form?: FormInstance<T>;
  name: string;
}
const FieldState: React.FC<FieldStateProps> = (props) => {
  let { form } = props;
  if (!props.form) {
    form = useContext(FieldContext);
    if (!form) {
      console.warn('FieldState: form is not provided and no form instance found in context.');
      return null;
    }
  }
  const touched = form?.isFieldTouched(props.name);
  const validating = form?.isFieldValidating(props.name);
  const error = form?.getFieldError(props.name);
  useEffect(() => {
    form?.getFieldError(props.name);
    console.log(`FieldState: name=${props.name}, touched=${touched}, validating=${validating}, error=${error}`);
  }, [props.name, form?.getFieldError(props.name)]);
  return (
    <div style={{ color: 'green' }}>
      <span>Field: {props.name} {touched} {validating} {error}</span>
      {touched ? <span>Touched!</span> : null}
      {validating ? <span>Validating!</span> : null}
    </div>
  );
};
const Login = () => {
  const { t } = useTranslation("auth");
  const [form] = Form.useForm<{ email: string; password: string }>();
  const error = form?.getFieldError('email');
  console.log("Login component rendered", form, error);
  return (
    <>
      <div className="text-center">
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {t("login.title")}
        </h2>
        <p className="text-sm text-gray-600">{t("login.subtitle")}</p>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2 [&>button]:flex-1">
        <Button
          variant="outline"
          className="shadow-none w-full py-2 hover:bg-gray-50 bg-transparent"
          title={t("login.signInWithGoogle")}
        >
          <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5" />
          {t("login.signInWithGoogle")}
        </Button>
      </div>


      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            {t("login.orWithEmail")}
          </span>
        </div>
      </div>

      <Form onFinishFailed={console.log} form={form} className="space-y-4" onFinish={(values) => console.log(values)}>
        <Field name="email" rules={[{ required: true, message: t("login.emailRequired") }]}>
          <Input
            type="email"
            placeholder={t("login.emailPlaceholder")}
            prefix={<Mail className="text-muted-foreground" size={18} />}
          />
        </Field>
        <FieldState name="email" form={form} />

        <Field name="password" rules={[{ required: true, message: t("login.passwordRequired") }]}>
          <Input
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            prefix={<LockKeyhole className="text-muted-foreground" size={18} />}
          />
        </Field>
        <FieldState name="password" form={form} />
        <Button
          className="w-full py-2 font-medium"
          type='submit'
          // onClick={() =>
          //   showToast({
          //     title: "Error",
          //     description: "Something went wrong. Please try again.",
          //     variant: "error",
          //     duration: 5000,
          //     position: "top-right",
          //   })
          // }
        >
          {t("login.signIn")}
        </Button>
      </Form>
      <div className="mt-6 mb-3 text-center text-sm">
        <Link
          to={authPath.forgotPassword}
          className="text-blue-600 hover:underline"
        >
          {t("login.forgotPassword")}
        </Link>
      </div>
      <div className="text-center text-sm text-gray-600">
        {t("login.noAccount")}&nbsp;
        <Link to={authPath.register} className="text-blue-600 hover:underline">
          {t("login.signUp")}
        </Link>
      </div>
    </>
  );
};

export default Login;
