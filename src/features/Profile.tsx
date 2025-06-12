import DataCard from 'components/DataCard';
import { dashboardPath } from 'lib/constants';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const userInfo = {
  name: 'John Doe',
  email: 'abc@gmail.com',
  dob: "1998-03-31",
  gender: 'male',
  language: 'English',
  active: true,
  nested: {
    field1: 'value1',
    field2: 'value2',
  }
};

const PersonalInfo = () => {
  const { t } = useTranslation('profile');
  const na = useNavigate();
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-medium mb-4">
          {t('title')}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('subtitle')}
        </p>
      </div>
      <div className="p-6 h-1" />
      <div className="bg-white mb-6">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-1">
            <h2 className="text-3xl mb-2">
              {t('section.profileInfoTitle')}
            </h2>
            <p className="text-gray-600 mb-4">
              {t('section.profileInfoDesc')}
            </p>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-center h-full max-w-[360px]">
              <img
                src="https://www.gstatic.com/identity/boq/accountsettingsmobile/profile_scene_visible_720x256_ee5ae234eb96dc206b79c851f41a6f69.png"
                alt="Privacy checkup icon"
              />
            </div>
          </div>
        </div>
      </div>
      <DataCard
        title={t('section.basicInfoTitle')}
        description={t('section.basicInfoDesc')}
        fields={[
          {
            key: "name",
            title: t('field.name'),
          },
          {
            key: 'email',
            title: t('field.email'),
          },
          {
            key: 'dob',
            title: t('field.dob'),
            render: (value) => {
              const date = new Date(value);
              return date.toLocaleDateString("vi-VN", {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }  );
            }
          },
          {
            key: "gender",
            title: t('field.gender'),
            render: (value) => t(`gender.${value}`),
          },
          {
            key: "language",
            title: t('field.language'),
          },
          {
            key: "active",
            title: t('field.active'),
            render: (value) => (
              <span className={`text-${value ? 'green' : 'red'}-600`}>
                {value ? t('field.activeYes') : t('field.activeNo')}
              </span>
            ),
          },
        ]}
        data={userInfo}
        onRowClick={(key, value, data, index) => {
          na(`/${key}/detail`, {
            state: { title: t(`field.${key}`), value, isDetail: true },
          });
        }}
      />
    </>
  );
};

export default PersonalInfo;
