import type { Schema, Struct } from '@strapi/strapi';

export interface FunctionalTagsButton extends Struct.ComponentSchema {
  collectionName: 'components_functional_tags_buttons';
  info: {
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    className: Schema.Attribute.String;
    functionName: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.Text;
    style: Schema.Attribute.JSON;
  };
}

export interface MainBanner extends Struct.ComponentSchema {
  collectionName: 'components_main_banners';
  info: {
    displayName: 'BannerItems';
  };
  attributes: {
    BannerBtn: Schema.Attribute.Component<'functional-tags.button', false>;
    bannerContent: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    BannerImg: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
  };
}

export interface MainCalendar extends Struct.ComponentSchema {
  collectionName: 'components_main_calendars';
  info: {
    displayName: 'Calendar';
    icon: 'calendar';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface MainCountCont extends Struct.ComponentSchema {
  collectionName: 'components_main_count_conts';
  info: {
    displayName: 'countCont';
  };
  attributes: {
    Count: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface MainCountSection extends Struct.ComponentSchema {
  collectionName: 'components_main_count_sections';
  info: {
    displayName: 'CountSection';
  };
  attributes: {
    counts: Schema.Attribute.Component<'main.count-cont', true>;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface MainExpectResult extends Struct.ComponentSchema {
  collectionName: 'components_main_expect_results';
  info: {
    displayName: 'ExpectResult';
  };
  attributes: {
    bottomBanner: Schema.Attribute.Component<'main.banner', false>;
    reports: Schema.Attribute.Relation<'oneToMany', 'api::report.report'>;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface MainHomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_main_home_banners';
  info: {
    displayName: 'BannerCont';
    icon: 'picture';
  };
  attributes: {
    Banneritems: Schema.Attribute.Component<'main.banner', true>;
    className: Schema.Attribute.String;
    style: Schema.Attribute.JSON;
  };
}

export interface MainIcon extends Struct.ComponentSchema {
  collectionName: 'components_main_icons';
  info: {
    displayName: 'Icon';
  };
  attributes: {
    className: Schema.Attribute.String;
    iconImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    iconTitla: Schema.Attribute.String;
  };
}

export interface MainLearningCourses extends Struct.ComponentSchema {
  collectionName: 'components_main_learning_courses';
  info: {
    displayName: 'LearningCourses';
    icon: 'chartPie';
  };
  attributes: {
    learning_courses: Schema.Attribute.Relation<
      'oneToMany',
      'api::learning-course.learning-course'
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface MainOurProduct extends Struct.ComponentSchema {
  collectionName: 'components_main_our_products';
  info: {
    displayName: 'OurProduct';
    icon: 'apps';
  };
  attributes: {
    our_products: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-product.our-product'
    >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface MainStockGraphStory extends Struct.ComponentSchema {
  collectionName: 'components_main_stock_graph_stories';
  info: {
    displayName: 'stockGraphStory';
    icon: 'chartBubble';
  };
  attributes: {
    ComponentName: Schema.Attribute.String;
    disclaimer: Schema.Attribute.Text;
    Header: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface MainWaysToInvestDetail extends Struct.ComponentSchema {
  collectionName: 'components_main_ways_to_invest_details';
  info: {
    displayName: 'WaysToInvestDetail';
  };
  attributes: {
    detailsBanner: Schema.Attribute.Component<'main.home-banner', false>;
    title: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface MainWaysToInvestSection extends Struct.ComponentSchema {
  collectionName: 'components_main_ways_to_invest_sections';
  info: {
    displayName: 'WaysToInvestSection';
  };
  attributes: {
    bottombanner: Schema.Attribute.Component<'main.banner', false>;
    WaysToInvestDetail: Schema.Attribute.Component<
      'main.ways-to-invest-detail',
      false
    >;
    WaysToInvestSectionBanner: Schema.Attribute.Component<
      'main.home-banner',
      false
    >;
  };
}

export interface MenusMenu extends Struct.ComponentSchema {
  collectionName: 'components_menus_menus';
  info: {
    displayName: 'menu';
  };
  attributes: {
    subMenus: Schema.Attribute.Component<'menus.sub-menus', true>;
    title: Schema.Attribute.String;
  };
}

export interface MenusMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menus_menu_links';
  info: {
    displayName: 'MenuLink';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    target: Schema.Attribute.String;
  };
}

export interface MenusSubMenus extends Struct.ComponentSchema {
  collectionName: 'components_menus_sub_menus';
  info: {
    displayName: 'subMenus';
    icon: 'bulletList';
  };
  attributes: {
    link: Schema.Attribute.String;
    MenuLink: Schema.Attribute.Component<'menus.menu-link', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'functional-tags.button': FunctionalTagsButton;
      'main.banner': MainBanner;
      'main.calendar': MainCalendar;
      'main.count-cont': MainCountCont;
      'main.count-section': MainCountSection;
      'main.expect-result': MainExpectResult;
      'main.home-banner': MainHomeBanner;
      'main.icon': MainIcon;
      'main.learning-courses': MainLearningCourses;
      'main.our-product': MainOurProduct;
      'main.stock-graph-story': MainStockGraphStory;
      'main.ways-to-invest-detail': MainWaysToInvestDetail;
      'main.ways-to-invest-section': MainWaysToInvestSection;
      'menus.menu': MenusMenu;
      'menus.menu-link': MenusMenuLink;
      'menus.sub-menus': MenusSubMenus;
    }
  }
}
