import {
  IBusinessData,
  IBusinessProfile,
  IBusinessSettings,
  IBusinessMenu
} from "../helpers/types";
import { openBox, openSpace, setSpacePrivate, getSpacePrivate } from "./box";
import { BUSINESS_DATA, BUSINESS_MENU } from "../constants/space";

import demo from "../demo";

export function getDemoBusiness(bussinessName?: string) {
  let result = demo[Object.keys(demo)[0]];
  if (bussinessName && demo[bussinessName]) {
    result = demo[bussinessName];
  }
  return result;
}

export const defaultBusinessProfile: IBusinessProfile = {
  id: "",
  name: "",
  description: "",
  logo: "",
  type: "cafe",
  country: "DE",
  email: "",
  phone: ""
};

export const defaultBusinessSettings: IBusinessSettings = {
  taxRate: 20,
  taxIncluded: true,
  taxDisplay: true,
  paymentCurrency: "USD",
  paymentAddress: "",
  paymentMethods: [
    {
      type: "walletconnect",
      chainId: 1,
      assetSymbol: "DAI"
    }
  ]
};

export const defaultBusinessData: IBusinessData = {
  profile: defaultBusinessProfile,
  settings: defaultBusinessSettings
};

export function formatBusinessData(
  partialBusinessData: Partial<IBusinessData>
): IBusinessData {
  const profile = {
    ...defaultBusinessProfile,
    ...partialBusinessData.profile
  };

  const settings = {
    ...defaultBusinessSettings,
    ...partialBusinessData.settings
  };

  const businessData: IBusinessData = { profile, settings };

  return businessData;
}

export async function setBusinessData(
  partialBusinessData: Partial<IBusinessData>
): Promise<IBusinessData> {
  const businessData = formatBusinessData(partialBusinessData);
  await setSpacePrivate(BUSINESS_DATA, businessData);
  return businessData;
}

export async function getBusinessData(): Promise<IBusinessData> {
  const businessData = await getSpacePrivate(BUSINESS_DATA);
  return businessData;
}

export async function setBusinessMenu(
  businessMenu: IBusinessMenu
): Promise<IBusinessMenu> {
  await setSpacePrivate(BUSINESS_MENU, businessMenu);
  return businessMenu;
}

export async function getBusinessMenu(): Promise<IBusinessMenu> {
  const businessMenu = await getSpacePrivate(BUSINESS_MENU);
  return businessMenu;
}

export async function openBusinessBox(
  address: string,
  provider: any
): Promise<{ data: IBusinessData | null; menu: IBusinessMenu | null }> {
  await openBox(address, provider);

  await openSpace();

  const data = await getBusinessData();
  const menu = await getBusinessMenu();

  return { data, menu };
}
