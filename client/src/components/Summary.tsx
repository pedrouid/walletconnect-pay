import * as React from "react";

import { SColumnRowTitle, SColumnRow } from "../components/common";
import { formatDisplayAmount } from "../helpers/utilities";

const Summary = (props: any) => {
  const { checkout, businessSettings } = props;
  return (
    <React.Fragment>
      <SColumnRow>
        <SColumnRowTitle>{`Summary`}</SColumnRowTitle>
      </SColumnRow>
      {businessSettings.taxDisplay ? (
        <React.Fragment>
          <SColumnRow>
            <div>{`Sub Total`}</div>
            <div>
              {formatDisplayAmount(
                checkout.subtotal,
                businessSettings.paymentCurrency
              )}
            </div>
          </SColumnRow>
          <SColumnRow>
            <div>{`Tax`}</div>
            <div>
              {formatDisplayAmount(
                checkout.tax,
                businessSettings.paymentCurrency
              )}
            </div>
          </SColumnRow>
          <SColumnRow>
            <div>{`Net Total`}</div>
            <div>
              {formatDisplayAmount(
                checkout.nettotal,
                businessSettings.paymentCurrency
              )}
            </div>
          </SColumnRow>
        </React.Fragment>
      ) : (
        <SColumnRow>
          <div>{`Total`}</div>
          <div>
            {formatDisplayAmount(
              checkout.rawtotal,
              businessSettings.paymentCurrency
            )}
          </div>
        </SColumnRow>
      )}
    </React.Fragment>
  );
};

export default Summary;
