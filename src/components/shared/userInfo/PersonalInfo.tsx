import { mapCountryCodeToName } from '@/shared/enumeration/CountryCode';
import { IUser } from '@/shared/model/user.model';
import { getEllipsisTxt } from '@/shared/utils/ultils';
import Avatar from 'react-avatar';
import CustomBadge from '../customBadge/CustomBadge';
import CountryCodeIcon from '../countryIcon/CountryCodeIcon';
import { useTranslation } from 'react-i18next';

const PersonalInfo = ({ userData }: { userData: IUser | undefined }) => {
  const { t } = useTranslation();
  return (
    <div className="user-search-info">
      <Avatar name={`Dummy Dummy`} round size="64px" />
      <div className="title-container">
        <p className="title">
          {userData?.firstName} {userData?.lastName}
        </p>
        <p className="subtitle">
          <CountryCodeIcon countryCode={userData?.countryCode} className="me-md" />
          {userData?.id}
        </p>
      </div>

      <div className="info-container">
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.lastName')}:</p>
          <p className="left-text">{userData?.lastName}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.firstName')}:</p>
          <p className="left-text">{userData?.firstName}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.nation')}:</p>
          <p className="left-text">{userData && t(mapCountryCodeToName[userData.countryCode])}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.publicKey')}:</p>
          <p className="left-text">{userData && getEllipsisTxt(userData.publicAddress, 10)}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.phone')}:</p>
          <p className="left-text">{userData?.phoneNumber}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.kycStatus')}:</p>
          <CustomBadge color="success">Đã KYC</CustomBadge>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.personalInfo.nationalId')}:</p>
          <p className="left-text">C85240502</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
