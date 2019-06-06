import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { colors, shadows } from "../styles";
import { SField, SLabel } from "../components/common";
import { sanitizeUrl, formatDisplayAmount } from "../helpers/utilities";
import { APP_LOGO, APP_NAME } from "../constants/appMeta";

import overview from "../assets/navigation/overview.svg";
import inventory from "../assets/navigation/inventory.svg";
import orders from "../assets/navigation/orders.svg";
import accounting from "../assets/navigation/accounting.svg";
import settings from "../assets/navigation/settings.svg";

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
  display: flex;
`;

const SHeader = styled(SSection)`
  justify-content: center;
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
  align-items: center;
  z-index: 0;
  width: ${SIDEBAR_SIZE}px;
  height: 100vh;
  background: rgb(${colors.darkBlue});
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
  overflow: hidden;
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

const SAppLogo = styled.div`
  width: 100%;
  margin: 35px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 100%;
    max-width: 75px;
  }
`;

interface INavigationItem {
  name: string;
  path: string;
  icon: string;
}

const navigation: INavigationItem[] = [
  {
    name: "Overview",
    path: "/",
    icon: overview
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: inventory
  },
  {
    name: "Orders",
    path: "/orders",
    icon: orders
  },
  {
    name: "Accounting",
    path: "/accounting",
    icon: accounting
  },
  {
    name: "Settings",
    path: "/settings",
    icon: settings
  }
];

const SNavigation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SNavigationItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SNavigationIcon = styled(Icon)`
  margin-right: 16px;
`;

interface INavigatioNameStyleProps {
  active?: boolean;
}
const SNavigationName = styled.h6<INavigatioNameStyleProps>`
  color: ${({ active }) =>
    active ? `rgb(${colors.lightBlue})` : `rgb(${colors.white})`};
`;

const Dashboard = (props: any) => {
  const balance = 35245;
  const currency = "USD";
  return (
    <SWrapper>
      <SSidebar>
        <SAppLogo>
          <img src={APP_LOGO} alt={APP_NAME} />
        </SAppLogo>
        <SNavigation>
          {navigation.map(item => {
            const pathname = sanitizeUrl(`${props.match.url}${item.path}`);
            const current =
              typeof window !== "undefined"
                ? sanitizeUrl(window.location.pathname)
                : "";
            const active = current === pathname;
            return (
              <Link
                key={pathname}
                style={{ width: "100%", paddingLeft: 35 }}
                to={pathname}
              >
                <SNavigationItem>
                  <SNavigationIcon
                    icon={item.icon}
                    size={25}
                    color={active ? "lightBlue" : "white"}
                  />
                  <SNavigationName active={active}>{item.name}</SNavigationName>
                </SNavigationItem>
              </Link>
            );
          })}
        </SNavigation>
      </SSidebar>
      <SHeader>
        <SHeaderLeft>
          <SBalanceLabel>{"Available Balance"}</SBalanceLabel>
          <SBalanceAmount>
            {formatDisplayAmount(balance, currency)}
          </SBalanceAmount>
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
};

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.object.isRequired,
  center: PropTypes.bool,
  maxWidth: PropTypes.number
};

Dashboard.defaultProps = {
  center: false,
  maxWidth: undefined
};

export default Dashboard;
