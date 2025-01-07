import { useTranslation } from 'react-i18next';
import { IFranchiseCountryInfo } from '@/shared/model/leaderCountry.model';
import dayjs from 'dayjs';

const OrganizationInfo = ({ orgData }: { orgData: IFranchiseCountryInfo | undefined | null }) => {
  const { t } = useTranslation();
  return (
    <div className="user-search-info">
      <div className="info-container">
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.organizationName')}:</p>
          <p className="left-text">{orgData?.org}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.legalRepresentativeName')}:</p>
          <p className="left-text">{orgData?.legalRepresentative}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.phone')}:</p>
          <p className="left-text">{orgData?.orgPhone}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.email')}:</p>
          <p className="left-text">{orgData?.orgEmail}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.address')}:</p>
          <p className="left-text">{orgData?.orgAddress}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.website')}:</p>
          <p className="left-text">{orgData?.orgWebsite}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.businessRegistrationCode')}:</p>
          <p className="left-text">{orgData?.businessRegistrationCode}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.taxCode')}:</p>
          <p className="left-text">{orgData?.taxCode}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.marketShare')}:</p>
          <p className="left-text">{orgData?.proportionEcommerceMarket}%</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.ecommerceValue')}:</p>
          <p className="left-text">
            {orgData?.valueEcommerceMarket} {t('app.applyNationalFranchisee.millionUSD')}
          </p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.integrationCategory')}:</p>
          <p className="left-text">{orgData?.integratedDirectory}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.model')}:</p>
          <p className="left-text">{orgData?.businessModel.toString()}</p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.operatingTime')}:</p>
          <p className="left-text">
            {dayjs(orgData?.activeTimeFrom).format('DD/MM/YYYY')} - {dayjs(orgData?.activeTimeTo).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className="info-row">
          <p className="right-text">{t('app.applyNationalFranchisee.companyCertification')}:</p>
          <p className="left-text"></p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
