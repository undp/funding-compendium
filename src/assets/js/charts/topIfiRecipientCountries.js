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
      borderWidth: 1,
      padding: 13,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const directShare = totals[index] ? direct[index] / totals[index] * 100 : 0;
        const indirectShare = totals[index] ? indirect[index] / totals[index] * 100 : 0;
        let html = `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-size:14px;font-weight:700;margin-bottom:9px">${recipients[index]}</div>`;

        if (direct[index] > 0) {
          html += `<div style="margin-bottom:5px">Direct: <strong>$${direct[index].toFixed(1)}M · ${directShare.toFixed(0)}%</strong></div>`;
        }
        if (indirect[index] > 0) {
          html += `<div style="margin-bottom:5px">Indirect: <strong>$${indirect[index].toFixed(1)}M · ${indirectShare.toFixed(0)}%</strong></div>`;
        }

        return `${html}<div style="margin-top:8px;padding-top:8px;border-top:1px solid #E5E7EB">Total: <strong>$${totals[index].toFixed(1)}M</strong></div>`;
      }
    },
    legend: {
      top: 0,
      left: 0,
      itemWidth: 14,
      itemHeight: 10,
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
      top: 45,
      bottom: 40
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
      splitLine: { lineStyle: { color: '#EDF0F2' } }
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
          formatter: (params) => `$${params.value.toFixed(1)}M`,
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
