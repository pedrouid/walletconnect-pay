import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { colors, shadows } from "../styles";
import { SField, SLabel } from "./common";

const SIDEBAR_SIZE = 240;
const HEADER_SIZE = 100;
const CONTENT_PADDING = 20;

const SWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
`;

const SSection = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  padding: ${CONTENT_PADDING}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SHeader = styled(SSection)`
  width: 100%;
  z-index: 2;
  width: calc(100% - ${SIDEBAR_SIZE}px);
  padding: ${CONTENT_PADDING}px ${CONTENT_PADDING * 2}px;
  margin-left: ${SIDEBAR_SIZE}px;
  height: ${HEADER_SIZE}px;
  background: rgb(${colors.white});
  color: rgb(${colors.dark});
  box-shadow: ${shadows.soft};
`;

const SSidebar = styled(SSection)`
  flex-direction: column;
  z-index: 0;
  width: ${SIDEBAR_SIZE}px;
  height: 100vh;
  background: rgb(${colors.dark});
  color: rgb(${colors.white});
`;

const SContent = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - ${HEADER_SIZE}px);
  z-index: 1;
  padding: ${CONTENT_PADDING}px;
  margin-top: ${HEADER_SIZE}px;
  margin-left: ${SIDEBAR_SIZE}px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const SContentCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: ${CONTENT_PADDING * 2}px ${CONTENT_PADDING}px;
  box-shadow: ${shadows.soft};
  background: rgb(${colors.white});
  color: rgb(${colors.dark});
`;

const SHeaderSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SHeaderLeft = styled(SHeaderSection)`
  align-items: flex-start;
`;

const SBalanceLabel = styled(SLabel)`
  margin-top: 0;
`;

const SBalanceAmount = styled(SField)`
  margin: 0;
  margin-top: 6px;
`;

const SHeaderRight = styled(SHeaderSection)`
  align-items: flex-end;
`;

const SMenuButton = styled(Button)`
  font-size: 16px;
`;

interface IDashboardProps {
  children: React.ReactNode;
}

const Dashboard = (props: IDashboardProps) => (
  <SWrapper>
    <SSidebar />
    <SHeader>
      <SHeaderLeft>
        <SBalanceLabel>{"Available Balance"}</SBalanceLabel>
        <SBalanceAmount>{"$ 35,245.00"}</SBalanceAmount>
      </SHeaderLeft>
      <SHeaderRight>
        <Link to="/order/bufficorn">
          <SMenuButton>{"Go To Menu"}</SMenuButton>
        </Link>
      </SHeaderRight>
    </SHeader>
    <SContent>
      <SContentCard>{props.children}</SContentCard>
    </SContent>
  </SWrapper>
);

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
  maxWidth: PropTypes.number
};

Dashboard.defaultProps = {
  center: false,
  maxWidth: undefined
};

export default Dashboard;
