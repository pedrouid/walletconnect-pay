import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import styled from "styled-components";

import { colors } from "../styles";
import { IMenuItem, IOrderItem } from "../helpers/types";
import {
  orderLoadMenu,
  orderShowPaymentMethods,
  orderChoosePaymentMethod,
  orderAddItem,
  orderRemoveItem,
  orderSubmit,
  orderUnsubmit
} from "../redux/_order";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import Checkout from "../components/Checkout";
import Summary from "../components/Summary";
import Loader from "../components/Loader";
import ListItem from "../components/ListItem";
import {
  SColumnWrapper,
  SColumn,
  SColumnOrder,
  SColumnHeader,
  SColumnFooter,
  SColumnList,
  SColumnRow,
  STitle,
  SGrid
} from "../components/common";

const SHeader = styled.div`
  width: 100%;
  background-color: rgb(${colors.dark});
  color: rgb(${colors.white});
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 82px;
`;

const SBranding = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  margin: 4px 0px;
  margin-left: 10px;
`;

const SLogo = styled.img`
  border-radius: 6px;
  width: 40px;
  height: 40px;
`;

const SListItem = styled(ListItem)`
  margin-bottom: 10px;
`;

class Order extends React.Component<any, any> {
  public componentDidMount() {
    const businessName = this.props.match.params.businessName;
    if (businessName) {
      this.props.orderLoadMenu(businessName);
    }
  }

  public onSubmit = () => {
    if (this.props.paymentMethod) {
      this.props.orderSubmit();
    } else {
      this.props.orderShowPaymentMethods();
    }
  };

  public render() {
    const {
      businessData,
      businessMenu,
      paymentMethod,
      loading,
      submitted,
      items,
      checkout,
      payment,
      uri,
      orderId
    } = this.props;
    const ratio = 70;
    return !this.props.loading ? (
      <React.Fragment>
        <Helmet>
          <title>{businessData.profile.name}</title>
          <meta name="description" content={businessData.profile.description} />
          <link
            rel="shortcut icon"
            type="image/png"
            href={businessData.profile.logo}
            sizes="16x16"
          />
        </Helmet>
        <SHeader>
          {businessData.profile.logo && (
            <SLogo src={businessData.profile.logo} alt="" />
          )}
          <SBranding>{businessData.profile.name}</SBranding>
        </SHeader>
        <SColumnWrapper>
          <SColumn width={items.length ? ratio : 100}>
            <SColumnHeader>
              <STitle>{`Menu`}</STitle>
            </SColumnHeader>
            <SGrid itemMaxWidth={360} itemMaxHeight={150} gap={10}>
              {businessMenu &&
                businessMenu.map((item: IMenuItem) => (
                  <ListItem
                    key={`menu-${item.name}`}
                    item={item}
                    businessData={businessData}
                    onClick={() => this.props.orderAddItem(item)}
                  />
                ))}
            </SGrid>
          </SColumn>
          <SColumnOrder width={items.length ? 100 - ratio : 0}>
            <SColumnHeader>
              <STitle>{`Order`}</STitle>
            </SColumnHeader>
            <SColumnList>
              {items.map((item: IOrderItem) => (
                <SListItem
                  noImage
                  key={`order-${item.name}`}
                  item={item}
                  businessData={businessData}
                  actions={[
                    { label: "Remove", callback: this.props.orderRemoveItem },
                    { label: "Add", callback: this.props.orderAddItem }
                  ]}
                />
              ))}
            </SColumnList>
            <SColumnFooter>
              <Summary checkout={checkout} businessData={businessData} />
              <SColumnRow>
                <Button marginTop={12} onClick={this.onSubmit}>{`Pay`}</Button>
              </SColumnRow>
            </SColumnFooter>
          </SColumnOrder>

          <Checkout
            loading={loading}
            businessData={businessData}
            submitted={submitted}
            payment={payment}
            paymentMethod={paymentMethod}
            checkout={checkout}
            uri={uri}
            orderId={orderId}
            orderUnsubmit={this.props.orderUnsubmit}
          />
        </SColumnWrapper>
      </React.Fragment>
    ) : (
      <PageWrapper center>
        <Loader />
      </PageWrapper>
    );
  }
}

const reduxProps = (store: any) => ({
  businessData: store.order.businessData,
  businessMenu: store.order.businessMenu,
  paymentMethod: store.order.paymentMethod,
  loading: store.order.loading,
  submitted: store.order.submitted,
  items: store.order.items,
  checkout: store.order.checkout,
  uri: store.order.uri,
  orderId: store.order.orderId,
  payment: store.order.payment
});

export default connect(
  reduxProps,
  {
    orderLoadMenu,
    orderShowPaymentMethods,
    orderChoosePaymentMethod,
    orderAddItem,
    orderRemoveItem,
    orderSubmit,
    orderUnsubmit
  }
)(Order);
