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
  adminUpdateProfile,
  adminUpdateSettings,
  adminSaveData
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
    profile: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  public render() {
    const { profile, settings } = this.props;
    return (
      <SSettingsWrapper>
        <SSettingsSection>
          <ProfileForm
            title={`Profile`}
            profile={profile}
            onInputChange={this.props.adminUpdateProfile}
            onInputSubmit={this.props.adminSaveData}
          />
        </SSettingsSection>
        <SSettingsSection>
          <h6>{"Tax"}</h6>
          <Input
            type="tel"
            label="Rate"
            placeholder="20"
            value={`${settings.taxRate}`}
            onChange={(e: any) =>
              this.props.adminUpdateSettings({
                taxRate: e.target.value
              })
            }
            onSubmit={this.props.adminSaveData}
          />
          <SLabel>{"Included"}</SLabel>
          <Toggle
            color={`lightBlue`}
            active={settings.taxIncluded}
            onClick={() => {
              this.props.adminUpdateSettings({
                taxIncluded: !settings.taxIncluded
              });
              this.props.adminSaveData();
            }}
          />
          <SLabel>{"Display"}</SLabel>
          <Toggle
            active={settings.taxDisplay}
            onClick={() => {
              this.props.adminUpdateSettings({
                taxDisplay: !settings.taxDisplay
              });
              this.props.adminSaveData();
            }}
          />

          <SSeparator />

          <h6>{"Payment"}</h6>
          <Dropdown
            label="Currency"
            selected={settings.paymentCurrency}
            options={NATIVE_CURRENCIES}
            displayKey={"currency"}
            targetKey={"currency"}
            onChange={(paymentCurrency: string) => {
              this.props.adminUpdateSettings({
                paymentCurrency
              });
              this.props.adminSaveData();
            }}
          />
          <Input
            type="text"
            label="ETH Address"
            autoComplete={"off"}
            placeholder="0x0000000000000000000000000000000000000000"
            value={settings.paymentAddress}
            onChange={(e: any) =>
              this.props.adminUpdateSettings({
                paymentAddress: e.target.value
              })
            }
            onSubmit={this.props.adminSaveData}
          />
          <SLabel>{"Methods"}</SLabel>
          <MultipleChoice
            choices={PAYMENT_METHODS}
            selected={
              settings && settings.paymentMethods ? settings.paymentMethods : []
            }
            renderItem={(method: IPaymentMethod) => (
              <React.Fragment>
                {`${capitalize(method.type)} (${method.assetSymbol})`}
              </React.Fragment>
            )}
            requiredKeys={["type", "assetSymbol"]}
            onChange={paymentMethods => {
              if (paymentMethods && paymentMethods.length) {
                this.props.adminUpdateSettings({
                  paymentMethods
                });
                this.props.adminSaveData();
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
  profile: store.admin.profile,
  settings: store.admin.settings
});

export default connect(
  reduxProps,
  {
    adminUpdateProfile,
    adminUpdateSettings,
    adminSaveData,
    notificationShow
  }
)(Settings);
