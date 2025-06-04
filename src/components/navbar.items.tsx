import { ChooseDate, Payment, PermitCheck, Postcode, SelectSkip, WasteType } from "../icons";
import SkipSizePage from "../pages/skip.size.page";
export const navbarItems = [
  {
    id: "postcode",
    icon: Postcode,
    text: "navbar_itme_postcode",
    page: null,
  },
  {
    id: "waste-type",
    icon: WasteType,
    text: "navbar_itme_waste_type",
    page: null,
  },
  {
    id: "select-skip",
    icon: SelectSkip,
    text: "navbar_itme_select_skip",
    page: SkipSizePage,
  },
  {
    id: "permit-check",
    icon: PermitCheck,
    text: "navbar_itme_permit_check",
    page: null,
  },
  {
    id: "choose-date",
    icon: ChooseDate,
    text: "navbar_itme_choose_date",
    page: null,
  },
  {
    id: "payment",
    icon: Payment,
    text: "navbar_itme_payment",
    page: null,
  },
];
