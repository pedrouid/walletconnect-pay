import * as React from "react";
import { connect } from "react-redux";
import { IMenuItem } from "../../helpers/types";
import ListItem from "../../components/ListItem";
import EmptyState from "../../components/EmptyState";
import { SColumnList } from "../../components/common";

const Inventory = (props: any) => {
  const { businessMenu, businessPayment } = props;
  return businessMenu && businessMenu.length ? (
    <SColumnList>
      {businessMenu.map((item: IMenuItem) => (
        <ListItem
          key={`inventory-${item.name}`}
          item={item}
          businessPayment={businessPayment}
        />
      ))}
    </SColumnList>
  ) : (
    <EmptyState message={`No Inventory`} />
  );
};

const reduxProps = (store: any) => ({
  businessMenu: store.admin.businessMenu,
  businessProfile: store.admin.businessProfile,
  businessTax: store.admin.businessTax,
  businessPayment: store.admin.businessPayment
});

export default connect(
  reduxProps,
  null
)(Inventory);
