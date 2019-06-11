import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import ProfileForm from "../../components/ProfileForm";
import Dropdown from "../../components/Dropdown";
import Toggle from "../../components/Toggle";
import Input from "../../components/Input";
import { SLabel, SSeparator } from "../../components/common";
import {
  adminUpdateBusinessProfile,
  adminUpdateBusinessSettings,
  adminSaveBusinessData
} from "../../redux/_admin";
import { notificationShow } from "../../redux/_notification";

import NATIVE_CURRENCIES from "../../constants/nativeCurrencies";
import MultipleChoice from "../../components/MultipleChoice";
import PAYMENT_METHODS from "../../constants/paymentMethods";
import { IPaymentMethod } from "src/helpers/types";
import { capitalize } from "src/helpers/utilities";

const SSettingsWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
`;

const SSettingsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// const Choice = (props: any) => <p>{props.method.type}</p>;

class Settings extends React.Component<any, any> {
  public static propTypes = {
    businessProfile: PropTypes.object.isRequired,
    businessSettings: PropTypes.object.isRequired
  };

  public render() {
    const { businessProfile, businessSettings } = this.props;
    return (
      <SSettingsWrapper>
        <SSettingsSection>
          <ProfileForm
            title={`Profile`}
            businessProfile={businessProfile}
            onInputChange={this.props.adminUpdateBusinessProfile}
            onInputSubmit={this.props.adminSaveBusinessData}
          />
        </SSettingsSection>
        <SSettingsSection>
          <h6>{"Tax"}</h6>
          <Input
            type="tel"
            label="Rate"
            placeholder="20"
            value={`${businessSettings.taxRate}`}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessSettings({
                taxRate: e.target.value
              })
            }
            onSubmit={this.props.adminSaveBusinessData}
          />
          <SLabel>{"Included"}</SLabel>
          <Toggle
            color={`lightBlue`}
            active={businessSettings.taxIncluded}
            onClick={() => {
              this.props.adminUpdateBusinessSettings({
                taxIncluded: !businessSettings.taxIncluded
              });
              this.props.adminSaveBusinessData();
            }}
          />
          <SLabel>{"Display"}</SLabel>
          <Toggle
            active={businessSettings.taxDisplay}
            onClick={() => {
              this.props.adminUpdateBusinessSettings({
                taxDisplay: !businessSettings.taxDisplay
              });
              this.props.adminSaveBusinessData();
            }}
          />

          <SSeparator />

          <h6>{"Payment"}</h6>
          <Dropdown
            label="Currency"
            selected={businessSettings.paymentCurrency}
            options={NATIVE_CURRENCIES}
            displayKey={"currency"}
            targetKey={"currency"}
            onChange={(paymentCurrency: string) => {
              this.props.adminUpdateBusinessSettings({
                paymentCurrency
              });
              this.props.adminSaveBusinessData();
            }}
          />
          <Input
            type="text"
            label="ETH Address"
            autoComplete={"off"}
            placeholder="0x0000000000000000000000000000000000000000"
            value={businessSettings.paymentAddress}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessSettings({
                paymentAddress: e.target.value
              })
            }
            onSubmit={this.props.adminSaveBusinessData}
          />
          <SLabel>{"Methods"}</SLabel>
          <MultipleChoice
            choices={PAYMENT_METHODS}
            selected={
              businessSettings && businessSettings.paymentMethods
                ? businessSettings.paymentMethods
                : []
            }
            renderItem={(method: IPaymentMethod) => (
              <React.Fragment>
                {`${capitalize(method.type)} (${method.assetSymbol})`}
              </React.Fragment>
            )}
            requiredKeys={["type", "assetSymbol"]}
            onChange={paymentMethods => {
              if (paymentMethods && paymentMethods.length) {
                this.props.adminUpdateBusinessSettings({
                  paymentMethods
                });
                this.props.adminSaveBusinessData();
              } else {
                this.props.notificationShow(
                  "Required to accept at least one payment method",
                  true
                );
              }
            }}
          />
        </SSettingsSection>
      </SSettingsWrapper>
    );
  }
}

const reduxProps = (store: any) => ({
  businessProfile: store.admin.businessProfile,
  businessSettings: store.admin.businessSettings
});

export default connect(
  reduxProps,
  {
    adminUpdateBusinessProfile,
    adminUpdateBusinessSettings,
    adminSaveBusinessData,
    notificationShow
  }
)(Settings);
