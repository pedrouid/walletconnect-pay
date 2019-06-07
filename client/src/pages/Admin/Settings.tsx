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
import Input from "../../components/Input";

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
    const type = capitalize(method.type);
    const asset = method.assetSymbol.toUpperCase();
    result += `${type} (${asset}); `;
  });
  return result;
}

class Settings extends React.Component<any, any> {
  public static propTypes = {
    businessData: PropTypes.object.isRequired
  };

  public render() {
    const { profile, tax, payment } = this.props.businessData;
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
          <Input
            editMode
            type="text"
            label="Name"
            placeholder="Crypto Café"
            value={profile.name}
            onChange={(e: any) => {
              console.log("[onChange] e.target.value", e.target.value); // tslint:disable-line
              this.setState({ name: e.target.value });
            }}
            onSubmit={
              (value: string) => console.log("[onSubmit] value", value) // tslint:disable-line
            }
          />
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
  }
}

const reduxProps = (store: any) => ({
  businessData: store.admin.businessData
});

export default connect(
  reduxProps,
  null
)(Settings);
