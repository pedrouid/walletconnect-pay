import {
  IBusinessData,
  IBusinessProfile,
  IBusinessSettings,
  IBusinessMenu
} from "../helpers/types";
import {
  defaultBusinessProfile,
  defaultBusinessSettings
} from "../helpers/business";

// -- Constants ------------------------------------------------------------- //

const DEMO_LOAD_DEMO = "demo/DEMO_LOAD_DEMO";

const DEMO_UPDATE_BUSINESS_PROFILE = "demo/DEMO_UPDATE_BUSINESS_PROFILE";

const DEMO_UPDATE_BUSINESS_SETTINGS = "demo/DEMO_UPDATE_BUSINESS_SETTINGS";

const DEMO_UPDATE_BUSINESS_MENU = "demo/DEMO_UPDATE_BUSINESS_MENU";

const DEMO_CLEAR_STATE = "demo/DEMO_CLEAR_STATE";

// -- Actions --------------------------------------------------------------- //

export const demoLoadDemo = (demo: {
  data: IBusinessData;
  menu: IBusinessMenu;
}) => ({
  type: DEMO_LOAD_DEMO,
  payload: {
    profile: demo.data.profile,
    settings: demo.data.settings,
    menu: demo.menu
  }
});

export const demoUpdateBusinessProfile = (
  businessProfile: IBusinessProfile
) => ({
  type: DEMO_UPDATE_BUSINESS_PROFILE,
  payload: businessProfile
});

export const demoUpdateBusinessSettings = (
  businessSettings: IBusinessSettings
) => ({
  type: DEMO_UPDATE_BUSINESS_SETTINGS,
  payload: businessSettings
});

export const demoUpdateBusinessMenu = (businessMenu: IBusinessMenu) => ({
  type: DEMO_UPDATE_BUSINESS_MENU,
  payload: businessMenu
});

export const demoClearState = () => ({ type: DEMO_CLEAR_STATE });

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  businessMenu: [],
  businessProfile: defaultBusinessProfile,
  businessSettings: defaultBusinessSettings
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case DEMO_LOAD_DEMO:
      return {
        ...state,
        businessProfile: action.payload.profile,
        businessSettings: action.payload.settings,
        businessMenu: action.payload.menu
      };
    case DEMO_UPDATE_BUSINESS_PROFILE:
      return { ...state, businessProfile: action.payload };
    case DEMO_UPDATE_BUSINESS_SETTINGS:
      return { ...state, businessSettings: action.payload };
    case DEMO_UPDATE_BUSINESS_MENU:
      return { ...state, businessMenu: action.payload };
    case DEMO_CLEAR_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
