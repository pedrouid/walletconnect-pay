import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Dashboard from "../../components/Dashboard";
import {
  getBusinessType,
  getCountryName,
  getIpfsUrl
} from "../../helpers/utilities";
import picture from "../../assets/picture.png";
import { SField, SLabel } from "../../components/common";

const SLogo = styled.div`
  width: 100%;
  & img {
    width: 100%;
    max-width: 150px;
  }
`;

const SBusinessDataWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
`;

const SBusinessDataSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SBusinessDataLeft = styled(SBusinessDataSection)`
  width: 300px;
`;
const SBusinessDataRight = styled(SBusinessDataSection)`
  width: 100%;
`;

class Admin extends React.Component<any, any> {
  public static propTypes = {
    businessData: PropTypes.object.isRequired
  };

  public render() {
    const { profile } = this.props.businessData;
    return (
      <Dashboard>
        <SBusinessDataWrapper>
          <SBusinessDataLeft>
            <SLogo>
              <img
                src={getIpfsUrl(profile.logo)}
                alt={profile.name}
                onError={(event: any) => (event.target.src = picture)}
              />
            </SLogo>
          </SBusinessDataLeft>
          <SBusinessDataRight>
            <h6>{"Business Details"}</h6>
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
          </SBusinessDataRight>
        </SBusinessDataWrapper>
      </Dashboard>
    );
  }
}

const reduxProps = (store: any) => ({
  businessData: store.admin.businessData
});

export default connect(
  reduxProps,
  null
)(Admin);
