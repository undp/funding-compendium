const GOV = 'Governance, Peacebuilding,\nCrisis and Resilience';
const NATURE = 'Nature, Climate\nand Energy';
const GENDER = "Gender Equality and\nWomen's Empowerment";
const POVERTY = 'Poverty and Inequality';

const contributorOrder = [
  'Germany',
  'Denmark',
  'Sweden',
  'Luxembourg',
  'Republic of Korea',
  'Iceland',
  'Switzerland',
  'United Kingdom'
];

const fundingWindowOrder = [GOV, NATURE, GENDER, POVERTY];
const fundingWindowColors = ['#0069B3', '#3D9999', '#8964BC', '#E86B2E'];
const contributorFlagCodes = {
  Germany: 'de',
  Denmark: 'dk',
  Sweden: 'se',
  Luxembourg: 'lu',
  'Republic of Korea': 'kr',
  Iceland: 'is',
  Switzerland: 'ch',
  'United Kingdom': 'gb'
};
const contributorFlagUrls = Object.fromEntries(
  Object.entries(contributorFlagCodes).map(([name, code]) => [name, `https://flagcdn.com/${code}.svg`])
);

const links = [
  { source: 'Germany', target: GOV, value: 7.818899, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'Germany', target: NATURE, value: 40.673081, lineStyle: { color: fundingWindowColors[1] } },
  { source: 'Denmark', target: GOV, value: 30.567018, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'Denmark', target: NATURE, value: 3.820877, lineStyle: { color: fundingWindowColors[1] } },
  { source: 'Sweden', target: GOV, value: 14.466790, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'Sweden', target: NATURE, value: 5.943536, lineStyle: { color: fundingWindowColors[1] } },
  { source: 'Luxembourg', target: GOV, value: 1.116828, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'Luxembourg', target: NATURE, value: 0.446731, lineStyle: { color: fundingWindowColors[1] } },
  { source: 'Luxembourg', target: GENDER, value: 1.340193, lineStyle: { color: fundingWindowColors[2] } },
  { source: 'Luxembourg', target: POVERTY, value: 0.223366, lineStyle: { color: fundingWindowColors[3] } },
  { source: 'Republic of Korea', target: GOV, value: 1.873777, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'Republic of Korea', target: NATURE, value: 0.760881, lineStyle: { color: fundingWindowColors[1] } },
  { source: 'Iceland', target: GOV, value: 0.386282, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'Iceland', target: NATURE, value: 2.217161, lineStyle: { color: fundingWindowColors[1] } },
  { source: 'Switzerland', target: GOV, value: 1.735, lineStyle: { color: fundingWindowColors[0] } },
  { source: 'United Kingdom', target: NATURE, value: 1.658941, lineStyle: { color: fundingWindowColors[1] } }
];

const totalsFor = (field) => links.reduce((totals, link) => {
  totals[link[field]] = (totals[link[field]] || 0) + link.value;
  return totals;
}, {});

const contributorTotals = totalsFor('source');
const fundingWindowTotals = totalsFor('target');
const formatMillions = (value) => `$${value.toFixed(2).replace(/\.00$/, '')}M`;

const contributorLabel = { position: 'left', distance: 50, align: 'right' };
const fundingWindowLabel = { position: 'right', distance: 14, align: 'left', width: 360 };

const fundingWindowRich = fundingWindowOrder.reduce((styles, name, index) => {
  styles[`marker${index}`] = {
    width: 10,
    height: 10,
    backgroundColor: fundingWindowColors[index],
    borderRadius: 0
  };
  styles[`window${index}`] = {
    fontFamily: 'ProximaNova, Arial, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 18,
    color: fundingWindowColors[index]
  };
  return styles;
}, {});

const nodes = [
  ...contributorOrder.map((name) => ({
    name,
    depth: 0,
    label: contributorLabel,
    itemStyle: { color: '#526D7D' }
  })),
  ...fundingWindowOrder.map((name, index) => ({
    name,
    depth: 1,
    label: fundingWindowLabel,
    itemStyle: { color: fundingWindowColors[index] }
  }))
];

function tooltipRowsForNode(name) {
  if (contributorTotals[name]) {
    return fundingWindowOrder
      .map((windowName, index) => {
        const link = links.find((item) => item.source === name && item.target === windowName);
        return link ? {
          label: windowName.replace(/\n/g, ' '),
          color: fundingWindowColors[index],
          value: formatMillions(link.value),
          detail: formatTooltipPercent(link.value, contributorTotals[name])
        } : null;
      })
      .filter(Boolean);
  }

  return contributorOrder
    .map((contributor) => {
      const link = links.find((item) => item.source === contributor && item.target === name);
      return link ? {
        label: contributor,
        image: contributorFlagUrls[contributor],
        value: formatMillions(link.value),
        detail: formatTooltipPercent(link.value, fundingWindowTotals[name])
      } : null;
    })
    .filter(Boolean);
}

export function initFundingWindowContributorFlow(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'ProximaNova, Arial, sans-serif' },
    aria: {
      enabled: true,
      description: 'Flow of 2025 contributions from eight contributors to four UNDP funding windows.'
    },
    tooltip: {
      trigger: 'item',
      confine: true,
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 0,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 14
      },
      formatter: function (params) {
        if (params.dataType === 'edge') {
          return detailedTooltip(
            params.data.source,
            formatMillions(params.data.value),
            [{
              label: params.data.target.replace(/\n/g, ' '),
              color: params.data.lineStyle.color,
              value: formatMillions(params.data.value),
              detail: formatTooltipPercent(params.data.value, contributorTotals[params.data.source])
            }]
          );
        }

        const name = params.data.name;
        const total = contributorTotals[name] || fundingWindowTotals[name];
        return detailedTooltip(name.replace(/\n/g, ' '), formatMillions(total), tooltipRowsForNode(name));
      }
    },
    series: [{
      type: 'sankey',
      left: 205,
      right: 380,
      top: 24,
      bottom: 24,
      nodeAlign: 'justify',
      nodeWidth: 16,
      nodeGap: 52,
      layoutIterations: 0,
      draggable: false,
      data: nodes,
      links,
      emphasis: {
        focus: 'adjacency',
        lineStyle: { opacity: 0.9 }
      },
      blur: {
        itemStyle: { opacity: 0.3 },
        lineStyle: { opacity: 0.08 },
        label: { opacity: 0.35 }
      },
      itemStyle: {
        borderColor: '#ffffff',
        borderWidth: 1
      },
      lineStyle: {
        curveness: 0.48,
        opacity: 0.52
      },
      label: {
        show: true,
        fontFamily: 'ProximaNova, Arial, sans-serif',
        formatter: function (params) {
          const total = contributorTotals[params.name] || fundingWindowTotals[params.name];
          const windowIndex = fundingWindowOrder.indexOf(params.name);
          if (windowIndex !== -1) {
            return `{marker${windowIndex}| }  {window${windowIndex}|${params.name.replace(/\n/g, ' ')}}\n{windowValue|${formatMillions(total)}}`;
          }
          return `{contributorName|${params.name}}\n{contributorValue|${formatMillions(total)}}`;
        },
        rich: {
          ...fundingWindowRich,
          contributorName: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 20,
            color: '#303944'
          },
          contributorValue: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: 20,
            color: '#303944'
          },
          windowValue: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 20,
            padding: [0, 0, 0, 18],
            color: '#263746'
          }
        }
      }
    }]
  });

  const distributeFundingWindows = () => {
    const seriesModel = chart.getModel().getSeriesByIndex(0);
    const data = seriesModel.getData();
    const plotHeight = seriesModel.layoutInfo.height;
    const firstContributor = data.getItemLayout(data.indexOfName(contributorOrder[0]));
    const lastContributor = data.getItemLayout(data.indexOfName(contributorOrder[contributorOrder.length - 1]));
    const firstCenter = firstContributor.y + firstContributor.dy / 2;
    const lastCenter = lastContributor.y + lastContributor.dy / 2;

    fundingWindowOrder.forEach((name, index) => {
      const dataIndex = data.indexOfName(name);
      const layout = data.getItemLayout(dataIndex);
      const center = firstCenter + (lastCenter - firstCenter) * index / (fundingWindowOrder.length - 1);
      const y = Math.max(0, Math.min(plotHeight - layout.dy, center - layout.dy / 2));

      chart.dispatchAction({
        type: 'dragNode',
        seriesIndex: 0,
        dataIndex,
        localX: layout.x / seriesModel.layoutInfo.width,
        localY: y / plotHeight
      });
    });
  };

  distributeFundingWindows();

  el.style.position = 'relative';
  const flagOverlay = document.createElement('div');
  flagOverlay.className = 'funding-window-flag-overlay';
  flagOverlay.setAttribute('aria-hidden', 'true');
  flagOverlay.style.cssText = 'position:absolute;inset:0;z-index:5;pointer-events:none;';
  el.appendChild(flagOverlay);

  const flagElements = Object.fromEntries(contributorOrder.map((name) => {
    const flag = document.createElement('img');
    flag.src = contributorFlagUrls[name];
    flag.alt = '';
    const isSwiss = name === 'Switzerland';
    flag.style.cssText = `position:absolute;width:${isSwiss ? 18 : 28}px;height:18px;object-fit:cover;background:#fff;border:1px solid #C5CBD1;box-sizing:content-box;`;
    flagOverlay.appendChild(flag);
    return [name, flag];
  }));

  const positionContributorFlags = () => {
    const seriesModel = chart.getModel().getSeriesByIndex(0);
    const data = seriesModel.getData();
    contributorOrder.forEach((name) => {
      const layout = data.getItemLayout(data.indexOfName(name));
      const flag = flagElements[name];
      const slotOffset = name === 'Switzerland' ? 30 : 36;
      flag.style.left = `${seriesModel.layoutInfo.x + layout.x - slotOffset}px`;
      flag.style.top = `${seriesModel.layoutInfo.y + layout.y + layout.dy / 2 - 9}px`;
    });
  };

  requestAnimationFrame(positionContributorFlags);

  Object.values(contributorFlagUrls).forEach((url) => {
    const image = new Image();
    image.addEventListener('load', () => chart.resize());
    image.src = url;
  });

  const resize = () => {
    chart.resize();
    distributeFundingWindows();
    positionContributorFlags();
  };
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initFundingWindowContributorFlow;
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
