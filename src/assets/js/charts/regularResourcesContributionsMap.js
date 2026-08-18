import worldJson from '../../data/world.json';

const contributors = [
  { name: 'Germany', value: 105197907, rank: 1 },
  { name: 'Japan', value: 45391094, rank: 2 },
  { name: 'Sweden', value: 40911333, rank: 3 },
  { name: 'Switzerland', value: 38608749, rank: 4 },
  { name: 'Norway', value: 37343097, rank: 5 },
  { name: 'Netherlands', value: 37037037, rank: 6 },
  { name: 'Canada', value: 29325513, rank: 7 },
  { name: 'Denmark', value: 19104386, rank: 8 },
  { name: 'South Korea', mapName: 'Korea', value: 15370924, rank: 9 },
  { name: 'United Kingdom', value: 14666667, rank: 10 },
  { name: 'Belgium', value: 11560694, rank: 11 },
  { name: 'Ireland', value: 8959538, rank: 12 },
  { name: 'Qatar', value: 8000000, rank: 13 },
  { name: 'Spain', value: 7638073, rank: 14 },
  { name: 'New Zealand', value: 4793289, rank: 15 },
  { name: 'India', value: 4248772, rank: 16 },
  { name: 'Luxembourg', value: 3685532, rank: 17 },
  { name: 'China', value: 3450000, rank: 18 },
  { name: 'Saudi Arabia', value: 2000000, rank: 19 },
  { name: 'Austria', value: 1409249, rank: 20 },
  { name: 'Turkey', value: 1200000, rank: 21 },
  { name: 'Finland', value: 1169591, rank: 22 },
  { name: 'Thailand', value: 865112, rank: 23 },
  { name: 'Kuwait', value: 570000, rank: 24 },
  { name: 'Singapore', value: 300000, rank: 25 },
  { name: 'Iceland', value: 238186, rank: 26 },
  { name: 'Vietnam', value: 70000, rank: 27 },
  { name: 'Liechtenstein', value: 60729, rank: 28 },
  { name: 'Portugal', value: 50000, rank: 29 },
  { name: 'Cambodia', value: 10000, rank: 30 },
  { name: 'Philippines', value: 10000, rank: 31 },
  { name: 'Samoa', value: 6000, rank: 32 }
];

const total = contributors.reduce((sum, item) => sum + item.value, 0);
const formatUsd = (value) => `USD ${Number(value).toLocaleString('en-US')}`;

export function initRegularResourcesContributionsMap(el, echarts) {
  const chart = echarts.init(el);
  const resize = () => chart.resize();

  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;
  echarts.registerMap('world', worldJson);

  chart.setOption({
      animationDuration: 700,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#222'
      },
      title: {
        text: 'Regular resources contributions by country in 2025',
        subtext: 'Hover over a highlighted country for ranking and contribution',
        left: 'center',
        top: 32,
        textStyle: {
          fontFamily: 'Proxima Nova, Arial, sans-serif',
          fontSize: 20,
          fontWeight: 700,
          color: '#333'
        },
        subtextStyle: {
          fontFamily: 'Proxima Nova, Arial, sans-serif',
          fontSize: 12,
          color: '#666',
          lineHeight: 18
        }
      },
      tooltip: {
        trigger: 'item',
        confine: true,
        backgroundColor: '#fff',
        borderColor: '#d5d5d5',
        borderWidth: 1,
        padding: [12, 14],
        textStyle: {
          fontFamily: 'Proxima Nova, Arial, sans-serif',
          color: '#222',
          fontSize: 12,
          lineHeight: 19
        },
        formatter: function (params) {
          const item = contributors.find((country) => (country.mapName || country.name) === params.name);
          if (!item) {
            return `<div style="font-family:'Proxima Nova',Arial,sans-serif"><strong>${params.name}</strong><br><span style="color:#777">No contribution shown</span></div>`;
          }

          const share = (item.value / total) * 100;
          return `<div style="min-width:210px;font-family:'Proxima Nova',Arial,sans-serif">
            <div style="font-size:14px;font-weight:700;margin-bottom:8px">${item.name}</div>
            <div style="display:flex;justify-content:space-between;gap:20px;margin-bottom:4px"><span style="color:#666">Ranking</span><strong>#${item.rank}</strong></div>
            <div style="display:flex;justify-content:space-between;gap:20px;margin-bottom:4px"><span style="color:#666">Contribution</span><strong>${formatUsd(item.value)}</strong></div>
            <div style="display:flex;justify-content:space-between;gap:20px"><span style="color:#666">Share</span><strong>${share.toFixed(1)}%</strong></div>
          </div>`;
        }
      },
      visualMap: {
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        bottom: 30,
        itemWidth: 22,
        itemHeight: 10,
        itemGap: 14,
        textStyle: {
          fontFamily: 'Proxima Nova, Arial, sans-serif',
          color: '#555',
          fontSize: 11
        },
        pieces: [
          { min: 50000000, label: 'USD 50M+', color: RESOURCE_COLORS.regular },
          { min: 25000000, max: 49999999, label: 'USD 25–50M', color: '#CDDC4C' },
          { min: 10000000, max: 24999999, label: 'USD 10–25M', color: '#D8E478' },
          { min: 1000000, max: 9999999, label: 'USD 1–10M', color: '#E4ECA5' },
          { min: 1, max: 999999, label: 'Below USD 1M', color: '#EFF4D2' }
        ],
        outOfRange: { color: '#ECEFF1' }
      },
      series: [{
        name: '2025 contribution',
        type: 'map',
        map: 'world',
        roam: true,
        layoutCenter: ['50%', '49%'],
        layoutSize: '125%',
        zoom: 1,
        scaleLimit: { min: 0.9, max: 12 },
        selectedMode: false,
        label: { show: false },
        itemStyle: {
          areaColor: '#ECEFF1',
          borderColor: '#fff',
          borderWidth: 0.8
        },
        emphasis: {
          label: {
            show: true,
            fontFamily: 'Proxima Nova, Arial, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: '#111'
          },
          itemStyle: {
            areaColor: '#A8B819',
            borderColor: '#333',
            borderWidth: 1
          }
        },
        data: contributors.map((item) => ({
          ...item,
          name: item.mapName || item.name
        }))
      }]
  });

  return chart;
}

export default initRegularResourcesContributionsMap;
import { RESOURCE_COLORS } from './chartColors';
