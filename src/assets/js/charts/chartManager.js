import * as echarts from 'echarts';
import { initResourcesByFundingType } from './resourcesByFundingType';
import { initTrendsInResources } from './trendsInResources';
import { initContributionByDonorCategory } from './contributionByDonorCategory';
import { initContributionsByDonorResource } from './contributionsByDonorResource';
import { initResourcesByFundingChannel } from './resourcesByFundingChannel';
import { initRegularResourcesAllocation } from './regularResourcesAllocation';
import { initResourcesByDevelopmentStatus } from './resourcesByDevelopmentStatus';
import { initResourcesByCountryTypology } from './resourcesByCountryTypology';
import { initResourcesByRegion } from './resourcesByRegion';
import { initInstitutionalBudgetAllocation } from './institutionalBudgetAllocation';
import { initTopCoreContributors } from './topCoreContributors';
import { initMultiYearPledges } from './multiYearPledges';
import { initTopGlocContributors } from './topGlocContributors';
import { initOtherResourcesPlaceholder } from './otherResourcesPlaceholder';
import { initTopOtherResourcesContributors } from './topOtherResourcesContributors';
import { initThematicWindowContributions } from './thematicWindowContributions';
import { initFundingWindowContributorFlow } from './fundingWindowContributorFlow';
import { initTopPooledFundMemberStates } from './topPooledFundMemberStates';
import { initPooledFundContributions } from './pooledFundContributions';
import { initTopUnPooledFunds } from './topUnPooledFunds';
import { initGovernmentFinancingByCountry } from './governmentFinancingByCountry';
import { initGovernmentFinancingByRegion } from './governmentFinancingByRegion';
import { initVerticalFundContributions } from './verticalFundContributions';
import { initEuContributionsByRegion } from './euContributionsByRegion';
import { initIfiContributionsDonut } from './ifiContributionsDonut';
import { initIfiContributionsByType } from './ifiContributionsByType';
import { initTopIfiRecipientCountries } from './topIfiRecipientCountries';
import { initTopPrivateSectorContributors } from './topPrivateSectorContributors';
import { initPrivateSectorContributionsByType } from './privateSectorContributionsByType';

const registry = {
  'resources-by-funding-type': initResourcesByFundingType,
  'trends-in-resources': initTrendsInResources,
  'contribution-by-donor-category': initContributionByDonorCategory,
  'contributions-by-donor-resource': initContributionsByDonorResource,
  'resources-by-funding-channel': initResourcesByFundingChannel,
  'regular-resources-allocation': initRegularResourcesAllocation,
  'resources-by-development-status': initResourcesByDevelopmentStatus,
  'resources-by-country-typology': initResourcesByCountryTypology,
  'resources-by-region': initResourcesByRegion,
  'institutional-budget-allocation': initInstitutionalBudgetAllocation,
  'top-core-contributors': initTopCoreContributors,
  'multi-year-pledges': initMultiYearPledges,
  'top-gloc-contributors': initTopGlocContributors,
  topGlocContributors: initTopGlocContributors,
  'other-resources-placeholder': initOtherResourcesPlaceholder,
  'top-other-resources-contributors': initTopOtherResourcesContributors,
  'thematic-window-contributions': initThematicWindowContributions,
  'funding-window-contributor-flow': initFundingWindowContributorFlow,
  'top-pooled-fund-member-states': initTopPooledFundMemberStates,
  'pooled-fund-contributions': initPooledFundContributions,
  'top-un-pooled-funds': initTopUnPooledFunds,
  'government-financing-by-country': initGovernmentFinancingByCountry,
  'government-financing-by-region': initGovernmentFinancingByRegion,
  'vertical-fund-contributions': initVerticalFundContributions,
  'eu-contributions-by-region': initEuContributionsByRegion,
  'ifi-contributions-donut': initIfiContributionsDonut,
  'ifi-contributions-by-type': initIfiContributionsByType,
  'top-ifi-recipient-countries': initTopIfiRecipientCountries,
  'top-private-sector-contributors': initTopPrivateSectorContributors,
  'private-sector-contributions-by-type': initPrivateSectorContributionsByType
};

const horizontallyScrollableCharts = new Set([
  'contribution-by-donor-category',
  'contributions-by-donor-resource',
  'resources-by-region',
  'top-core-contributors',
  'multi-year-pledges',
  'top-gloc-contributors',
  'top-other-resources-contributors'
]);

function addLocalChartScroller(el, type) {
  if (!horizontallyScrollableCharts.has(type) || el.parentElement?.classList.contains('responsive-chart-scroll')) return;

  const scroller = document.createElement('div');
  scroller.className = 'responsive-chart-scroll';
  scroller.dataset.chartScrollType = type;
  scroller.setAttribute('role', 'region');
  scroller.setAttribute('aria-label', 'Scrollable chart');
  scroller.tabIndex = 0;
  el.parentNode.insertBefore(scroller, el);
  scroller.appendChild(el);
}

function addResponsiveChartOptions(chart, type) {
  if (!chart || typeof chart.getOption !== 'function') return;

  const current = chart.getOption();
  const hasLegend = Array.isArray(current.legend) && current.legend.length > 0;
  const preserveScrollableLayout = horizontallyScrollableCharts.has(type);
  const preserveFixedLegend = type === 'government-financing-by-region';
  const compactLegend = hasLegend && !preserveScrollableLayout && !preserveFixedLegend ? {
    show: true,
    type: 'scroll',
    orient: 'horizontal',
    left: 'center',
    right: 'auto',
    top: 'auto',
    bottom: 4,
    width: '88%',
    itemWidth: 18,
    itemHeight: 7,
    itemGap: 12,
    pageIconSize: 10,
    textStyle: { fontSize: 10 }
  } : null;

  const tablet = {};
  const mobile = {};
  const hasTooltip = Array.isArray(current.tooltip) && current.tooltip.length > 0;
  if (hasTooltip) {
    tablet.tooltip = { confine: true };
    mobile.tooltip = { confine: true };
  }
  if (compactLegend) {
    tablet.legend = compactLegend;
    mobile.legend = compactLegend;
  }

  if (type === 'top-ifi-recipient-countries') {
    tablet.legend = {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      textStyle: { fontSize: 13 }
    };
    mobile.legend = {
      bottom: 4,
      left: 'center',
      icon: 'rect',
      itemWidth: 22,
      itemHeight: 8,
      itemGap: 16,
      textStyle: { fontSize: 12 }
    };
    mobile.grid = { left: 110, right: 44, top: 8, bottom: 70 };
    mobile.xAxis = {
      interval: 40,
      axisLabel: { fontSize: 10, margin: 7 }
    };
    mobile.yAxis = {
      axisLabel: {
        width: 98,
        margin: 8,
        fontSize: 10,
        lineHeight: 12,
        overflow: 'break'
      }
    };
    mobile.series = [
      { barWidth: 14 },
      { barWidth: 14 },
      { barWidth: 14, label: { distance: 4, fontSize: 10 } }
    ];
  }

  if (type === 'ifi-contributions-by-type') {
    const totalLegendItem = {
      name: 'Total',
      icon: 'path://M0,3 L24,3 L24,5 L0,5 Z',
      itemStyle: { color: '#1C1C1C', borderColor: '#1C1C1C', borderWidth: 0 }
    };
    const ifiLegendRows = (itemWidth, itemHeight, itemGap, fontSize) => [
      {
        bottom: 31,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Indirect government financing', 'Direct contribution']
      },
      {
        bottom: 5,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: [totalLegendItem]
      }
    ];
    tablet.legend = ifiLegendRows(24, 8, 20, 13);
    mobile.legend = [
      { bottom: 32, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, textStyle: { fontSize: 12 }, data: ['Indirect government financing'] },
      { bottom: 5, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 18, textStyle: { fontSize: 12 }, data: ['Direct contribution', totalLegendItem] }
    ];
    mobile.grid = { left: 10, right: 10, top: 24, bottom: 92, containLabel: true };
    mobile.xAxis = { axisLabel: { fontSize: 11, margin: 9 } };
    mobile.yAxis = { axisLabel: { fontSize: 10, margin: 6 } };
    mobile.series = [
      { barWidth: 34, label: { fontSize: 10 } },
      { barWidth: 34, label: { fontSize: 10 } },
      { symbolSize: 5, label: { fontSize: 11, distance: 6 } }
    ];
  }

  if (type === 'private-sector-contributions-by-type') {
    const totalLegendItem = {
      name: 'Total',
      icon: 'path://M0,3 L24,3 L24,5 L0,5 Z',
      itemStyle: { color: '#253746', borderColor: '#253746', borderWidth: 0 }
    };
    const legendRows = (itemWidth, itemHeight, itemGap, fontSize) => [
      {
        bottom: 31,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Private companies', 'Foundations', 'NGOs']
      },
      {
        bottom: 5,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Academic, training & research institutions', totalLegendItem]
      }
    ];

    tablet.legend = legendRows(24, 8, 22, 13);
    mobile.legend = [
      { bottom: 57, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 16, textStyle: { fontSize: 12 }, data: ['Private companies', 'Foundations'] },
      { bottom: 31, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 16, textStyle: { fontSize: 12 }, data: ['NGOs', totalLegendItem] },
      { bottom: 5, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, textStyle: { fontSize: 12 }, data: ['Academic, training & research institutions'] }
    ];
    mobile.grid = { left: 10, right: 10, top: 26, bottom: 118, containLabel: true };
    mobile.xAxis = { axisLabel: { fontSize: 11, margin: 9 } };
    mobile.yAxis = { axisLabel: { fontSize: 10, margin: 6 } };
    mobile.series = [
      { barWidth: 34, label: { fontSize: 10 } },
      { barWidth: 34, label: { fontSize: 10 } },
      { barWidth: 34, label: { fontSize: 10 } },
      { barWidth: 34 },
      { symbolSize: 5, label: { fontSize: 11, distance: 6 } }
    ];
  }

  if (type === 'eu-contributions-by-region') {
    const totalLegendItem = {
      name: 'Total',
      icon: 'path://M0,3 L24,3 L24,5 L0,5 Z',
      itemStyle: { color: '#1C1C1C', borderColor: '#1C1C1C', borderWidth: 0 }
    };
    const legendRows = (itemWidth, itemHeight, itemGap, fontSize) => [
      {
        bottom: 31,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Europe and the CIS', 'Arab States', 'Africa']
      },
      {
        bottom: 5,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Asia and the Pacific', 'Latin America and the Caribbean', 'Global', totalLegendItem]
      }
    ];

    tablet.legend = legendRows(24, 8, 16, 13);
    mobile.legend = [
      { bottom: 57, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, textStyle: { fontSize: 12 }, data: ['Europe and the CIS', 'Arab States', 'Africa'] },
      { bottom: 31, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 14, textStyle: { fontSize: 12 }, data: ['Asia and the Pacific', 'Global'] },
      { bottom: 5, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 14, textStyle: { fontSize: 12 }, data: ['Latin America and the Caribbean', totalLegendItem] }
    ];
    mobile.grid = { left: 10, right: 10, top: 28, bottom: 118, containLabel: true };
    mobile.xAxis = { axisLabel: { fontSize: 11, margin: 9 } };
    mobile.yAxis = { axisLabel: { fontSize: 10, margin: 6 } };
    mobile.series = [
      { barWidth: 34 }, { barWidth: 34 }, { barWidth: 34 },
      { barWidth: 34 }, { barWidth: 34 }, { barWidth: 34 },
      { symbolSize: 5, label: { fontSize: 11, distance: 6 } }
    ];
  }

  if (type === 'government-financing-by-region') {
    const totalLegendItem = {
      name: 'Total',
      icon: 'path://M0,3 L24,3 L24,5 L0,5 Z',
      itemStyle: { color: '#1C1C1C', borderColor: '#1C1C1C', borderWidth: 0 }
    };
    const legendRows = (itemWidth, itemHeight, itemGap, fontSize) => [
      {
        bottom: 31,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Latin America and the Caribbean', 'Africa', 'Europe and the CIS']
      },
      {
        bottom: 5,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Arab States', 'Asia and the Pacific', totalLegendItem]
      }
    ];

    tablet.legend = legendRows(24, 8, 16, 13);
    mobile.legend = [
      { bottom: 57, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, textStyle: { fontSize: 12 }, data: ['Latin America and the Caribbean'] },
      { bottom: 31, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 14, textStyle: { fontSize: 12 }, data: ['Africa', 'Europe and the CIS'] },
      { bottom: 5, left: 'center', icon: 'rect', itemWidth: 22, itemHeight: 8, itemGap: 14, textStyle: { fontSize: 12 }, data: ['Arab States', 'Asia and the Pacific', totalLegendItem] }
    ];
    mobile.grid = { left: 10, right: 10, top: 28, bottom: 118, containLabel: true };
    mobile.xAxis = { axisLabel: { fontSize: 11, margin: 9 } };
    mobile.yAxis = { axisLabel: { fontSize: 10, margin: 6 } };
    mobile.series = [
      { barWidth: 34 }, { barWidth: 34 }, { barWidth: 34 },
      { barWidth: 34 }, { barWidth: 34 },
      { symbolSize: 5, label: { fontSize: 11, distance: 6 } }
    ];
  }

  if (type === 'vertical-fund-contributions') {
    tablet.legend = {
      show: true,
      type: 'plain',
      orient: 'horizontal',
      left: 'center',
      bottom: 5,
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      textStyle: { fontSize: 13 },
      data: ['2024', '2025']
    };
    mobile.legend = {
      show: true,
      type: 'plain',
      orient: 'horizontal',
      left: 'center',
      bottom: 4,
      icon: 'rect',
      itemWidth: 22,
      itemHeight: 8,
      itemGap: 20,
      textStyle: { fontSize: 12 },
      data: ['2024', '2025']
    };
    mobile.grid = { left: 112, right: 42, top: 18, bottom: 62 };
    mobile.xAxis = {
      interval: 200,
      axisLabel: { fontSize: 10, margin: 7 }
    };
    mobile.yAxis = {
      axisLabel: {
        width: 98,
        margin: 8,
        fontSize: 10,
        lineHeight: 12,
        overflow: 'break'
      }
    };
    mobile.series = [
      { barWidth: 13, barGap: '18%', label: { distance: 4, fontSize: 10 } },
      { barWidth: 13, label: { distance: 4, fontSize: 10 } }
    ];
  }

  if (type === 'pooled-fund-contributions') {
    const pooledLegendRows = (fontSize, itemWidth, itemHeight, itemGap) => [
      {
        show: true,
        type: 'plain',
        orient: 'horizontal',
        bottom: 30,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Climate and environment', 'Development']
      },
      {
        show: true,
        type: 'plain',
        orient: 'horizontal',
        bottom: 4,
        left: 'center',
        icon: 'rect',
        itemWidth,
        itemHeight,
        itemGap,
        textStyle: { fontSize },
        data: ['Humanitarian', 'Peace and transition']
      }
    ];
    tablet.legend = pooledLegendRows(13, 24, 8, 20);
    mobile.legend = pooledLegendRows(12, 22, 8, 18);
    mobile.xAxis = {
      interval: 100
    };
  }

  const mobilePieLegend = compactLegend || {
    show: true,
    type: 'scroll',
    orient: 'horizontal',
    left: 'center',
    bottom: 4,
    width: '90%',
    itemWidth: 18,
    itemHeight: 7,
    textStyle: { fontSize: 10 }
  };

  if (type === 'regular-resources-allocation') {
    mobile.legend = mobilePieLegend;
    mobile.series = [{ radius: '52%', center: ['50%', '40%'], label: { show: false }, labelLine: { show: false } }];
  }

  if (type === 'institutional-budget-allocation') {
    mobile.legend = mobilePieLegend;
    mobile.series = [
      { radius: ['36%', '61%'], center: ['50%', '39%'], label: { show: false }, labelLine: { show: false } },
      { center: ['50%', '39%'] }
    ];
  }

  if (type === 'ifi-contributions-donut') {
    mobile.legend = mobilePieLegend;
    mobile.series = [
      { radius: ['34%', '57%'], center: ['50%', '39%'], label: { show: false }, labelLine: { show: false } },
      { center: ['50%', '39%'] }
    ];
  }

  if (type === 'resources-by-development-status' || type === 'resources-by-country-typology') {
    mobile.series = [
      { radius: ['42%', '64%'], center: ['50%', '43%'], label: { edgeDistance: 4 }, labelLine: { length: 10, length2: 8 } },
      { center: ['50%', '43%'] }
    ];
  }

  if (type === 'resources-by-funding-channel') {
    Object.assign(tablet, {
      legend: compactLegend,
      grid: { left: 18, right: 18, top: 42, bottom: 82, containLabel: true }
    });
    Object.assign(mobile, {
      tooltip: { confine: true, triggerOn: 'none' },
      legend: [
        {
          id: 'funding-channel-legend',
          show: true,
          type: 'plain',
          orient: 'vertical',
          left: '4%',
          top: 470,
          bottom: 'auto',
          width: '43%',
          icon: 'rect',
          itemWidth: 22,
          itemHeight: 8,
          itemGap: 8,
          selectedMode: false,
          formatter: (name) => ({
            'United Nations pooled funds': 'United Nations\npooled funds',
            'Third-party cost-sharing': 'Third-party\ncost-sharing'
          }[name] || name),
          textStyle: { fontSize: 10, lineHeight: 13, width: 135, overflow: 'break' },
          data: [
            'Thematic funds',
            'United Nations pooled funds',
            'Vertical funds',
            'Third-party cost-sharing'
          ]
        },
        {
          id: 'funding-channel-legend-secondary',
          show: true,
          type: 'plain',
          orient: 'vertical',
          left: '52%',
          top: 470,
          bottom: 'auto',
          width: '44%',
          icon: 'rect',
          itemWidth: 22,
          itemHeight: 8,
          itemGap: 8,
          selectedMode: false,
          formatter: (name) => ({
            'Reimbursable support services': 'Reimbursable support\nservices',
            'Government financing': 'Government\nfinancing'
          }[name] || name),
          textStyle: { fontSize: 10, lineHeight: 13, width: 140, overflow: 'break' },
          data: [
            'Reimbursable support services',
            'Regular resources',
            'Government financing'
          ]
        }
      ],
      grid: { left: 14, right: 14, top: 38, bottom: 142, containLabel: true },
      xAxis: { boundaryGap: true, axisLabel: { fontSize: 11 } },
      series: current.series.map(() => ({
        silent: true,
        emphasis: { disabled: true, focus: 'none' },
        blur: { areaStyle: { opacity: 0.95 } }
      }))
    });
  }

  if (type === 'resources-by-funding-type') {
    tablet.legend = {
      show: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      textStyle: { fontSize: 13 }
    };
    mobile.legend = {
      show: true,
      orient: 'horizontal',
      left: 'center',
      top: 0,
      bottom: 'auto',
      itemWidth: 20,
      itemHeight: 7,
      itemGap: 12,
      textStyle: { fontSize: 10 }
    };
    mobile.grid = { left: 48, right: 48, top: 38, bottom: 52, containLabel: false };
    mobile.series = [{ barWidth: 42 }, { barWidth: 42 }];
  }

  if (type === 'trends-in-resources') {
    mobile.grid = { left: 42, right: 8, top: 42, bottom: 72, containLabel: false };
    mobile.legend = {
      show: true,
      type: 'plain',
      orient: 'horizontal',
      left: 'center',
      bottom: 4,
      width: '96%',
      itemWidth: 18,
      itemHeight: 7,
      itemGap: 8,
      textStyle: { fontSize: 10 }
    };
    mobile.yAxis = { name: '', axisLabel: { fontSize: 9, margin: 6 } };
    mobile.xAxis = { axisLabel: { fontSize: 10 } };
    mobile.series = [
      { barWidth: '62%', label: { rich: { percent: { fontSize: 12 } } } },
      { barWidth: '62%', label: { rich: { percent: { fontSize: 12 } } } },
      { symbolSize: 6, lineStyle: { width: 3 }, label: { distance: 7, rich: { total: { fontSize: 10 } } } }
    ];
  }

  if (type === 'contribution-by-donor-category') {
    mobile.legend = {
      show: true,
      type: 'scroll',
      orient: 'horizontal',
      left: 'center',
      bottom: 2,
      width: '94%',
      itemWidth: 18,
      itemHeight: 7,
      itemGap: 8,
      textStyle: { fontSize: 10 }
    };
    mobile.series = [
      { radius: [0, '40%'], center: ['50%', '43%'], label: { show: true } },
      { radius: ['46%', '62%'], center: ['50%', '43%'], label: { show: false }, labelLine: { show: false } },
      { radius: ['64%', '70%'], center: ['50%', '43%'], label: { show: false }, labelLine: { show: false } }
    ];
  }

  if (type === 'resources-by-region') {
    const mobileRegions = [
      'Africa', '',
      'Asia and the Pacific', '',
      'Arab States', '',
      'Latin America and the Caribbean', '',
      'Europe and the CIS', ''
    ];
    const regionHeadings = [
      { text: 'Africa', color: '#657300', top: 17 },
      { text: 'Asia and the Pacific', color: '#267f7f', top: 92 },
      { text: 'Arab States', color: '#6f49a4', top: 167 },
      { text: 'Latin America and the Caribbean', color: '#bd4817', top: 242 },
      { text: 'Europe and the CIS', color: '#806000', top: 317 }
    ];
    mobile.grid = { left: 28, right: 28, top: -10, bottom: 6, containLabel: false };
    mobile.graphic = regionHeadings.map((heading) => ({
      type: 'text',
      left: 'center',
      top: heading.top,
      silent: true,
      style: {
        text: heading.text,
        fill: heading.color,
        font: '600 14px ProximaNova, Arial, sans-serif',
        textAlign: 'center'
      }
    }));
    mobile.yAxis = {
      data: mobileRegions,
      axisLabel: {
        show: false
      }
    };
    mobile.series = [
      {
        data: [
          '-', { value: 68.3, originalIndex: 0, itemStyle: { color: '#c3d51f' } },
          '-', { value: 14.4, originalIndex: 1, itemStyle: { color: '#3d9999' } },
          '-', { value: 9.8, originalIndex: 2, itemStyle: { color: '#8964bc' } },
          '-', { value: 4.1, originalIndex: 3, itemStyle: { color: '#e86b2e' } },
          '-', { value: 3.3, originalIndex: 4, itemStyle: { color: '#ad7f00' } }
        ],
        showBackground: false,
        barWidth: 18,
        barCategoryGap: '20%',
        label: {
          distance: 8,
          rich: {
            pct: { fontSize: 16, fontWeight: 700, color: '#232E3D' },
            value: { fontSize: 14, fontWeight: 500, color: '#40576A', padding: [0, 0, 0, 6] }
          }
        },
        z: 2
      },
      {
        name: 'Mobile value tracks',
        type: 'bar',
        data: ['-', 100, '-', 100, '-', 100, '-', 100, '-', 100],
        silent: true,
        barWidth: 18,
        barGap: '-100%',
        itemStyle: { color: '#fff' },
        label: { show: false },
        emphasis: { disabled: true },
        z: 1
      }
    ];
  }

  if (type === 'top-core-contributors') {
    mobile.grid = { left: 100, right: 42, top: 12, bottom: 42 };
    mobile.xAxis = { axisLabel: { fontSize: 9, margin: 7 } };
    mobile.yAxis = [
      {
        axisLabel: {
          width: 102,
          margin: 8,
          fontSize: 10,
          lineHeight: 12,
          overflow: 'break',
        }
      },
      { show: false }
    ];
    mobile.series = [{ barWidth: 15, label: { fontSize: 9, distance: 4 } }];
  }

  if (type === 'top-other-resources-contributors') {
    mobile.grid = { left: 128, right: 42, top: 4, bottom: 38 };
    mobile.xAxis = { axisLabel: { fontSize: 9, margin: 7 } };
    mobile.yAxis = [
      {
        axisLabel: {
          width: 116,
          margin: 8,
          fontSize: 10,
          lineHeight: 12,
          overflow: 'break'
        }
      },
      { show: false }
    ];
    mobile.series = [{ barWidth: 14, label: { fontSize: 10, distance: 4 } }];
  }

  if (type === 'funding-window-contributor-flow') {
    const sankeyNodes = current.series?.[0]?.data || [];
    const mobileContributorNames = {
      Luxembourg: 'Luxembourg',
      'Republic of Korea': 'Republic of\nKorea',
      'United Kingdom': 'United\nKingdom'
    };
    const mobileWindowNames = {
      'Governance, Peacebuilding,\nCrisis and Resilience': 'Governance,\nPeacebuilding,\nCrisis and Resilience',
      'Nature, Climate\nand Energy': 'Nature, Climate\nand Energy',
      "Gender Equality and\nWomen's Empowerment": 'Gender Equality and\nWomen’s Empowerment',
      'Poverty and Inequality': 'Poverty and\nInequality'
    };
    const mobileMillions = (value) => `$${value.toFixed(2).replace(/\.00$/, '')}M`;
    const mobileContributorTotals = {};
    const mobileWindowTotals = {};
    (current.series?.[0]?.links || []).forEach((link) => {
      mobileContributorTotals[link.source] = (mobileContributorTotals[link.source] || 0) + link.value;
      mobileWindowTotals[link.target] = (mobileWindowTotals[link.target] || 0) + link.value;
    });
    mobile.tooltip = {
      confine: true,
      triggerOn: 'click',
      transitionDuration: 0
    };
    mobile.series = [{
      left: 108,
      right: 112,
      top: 16,
      bottom: 16,
      nodeWidth: 10,
      nodeGap: 34,
      draggable: false,
      emphasis: { disabled: true, focus: 'none' },
      blur: {
        itemStyle: { opacity: 1 },
        lineStyle: { opacity: 0.52 },
        label: { opacity: 1 }
      },
      data: sankeyNodes.map((node) => ({
        ...node,
        label: node.depth === 0
          ? {
              show: true,
              position: 'left',
              distance: 6,
              align: 'right',
              width: 100,
              overflow: 'break',
              formatter: (params) => {
                const name = mobileContributorNames[params.name] || params.name;
                return `{contributorName|${name}}\n{contributorValue|${mobileMillions(mobileContributorTotals[params.name])}}`;
              },
              rich: {
                contributorName: { width: 100, align: 'right', fontSize: 11, lineHeight: 13, overflow: 'break' },
                contributorValue: { width: 100, align: 'right', fontSize: 11, lineHeight: 14 }
              }
            }
          : {
              show: true,
              position: 'right',
              distance: 6,
              align: 'left',
              width: 104,
              overflow: 'break',
              formatter: (params) => {
                const index = sankeyNodes.filter((item) => item.depth === 1).findIndex((item) => item.name === params.name);
                const name = mobileWindowNames[params.name] || params.name;
                return `{marker${index}| } {window${index}|${name}}\n{windowValue|${mobileMillions(mobileWindowTotals[params.name])}}`;
              },
              rich: {
                marker0: { width: 7, height: 7 },
                marker1: { width: 7, height: 7 },
                marker2: { width: 7, height: 7 },
                marker3: { width: 7, height: 7 },
                window0: { width: 88, fontSize: 10, lineHeight: 12, overflow: 'break' },
                window1: { width: 88, fontSize: 10, lineHeight: 12, overflow: 'break' },
                window2: { width: 88, fontSize: 10, lineHeight: 12, overflow: 'break' },
                window3: { width: 88, fontSize: 10, lineHeight: 12, overflow: 'break' },
                windowValue: { width: 88, fontSize: 10, lineHeight: 13, padding: [0, 0, 0, 11] }
              }
            }
      }))
    }];
  }

  if (type === 'multi-year-pledges') {
    mobile.grid = { left: 38, right: 8, top: 30, bottom: 92, containLabel: false };
    mobile.legend = {
      show: true,
      type: 'plain',
      orient: 'horizontal',
      left: 'center',
      bottom: 2,
      width: '96%',
      itemWidth: 17,
      itemHeight: 7,
      itemGap: 7,
      textStyle: { fontSize: 10 }
    };
    mobile.xAxis = { axisLabel: { fontSize: 11, margin: 8 } };
    mobile.yAxis = { axisLabel: { fontSize: 10, margin: 5 }, name: '' };
    mobile.series = [
      { barWidth: 44, label: { fontSize: 10 } },
      { barWidth: 44, label: { fontSize: 10 } },
      { barWidth: 44, label: { fontSize: 10, distance: 5 } },
      { symbolSize: 7, lineStyle: { width: 2 }, label: { fontSize: 10, distance: 5, padding: [2, 3] } }
    ];
  }

  if (type === 'top-gloc-contributors' || type === 'topGlocContributors') {
    mobile.legend = {
      show: true,
      type: 'plain',
      orient: 'horizontal',
      left: 'center',
      top: 4,
      itemWidth: 18,
      itemHeight: 7,
      itemGap: 8,
      textStyle: { fontSize: 10 }
    };
    mobile.grid = { left: 88, right: 45, top: 54, bottom: 30 };
    mobile.xAxis = { axisLabel: { fontSize: 10, margin: 7 } };
    mobile.yAxis = [
      { axisLabel: { width: 92, margin: 8, fontSize: 11, lineHeight: 13, overflow: 'break' } },
      { show: false }
    ];
    mobile.series = [
      { barWidth: 17 },
      { barWidth: 17 },
      { barWidth: 17 },
      { barWidth: 17, label: { fontSize: 10, distance: 4 } }
    ];
  }

  if (type === 'contributions-by-donor-resource') {
    mobile.legend = {
      show: true,
      orient: 'horizontal',
      left: 'center',
      top: 8,
      bottom: 'auto',
      itemWidth: 22,
      itemHeight: 8,
      itemGap: 16,
      textStyle: { fontSize: 12 }
    };
  }

  const fundingLandscapeLegendCharts = new Set([
    'resources-by-funding-type',
    'trends-in-resources',
    'contribution-by-donor-category',
    'contributions-by-donor-resource',
    'resources-by-funding-channel'
  ]);

  if (fundingLandscapeLegendCharts.has(type)) {
    tablet.legend = {
      ...(tablet.legend || {}),
      textStyle: {
        ...((tablet.legend && tablet.legend.textStyle) || {}),
        fontSize: (
          type === 'contribution-by-donor-category'
        ) ? 15 : type === 'resources-by-funding-type' ? 13 : 12
      }
    };
  }

  chart.setOption({
    media: [
      { query: { maxWidth: 900 }, option: tablet },
      { query: { maxWidth: 600 }, option: mobile }
    ]
  });
}

function initChartEl(el) {
  const type = el.dataset.chartType;
  const initFn = registry[type];
  if (!initFn) return;

  try {
    addLocalChartScroller(el, type);
    const chart = initFn(el, echarts) || el.__echartsInstance;
    addResponsiveChartOptions(chart, type);
  } catch (err) {
    // fail silently in production; developer can inspect console
    // eslint-disable-next-line no-console
    console.error('Error initializing chart', type, err);
  }
}

export function initCharts(root = document) {
  const els = Array.from(root.querySelectorAll('[data-chart-type]'));
  els.forEach(initChartEl);
}

export default { initCharts };
