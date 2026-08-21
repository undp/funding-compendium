const funds = [
  'Peacebuilding Fund',
  'Somalia Joint Fund',
  'Uzbekistan Vision 2030 Fund',
  'DRC Fonds National REDD',
  'Trust Fund for Peace in Colombia',
  'Special Trust Fund for Afghanistan',
  'Joint SDG Fund',
  'Central African Forest Initiative',
  'South Sudan RSRTF',
  'UN-REDD Programme Fund',
  'Papua New Guinea UN Country Fund II',
  'Systematic Observations Financing Facility',
  'Spotlight Initiative 2.0 Fund',
  'Global Disability Fund',
  'JP OPT Sawasya III'
];

const values = [
  40.987864,
  16.017976,
  15.991372,
  13.234994,
  12.341197,
  11.930920,
  11.131859,
  10.344107,
  9.322698,
  7.938622,
  7.397133,
  5.962281,
  5.562490,
  4.766646,
  4.608071
];

export function initTopUnPooledFunds(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const item = params[0];
        const exact = Math.round(item.value * 1000000).toLocaleString('en-US');
        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:6px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Net funded amount: <strong>$${exact}</strong></div>`;
      }
    },
    grid: {
      left: 265,
      right: 85,
      top: 16,
      bottom: 40
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 40,
      interval: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: funds,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#2F3742',
        fontSize: 11,
        lineHeight: 14,
        margin: 14,
        width: 235,
        overflow: 'break'
      }
    },
    series: [{
      name: 'Net funded amount',
      type: 'bar',
      clip: false,
      data: values,
      barWidth: 15,
      itemStyle: {
        color: function (params) {
          const lightness = 31 + (params.dataIndex * 2.7);
          return `hsl(266, 43%, ${lightness}%)`;
        }
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        formatter: (params) => `$${Math.round(params.value)}M`,
        color: '#3B4650',
        fontSize: 11,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: { color: CATEGORY_COLORS[9] }
      }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopUnPooledFunds;
import { SECONDARY_COLORS, CATEGORY_COLORS } from './chartColors';
