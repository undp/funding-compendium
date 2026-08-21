const GOV = 'Governance, Peacebuilding,\nCrisis and Resilience';
const NATURE = 'Nature, Climate\nand Energy';
const GENDER = "Gender Equality and\nWomen's Empowerment";
const POVERTY = 'Poverty and\nInequality';

const nodes = [
  { name: 'Germany', itemStyle: { color: '#5D7485' } },
  { name: 'Denmark', itemStyle: { color: '#5D7485' } },
  { name: 'Sweden', itemStyle: { color: '#5D7485' } },
  { name: 'Luxembourg', itemStyle: { color: '#5D7485' } },
  { name: 'Republic of Korea', itemStyle: { color: '#5D7485' } },
  { name: 'Iceland', itemStyle: { color: '#5D7485' } },
  { name: 'Switzerland', itemStyle: { color: '#5D7485' } },
  { name: 'United Kingdom', itemStyle: { color: '#5D7485' } },
  { name: GOV, itemStyle: { color: SECONDARY_COLORS[0] } },
  { name: NATURE, itemStyle: { color: SECONDARY_COLORS[1] } },
  { name: GENDER, itemStyle: { color: SECONDARY_COLORS[2] } },
  { name: POVERTY, itemStyle: { color: SECONDARY_COLORS[3] } }
];

const links = [
  { source: 'Germany', target: GOV, value: 7.818899, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'Germany', target: NATURE, value: 40.673081, lineStyle: { color: SECONDARY_COLORS[1] } },
  { source: 'Denmark', target: GOV, value: 30.567018, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'Denmark', target: NATURE, value: 3.820877, lineStyle: { color: SECONDARY_COLORS[1] } },
  { source: 'Sweden', target: GOV, value: 14.466790, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'Sweden', target: NATURE, value: 5.943536, lineStyle: { color: SECONDARY_COLORS[1] } },
  { source: 'Luxembourg', target: GOV, value: 1.116828, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'Luxembourg', target: NATURE, value: 0.446731, lineStyle: { color: SECONDARY_COLORS[1] } },
  { source: 'Luxembourg', target: GENDER, value: 1.340193, lineStyle: { color: SECONDARY_COLORS[2] } },
  { source: 'Luxembourg', target: POVERTY, value: 0.223366, lineStyle: { color: SECONDARY_COLORS[3] } },
  { source: 'Republic of Korea', target: GOV, value: 1.873777, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'Republic of Korea', target: NATURE, value: 0.760881, lineStyle: { color: SECONDARY_COLORS[1] } },
  { source: 'Iceland', target: GOV, value: 0.386282, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'Iceland', target: NATURE, value: 2.217161, lineStyle: { color: SECONDARY_COLORS[1] } },
  { source: 'Switzerland', target: GOV, value: 1.735, lineStyle: { color: SECONDARY_COLORS[0] } },
  { source: 'United Kingdom', target: NATURE, value: 1.658941, lineStyle: { color: SECONDARY_COLORS[1] } }
];

const contributorTotals = links.reduce((totals, link) => {
  totals[link.source] = (totals[link.source] || 0) + link.value;
  return totals;
}, {});

const graphicText = (left, top, text, font, fill = '#303944') => ({
  type: 'text',
  left,
  top,
  style: {
    text,
    fill,
    font: `${font} Proxima Nova, Arial, sans-serif`,
    lineHeight: 15,
    textAlign: 'left'
  }
});

const graphicMarker = (top, color) => ({
  type: 'rect',
  left: '73%',
  top,
  shape: { x: 0, y: 0, width: 18, height: 8 },
  style: { fill: color }
});

export function initFundingWindowContributorFlow(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 13,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        if (params.dataType === 'edge') {
          return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:7px">${params.data.source.replace(/\n/g, ' ')}</div>
            <div style="font-family:'Proxima Nova',Arial,sans-serif;color:#6B7280;margin-bottom:5px">${params.data.target.replace(/\n/g, ' ')}</div>
            <div style="font-family:'Proxima Nova',Arial,sans-serif;font-size:15px;font-weight:700">$${params.data.value.toFixed(2)}M</div>`;
        }

        return null;
      }
    },
    graphic: [
      graphicText(24, 28, 'CONTRIBUTORS', '700 12px', '#52636F'),
      graphicText('76%', 28, 'FUNDING WINDOWS', '700 12px', '#52636F'),
      graphicMarker(74, SECONDARY_COLORS[1]),
      graphicText('79%', 68, 'Nature, Climate\nand Energy', '12px'),
      graphicText('79%', 104, '$55.5M', '700 14px', '#232E3D'),
      graphicMarker(170, SECONDARY_COLORS[0]),
      graphicText('79%', 164, 'Governance, Peacebuilding,\nCrisis and Resilience', '12px'),
      graphicText('79%', 200, '$58M', '700 14px', '#232E3D'),
      graphicMarker(274, SECONDARY_COLORS[2]),
      graphicText('79%', 268, "Gender Equality and\nWomen's Empowerment", '12px'),
      graphicText('79%', 304, '$1.34M', '700 14px', '#232E3D'),
      graphicMarker(370, SECONDARY_COLORS[3]),
      graphicText('79%', 364, 'Poverty and Inequality', '12px'),
      graphicText('79%', 390, '$0.22M', '700 14px', '#232E3D')
    ],
    series: [{
      type: 'sankey',
      left: 150,
      right: '27%',
      top: 62,
      bottom: 30,
      nodeWidth: 18,
      nodeGap: 20,
      layoutIterations: 32,
      data: nodes,
      links,
      emphasis: { focus: 'adjacency' },
      itemStyle: { borderWidth: 0 },
      lineStyle: {
        curveness: 0.5,
        opacity: 0.58
      },
      label: {
        show: true,
        position: 'left',
        distance: 10,
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 13,
        lineHeight: 17,
        formatter: function (params) {
          if ([GOV, NATURE, GENDER, POVERTY].includes(params.name)) return '';
          return `{name|${params.name}}\n{value|$${contributorTotals[params.name].toFixed(2)}M}`;
        },
        rich: {
          name: {
            fontFamily: 'Proxima Nova, Arial, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 17,
            color: '#303944',
            align: 'right'
          },
          value: {
            fontFamily: 'Proxima Nova, Arial, sans-serif',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 17,
            color: '#52636F',
            align: 'right'
          }
        }
      }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initFundingWindowContributorFlow;
import { SECONDARY_COLORS } from './chartColors';
