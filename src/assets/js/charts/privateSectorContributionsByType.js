const years = ['2022', '2023', '2024', '2025'];
const privateCompanies = [32.808552, 50.175570, 39.966910, 39.816444];
const foundations = [25.071339, 28.387937, 37.686066, 28.967314];
const ngos = [5.554821, 7.552502, 15.446611, 19.918648];
const academic = [0.491626, 0.520953, 1.169130, 0.728344];
const totals = [63.926338, 86.636961, 94.268717, 89.430750];

export function initPrivateSectorContributionsByType(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {

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
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(35, 46, 61, 0.035)' } },
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
        return detailedTooltip(years[index], amount(totals[index]), [
          { label: 'Private companies', color: SECONDARY_COLORS[0], value: amount(privateCompanies[index]), detail: share(privateCompanies[index]) },
          { label: 'Foundations', color: SECONDARY_COLORS[1], value: amount(foundations[index]), detail: share(foundations[index]) },
          { label: 'NGOs', color: SECONDARY_COLORS[2], value: amount(ngos[index]), detail: share(ngos[index]) },
          { label: 'Academic, training &amp; research', color: SECONDARY_COLORS[3], value: amount(academic[index]), detail: share(academic[index]) }
        ]);
      }
    },
    legend: {
      bottom: 5,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 22,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 11,
        color: '#4B5563'
      },
      data: [
        'Private companies',
        'Foundations',
        'NGOs',
        'Academic, training & research institutions'
      ]
    },
    grid: {
      left: 60,
      right: 35,
      top: 95,
      bottom: 75
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#C9CED4' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#4B5563',
        fontSize: 12,
        margin: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      interval: 25,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 10,
        formatter: (value) => `$${value}M`
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    series: [
      {
        name: 'Private companies',
        type: 'bar',
        stack: 'total',
        data: privateCompanies,
        barWidth: 86,
        itemStyle: { color: SECONDARY_COLORS[0] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 600
        }
      },
      {
        name: 'Foundations',
        type: 'bar',
        stack: 'total',
        data: foundations,
        barWidth: 86,
        itemStyle: { color: SECONDARY_COLORS[1] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 600
        }
      },
      {
        name: 'NGOs',
        type: 'bar',
        stack: 'total',
        data: ngos,
        barWidth: 86,
        itemStyle: { color: SECONDARY_COLORS[2] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}`,
          color: '#ffffff',
          fontSize: 11,
          fontWeight: 600
        }
      },
      {
        name: 'Academic, training & research institutions',
        type: 'bar',
        stack: 'total',
        data: academic,
        barWidth: 86,
        itemStyle: { color: SECONDARY_COLORS[3] },
        label: { show: false }
      },
      {
        name: 'Total',
        type: 'line',
        data: totals,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#253746', width: 2.5 },
        itemStyle: { color: '#253746' },
        label: {
          show: true,
          position: 'top',
          distance: 8,
          formatter: (params) => `$${Math.round(params.value)}M`,
          color: '#253746',
          fontSize: 11,
          fontWeight: 700
        },
        z: 20
      }
    ]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initPrivateSectorContributionsByType;
import { SECONDARY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
