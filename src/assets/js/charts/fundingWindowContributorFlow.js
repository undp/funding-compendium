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

const graphicCircle = (top, color) => ({
  type: 'circle',
  left: '73%',
  top,
  shape: { cx: 5, cy: 5, r: 5 },
  style: { fill: color }
});

export function initFundingWindowContributorFlow(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: '#ffffff',
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
      text: 'Contributions by Funding Window and contributor',
      subtext: '2025 · $115 million total contributions',
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#7A838F'
      }
    },
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
            <div style="font-family:'Proxima Nova',Arial,sans-serif;font-size:15px;font-weight:700">$${params.data.value.toFixed(2)}m</div>`;
        }
        return params.name.replace(/\n/g, ' ');
      }
    },
    graphic: [
      graphicText(30, 82, 'CONTRIBUTORS', '700 11px', '#7A838F'),
      graphicText('73%', 82, 'FUNDING WINDOWS', '700 11px', '#7A838F'),
      graphicCircle(120, SECONDARY_COLORS[1]),
      graphicText('75%', 116, 'Nature, Climate\nand Energy', '11px'),
      graphicText('75%', 151, '$55.5m', '700 13px', '#232E3D'),
      graphicCircle(210, SECONDARY_COLORS[0]),
      graphicText('75%', 206, 'Governance, Peacebuilding,\nCrisis and Resilience', '11px'),
      graphicText('75%', 241, '$58.0m', '700 13px', '#232E3D'),
      graphicCircle(300, SECONDARY_COLORS[2]),
      graphicText('75%', 296, "Gender Equality and\nWomen's Empowerment", '11px'),
      graphicText('75%', 331, '$1.34m', '700 13px', '#232E3D'),
      graphicCircle(390, SECONDARY_COLORS[3]),
      graphicText('75%', 386, 'Poverty and Inequality', '11px'),
      graphicText('75%', 411, '$0.22m', '700 13px', '#232E3D')
    ],
    series: [{
      type: 'sankey',
      left: 170,
      right: '30%',
      top: 115,
      bottom: 45,
      nodeWidth: 16,
      nodeGap: 18,
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
        color: '#303944',
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        lineHeight: 15,
        formatter: function (params) {
          return [GOV, NATURE, GENDER, POVERTY].includes(params.name) ? '' : params.name;
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
