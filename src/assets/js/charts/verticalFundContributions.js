const funds = [
  'Global Fund',
  'Global Environment Facility',
  'Green Climate Fund',
  'Montreal Protocol',
  'GAVI',
  'Adaptation Fund'
];

const values2024 = [581.827016, 149.924217, 128.108911, 35.560208, 18.581428, 6.111816];
const values2025 = [310.762558, 371.578945, 84.422285, 16.269482, 35.340745, 6.888984];

export function initVerticalFundContributions(el, echarts) {
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
        const index = params[0].dataIndex;
        return `<div style="font-weight:700;margin-bottom:8px">${funds[index]}</div>
          <div style="margin-bottom:4px">2024: <strong>$${values2024[index].toFixed(1).replace(/\.0$/, '')}M</strong></div>
          <div>2025: <strong>$${values2025[index].toFixed(1).replace(/\.0$/, '')}M</strong></div>`;
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 18,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: ['2024', '2025']
    },
    grid: {
      left: 190,
      right: 85,
      top: 18,
      bottom: 60
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 599,
      interval: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: (value) => value === 599 ? '' : `$${value}M`
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: funds,
      axisLine: {
        show: true,
        lineStyle: { color: '#D7DBDF' }
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#303944',
        fontSize: 11,
        margin: 14
      }
    },
    series: [
      {
        name: '2024',
        type: 'bar',
        data: values2024,
        barWidth: 20,
        barGap: '15%',
        barCategoryGap: '38%',
        itemStyle: { color: CATEGORY_COLORS[6] },
        markLine: {
          silent: true,
          symbol: 'none',
          label: { show: false },
          lineStyle: { color: 'rgba(126, 73, 48, 0.24)', width: 1 },
          data: [0, 100, 200, 300, 400, 500].map((value) => ({ xAxis: value }))
        },
        label: {
          show: true,
          position: 'right',
          distance: 7,
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#303944',
          fontSize: 10,
          fontWeight: 600
        }
      },
      {
        name: '2025',
        type: 'bar',
        data: values2025,
        barWidth: 20,
        itemStyle: { color: CATEGORY_COLORS[10] },
        label: {
          show: true,
          position: 'right',
          distance: 7,
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#303944',
          fontSize: 10,
          fontWeight: 600
        }
      }
    ]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initVerticalFundContributions;
import { CATEGORY_COLORS } from './chartColors';
