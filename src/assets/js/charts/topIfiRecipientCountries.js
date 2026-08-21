const recipients = [
  'Yemen',
  'Syria',
  'Prog. for Palestinian People',
  'Afghanistan',
  'Argentina',
  'Lebanon',
  'Angola',
  'Türkiye',
  'Panama',
  'Honduras'
];

const direct = [
  70.688079, 36.561612, 24.255938, 22.055319, 0.086917,
  18.496085, 0, 0.116907, 0, 0.093065
];

const indirect = [
  0, 0, 1.999566, 0, 18.961164,
  0, 16.860748, 15.196181, 15, 12.380083
];

const totals = [
  70.688079, 36.561612, 26.255504, 22.055319, 19.048081,
  18.496085, 16.860748, 15.313088, 15, 12.473148
];

export function initTopIfiRecipientCountries(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: 'rgba(35, 46, 61, 0.035)' }
      },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const amount = (value) => `$${value.toFixed(1).replace(/\.0$/, '')}M`;
        const share = (value) => formatTooltipPercent(value, totals[index]);

        return detailedTooltip(recipients[index], amount(totals[index]), [
          { label: 'IFI Direct', color: SECONDARY_COLORS[0], value: direct[index] > 0 ? amount(direct[index]) : '—', detail: direct[index] > 0 ? share(direct[index]) : null },
          { label: 'IFI Indirect', color: SECONDARY_COLORS[1], value: indirect[index] > 0 ? amount(indirect[index]) : '—', detail: indirect[index] > 0 ? share(indirect[index]) : null }
        ]);
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: ['IFI Direct', 'IFI Indirect']
    },
    grid: {
      left: 190,
      right: 90,
      top: 15,
      bottom: 70
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 80,
      interval: 20,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 10,
        formatter: (value) => `$${value}M`
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: recipients,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#303944',
        fontSize: 11,
        margin: 14,
        width: 165,
        overflow: 'break',
        lineHeight: 14
      }
    },
    series: [
      {
        name: 'IFI Direct',
        type: 'bar',
        stack: 'total',
        data: direct,
        barWidth: 20,
        itemStyle: { color: SECONDARY_COLORS[0] },
        emphasis: { focus: 'series' }
      },
      {
        name: 'IFI Indirect',
        type: 'bar',
        stack: 'total',
        data: indirect,
        barWidth: 20,
        itemStyle: { color: SECONDARY_COLORS[1] },
        emphasis: { focus: 'series' }
      },
      {
        name: 'Total',
        type: 'bar',
        data: totals,
        barWidth: 20,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'right',
          distance: 8,
          formatter: (params) => `$${Math.floor(params.value)}M`,
          color: '#303944',
          fontSize: 11,
          fontWeight: 700
        },
        z: 10
      }
    ]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopIfiRecipientCountries;
import { SECONDARY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
