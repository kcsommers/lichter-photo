export const Galleries = {
  LIMITED_EDITION: 'G0000BLnFwimsp4o'
};

// View all tag should always be last
export const GalleryFilters = {
  default: {
    filters: [
      {
        name: 'View All',
        keyword: ''
      },
      {
        name: 'Top Picks',
        keyword: 'showcase'
      },
      {
        name: 'Featured',
        keyword: 'featured'
      }
    ],
    keywords: [
      'showcase',
      'featured'
    ]
  },
  [Galleries.LIMITED_EDITION]: {
    filters: [
      {
        name: 'View All',
        keyword: ''
      },
      {
        name: 'Most Popular',
        keyword: 'Popular'
      },
      {
        name: 'Black & White',
        keyword: 'BW'
      },
      {
        name: '1970s',
        keyword: '1970s'
      },
      {
        name: '1980s',
        keyword: '1980s'
      },
      {
        name: '1990s',
        keyword: '1990s'
      },
      {
        name: '2000s',
        keyword: '2000s'
      },
      {
        name: '2010s',
        keyword: '2010s'
      },
      {
        name: 'Sturgis',
        keyword: 'Sturgis'
      },
      {
        name: 'Riding',
        keyword: 'Riding'
      },
      {
        name: 'Competition',
        keyword: 'Competition'
      },
      {
        name: 'Classic Bikes',
        keyword: 'Antique'
      },
      {
        name: 'Decorative',
        keyword: 'Decorative'
      },
      {
        name: 'Naked Truth Exhibition',
        keyword: 'maa15'
      },
      {
        name: 'Heavy Mettle Exhibition',
        keyword: 'maa20'
      }
    ],
    keywords: [
      'Popular',
      'BW',
      '1970s',
      '1980s',
      '1990s',
      '2000s',
      '2010s',
      'Sturgis',
      'Riding',
      'Competition',
      'Antique',
      'Decorative',
      'maa15',
      'maa20'
    ]
  }
};
