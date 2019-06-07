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
import { IPaymentMethod } from "../../helpers/types";
import picture from "../../assets/picture.png";
import { SField, SLabel, SSeparator } from "../../components/common";
import Input from "../../components/Input";
import {
  adminUpdateBusinessProfile,
  adminUpdateBusinessTax,
  adminUpdateBusinessPayment
} from "../../redux/_admin";

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
    businessProfile: PropTypes.object.isRequired,
    businessTax: PropTypes.object.isRequired,
    businessPayment: PropTypes.object.isRequired
  };

  public render() {
    const { businessProfile, businessTax, businessPayment } = this.props;
    return (
      <SSettingsWrapper>
        <SSettingsLeft>
          <SLogo>
            <img
              src={getIpfsUrl(businessProfile.logo)}
              alt={businessProfile.name}
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
            value={businessProfile.name}
            onChange={(e: any) =>
              this.props.adminUpdateBusinessProfile({ name: e.target.value })
            }
            onSubmit={
              (value: string) => console.log("[onSubmit] value", value) // tslint:disable-line
            }
          />
          <SLabel>{"Name"}</SLabel>
          <SField>{businessProfile.name}</SField>
          <SLabel>{"Description"}</SLabel>
          <SField>{businessProfile.description}</SField>
          <SLabel>{"Type"}</SLabel>
          <SField>{getBusinessType(businessProfile.type)}</SField>
          <SLabel>{"Country"}</SLabel>
          <SField>{getCountryName(businessProfile.country)}</SField>
          <SLabel>{"Email"}</SLabel>
          <SField>{businessProfile.email}</SField>
          <SLabel>{"Phone"}</SLabel>
          <SField>{businessProfile.phone}</SField>

          <SSeparator />

          <h6>{"Tax"}</h6>
          <SLabel>{"Rate"}</SLabel>
          <SField>{businessTax.rate}</SField>
          <SLabel>{"Included"}</SLabel>
          <SField>{capitalize(businessTax.included.toString())}</SField>
          <SLabel>{"Display"}</SLabel>
          <SField>{capitalize(businessTax.display.toString())}</SField>

          <SSeparator />

          <h6>{"Payment"}</h6>
          <SLabel>{"Currency"}</SLabel>
          <SField>{businessPayment.currency}</SField>
          <SLabel>{"Address"}</SLabel>
          <SField>{businessPayment.address}</SField>
          <SLabel>{"Methods"}</SLabel>
          <SField>
            {formatPaymentMethodsDisplay(businessPayment.methods)}
          </SField>
        </SSettingsRight>
      </SSettingsWrapper>
    );
  }
}

const reduxProps = (store: any) => ({
  businessProfile: store.admin.businessProfile,
  businessTax: store.admin.businessTax,
  businessPayment: store.admin.businessPayment
});

export default connect(
  reduxProps,
  {
    adminUpdateBusinessProfile,
    adminUpdateBusinessTax,
    adminUpdateBusinessPayment
  }
)(Settings);
