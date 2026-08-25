export interface StockDetail {
  Name?: string;
  subTitle?: string;
  Tags?: { label: string }[];
  StockAdvice?: string;
  RiskOverview?: string;
  FandO?: string;
  CompanyOverview?: string;
  FAQ?: string;
  LNAME?: string;
  SYMBOL?: string;
  LTP?: number;
  CHANGE?: number;
  CHANGEPERCENTAGE?: number;
  LOWPRICE?: number;
  HIGHPRICE?: number;
  OPENPRICE?: number;
  PREVCLOSE?: number;
  VOLUME?: number;
  CO_CODE?: string;
}

export interface StockApiResponse {
  data: StockDetail;
}

export interface HeaderData {
  headerTop?: string;
  icon?: { iconImg?: { url: string } };
  menu?: HeaderMenu[];
  ctaButton?: { text?: string; link?: { url?: string } };
}

export interface HeaderMenu {
  title: string;
  subMenus?: HeaderSubMenu[];
}

export interface HeaderSubMenu {
  MenuLink?: HeaderMenuLink[];
  link?: string;
  title?: string;
}

export interface HeaderMenuLink {
  label: string;
  link?: string;
  target?: string;
}
