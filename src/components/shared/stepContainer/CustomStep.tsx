import CheckIcon from '@assets/img/common/check-circle.svg?react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface IStepInfo<T> {
  title: string;
  value: T;
}

interface ICustomStepProps<T> {
  steps: IStepInfo<T>[];
  currentStep: T;
}

const CustomStep = <T,>(props: ICustomStepProps<T>) => {
  const { t } = useTranslation();
  const { steps, currentStep } = props;
  const currentStepIndex = steps.findIndex((step) => step.value === currentStep);

  return (
    <>
      <section className="step-container">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index !== 0 ? <div className={`step-line ${step.value === currentStep ? 'active' : ''}`}></div> : ''}
            <div className={`step-pill ${step.value === currentStep ? 'active' : ''}`}>
              {index < currentStepIndex ? <CheckIcon /> : ''} {t(step.title)}
            </div>
          </React.Fragment>
        ))}

        {/* <div className="step-pill">
          <CheckIcon /> Điền thông tin
        </div>
        <div className="step-line active"></div>
        <div className="step-pill active">Kích hoạt tài khoản</div>
        <div className="step-line"></div>
        <div className="step-pill">Tạo thành công</div> */}
      </section>
    </>
  );
};

export default CustomStep;
