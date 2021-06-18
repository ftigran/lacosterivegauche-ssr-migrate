/*
import { useEffect } from "react";
import ReactGA from "react-ga";
import PropTypes from "prop-types";
import { Location, LocationListener } from "history";
import { useHistory } from "react-router-dom";
import { type } from "os";

interface PropsGAListener {
  children: JSX.Element;
  trackingId?: string;
}
const sendPageView: LocationListener = (location: Location): void => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
  console.debug("GA|Pageview Sent: ", location.pathname);
};
const GAListener = ({ children, trackingId }: PropsGAListener): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    if (!!trackingId && !!trackingId.trim().length) {
      ReactGA.initialize(trackingId);
      sendPageView(history.location, "REPLACE");
      return history.listen(sendPageView);
    }
  }, [history, trackingId]);

  return children;
};

GAListener.propTypes = {
  children: PropTypes.node,
  trackingId: PropTypes.string,
  history: PropTypes.shape({
    listen: PropTypes.func,
  }),
};

interface GaEvent extends ReactGA.EventArgs {
  category: CATEGORY;
  action: ACTION;
}

export function gaEvent(
  category: CATEGORY,
  action: ACTION,
  label?: string,
  value?: number
): void {
  ReactGA.event({ category, action, label, value });
}




event: "GAEvent",
                    eventCategory: "Pageview",
                    eventAction: "open_page",
                    eventLabel: pathname
export default GAListener;
*/

export interface GaEventProps {
  event?: 'GAEvent';
  eventCategory: CATEGORY;
  eventAction: ACTION;
  eventLabel?: string;
  eventContext?: string;
  eventError?: string;
}
export enum CATEGORY {
  Registration = 'Registration',
  Authorization = 'Authorization',
  Pageview = 'Pageview',
  Check = 'Check',
  Retail = 'Retail',
  ExternalReference = 'ExternalReference',
  MaskInstagram = 'Mask_instagram',
  InteractionDoc = 'InteractionDoc',
  StartPage = 'start_page',
  WhereToBuy = 'Where_to_buy',
  Products = 'Products',
  Ideas = 'Ideas',
  InvoiceReg = 'Invoice_Reg',
  Game = 'Game',
  BtnClick = "BtnClick",
  Qr = 'Qr',
  Cash_fee = 'Cash_fee',
}

export enum ACTION {
  send_r_form = 'send_r_form',
  open_r_form = 'open_r_form',
  open_page = 'open_page',
  leave_registartion = 'leave_registartion',
  over_social_r = 'over_social_r',
  open_a_form = 'open_a_form',
  send_a_form = 'send_a_form',
  over_social_a = 'over_social_a',
  click_button = 'click_button',
  download_check = 'download_check',
  register_check = 'register_check',
  choose_retail = 'choose_retail',
  sharesn = 'sharesn',
  click_mask_button = 'click_mask_button',
  rules = 'rules',
  agreement = 'agreement',
  button_site = 'button_site',
  button_whatsapp = 'button_whatsapp',
  open_reg_form = 'open_reg_form',
  reg_success = 'reg_success',
  click_menu = 'click_menu',
  click_more = 'click_more',
  click_main = 'click_main',
  click_lk = 'click_lk',
  click_url = 'click_url',
  open_game = 'open_game',
  start_game = 'start_game',
  finish_game = 'finish_game',
  receive_on_phone = 'receive_on_phone',
  tree_charity = 'tree_charity',
  camera_download = 'camera_download',
  mainPage = "main_page",
  regWidget = "reg_widget"
}

export const ga: {
  send: {
    (
      eventCategory: CATEGORY,
      eventAction: ACTION,
      eventLabel?: string,
      eventContext?: string,
      eventError?: string,
    ): void;
  };
} = {
  send(eventCategory, eventAction, eventLabel, eventContext, eventError) {
    const p: GaEventProps = {
      event: 'GAEvent',
      eventCategory,
      eventAction,
    };

    Object.assign(p, {
      eventLabel: eventLabel,
      eventContext: eventContext,
      eventError: eventError,
    });

    window.dataLayer.push(p);
  },
};
// dataLayer.push({
//   event: "GAEvent",
//   eventCategory: "Pageview",
//   eventAction: "open_page",
//   eventLabel: pathname
// });
