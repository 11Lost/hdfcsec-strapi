export interface StrapiImage {
  url: string;
  alternativeText?: string;
  mime?: string;
  width?: number;
  height?: number;
}

export interface StrapiButton {
  label: string;
  link?: string;
  url?: string;
  target?: string;
  functionName?: string;
}

export interface BannerItem {
  bannerContent?: string;
  BannerImg?: StrapiImage;
  BannerBtn?: StrapiButton;
}

export interface Banner {
  Banneritems?: BannerItem[];
}

export interface WaysToInvestDetail {
  title?: string;
  detailsBanner?: Banner;
}

export interface WaysToInvestSection {
  WaysToInvestSectionBanner?: Banner;
  WaysToInvestDetail?: WaysToInvestDetail;
  bottombanner?: BannerItem;
}

export interface StockGraphStory {
  Header?: string;
  disclaimer?: string;
}

export interface Product {
  title: string;
  Img?: StrapiImage;
}

export interface OurProduct {
  title?: string;
  our_products?: Product[];
}

export interface StockCalendar {
  Title?: string;
}

export interface ReportStock {
  Name: string;
}

export interface Report {
  title: string;
  description?: string;
  banner?: StrapiImage;
  stocks?: ReportStock[];
}

export interface ExpectResult {
  title?: string;
  reports?: Report[];
}

export interface QuestionAndAnswer {
  Question: string;
  createdAt: string;
}

export interface LearningCourse {
  Title: string;
  Description?: string;
  question_and_answers?: QuestionAndAnswer[];
}

export interface LearningCourses {
  learning_courses?: LearningCourse[];
}

export interface CountItem {
  title: string;
  Count: string;
}

export interface CountSection {
  counts?: CountItem[];
}

export interface HomeBanner {
  Banneritems?: BannerItem[];
}

export interface HomePageData {
  HomeBanner?: HomeBanner;
  WaysToInvestSection?: WaysToInvestSection;
  stockGraphStory?: StockGraphStory;
  ourProduct?: OurProduct;
  StockCalendar?: StockCalendar;
  expectResult?: ExpectResult;
  LearningCourses?: LearningCourses;
  CountSection?: CountSection;
}
