import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getBusinessType,
  getCountryName,
  getIpfsUrl,
  capitalize
} from "../../helpers/utilities";
import picture from "../../assets/picture.png";
import { SField, SLabel, SSeparator } from "../../components/common";
import { IPaymentMethod } from "../../helpers/types";

const SLogo = styled.div`
  width: 100%;
  & img {
    width: 100%;
    max-width: 150px;
  }
`;

const SSettingsWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
`;

const SSettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SSettingsLeft = styled(SSettingsSection)`
  width: 300px;
`;
const SSettingsRight = styled(SSettingsSection)`
  width: 100%;
`;

function formatPaymentMethodsDisplay(methods: IPaymentMethod[]): string {
  let result = "";
  methods.forEach(method => {
    result += `${capitalize(
      method.type
    )} (${method.assetSymbol.toUpperCase()}); `;
  });
  return result;
}

const Settings = (props: any) => {
  const { profile, tax, payment } = props.businessData;
  return (
    <SSettingsWrapper>
      <SSettingsLeft>
        <SLogo>
          <img
            src={getIpfsUrl(profile.logo)}
            alt={profile.name}
            onError={(event: any) => (event.target.src = picture)}
          />
        </SLogo>
      </SSettingsLeft>
      <SSettingsRight>
        <h6>{"Profile"}</h6>
        <SLabel>{"Name"}</SLabel>
        <SField>{profile.name}</SField>
        <SLabel>{"Description"}</SLabel>
        <SField>{profile.description}</SField>
        <SLabel>{"Type"}</SLabel>
        <SField>{getBusinessType(profile.type)}</SField>
        <SLabel>{"Country"}</SLabel>
        <SField>{getCountryName(profile.country)}</SField>
        <SLabel>{"Email"}</SLabel>
        <SField>{profile.email}</SField>
        <SLabel>{"Phone"}</SLabel>
        <SField>{profile.phone}</SField>

        <SSeparator />

        <h6>{"Tax"}</h6>
        <SLabel>{"Rate"}</SLabel>
        <SField>{tax.rate}</SField>
        <SLabel>{"Included"}</SLabel>
        <SField>{capitalize(tax.included.toString())}</SField>
        <SLabel>{"Display"}</SLabel>
        <SField>{capitalize(tax.display.toString())}</SField>

        <SSeparator />

        <h6>{"Payment"}</h6>
        <SLabel>{"Currency"}</SLabel>
        <SField>{payment.currency}</SField>
        <SLabel>{"Address"}</SLabel>
        <SField>{payment.address}</SField>
        <SLabel>{"Methods"}</SLabel>
        <SField>{formatPaymentMethodsDisplay(payment.methods)}</SField>
      </SSettingsRight>
    </SSettingsWrapper>
  );
};

Settings.propTypes = {
  businessData: PropTypes.object.isRequired
};

const reduxProps = (store: any) => ({
  businessData: store.admin.businessData
});

export default connect(
  reduxProps,
  null
)(Settings);
