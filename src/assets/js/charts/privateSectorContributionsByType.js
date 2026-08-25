const years = ['2022', '2023', '2024', '2025'];
const privateCompanies = [32.808552, 50.175570, 39.966910, 39.816444];
const foundations = [25.071339, 28.387937, 37.686066, 28.967314];
const ngos = [5.554821, 7.552502, 15.446611, 19.918648];
const academic = [0.491626, 0.520953, 1.169130, 0.728344];
const totals = [63.926338, 86.636961, 94.268717, 89.430750];
const privateSectorColors = ['#0069B3', '#8964BC', '#E86B2E', '#AD7F00'];

export function initPrivateSectorContributionsByType(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    
    textStyle: { fontFamily: 'ProximaNova, Arial, sans-serif' },
    title: {

      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 14,
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
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 14
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const amount = (value) => `$${value.toFixed(1).replace(/\.0$/, '')}M`;
        const share = (value) => formatTooltipPercent(value, totals[index]);
        return detailedTooltip(years[index], amount(totals[index]), [
          { label: 'Private companies', color: privateSectorColors[0], value: amount(privateCompanies[index]), detail: share(privateCompanies[index]) },
          { label: 'Foundations', color: privateSectorColors[1], value: amount(foundations[index]), detail: share(foundations[index]) },
          { label: 'NGOs', color: privateSectorColors[2], value: amount(ngos[index]), detail: share(ngos[index]) },
          { label: 'Academic, training &amp; research', color: privateSectorColors[3], value: amount(academic[index]), detail: share(academic[index]) }
        ]);
      }
    },
    legend: [
      {
        bottom: 31,
        left: 'center',
        icon: 'rect',
        itemWidth: 24,
        itemHeight: 8,
        itemGap: 22,
        textStyle: {
          fontFamily: 'ProximaNova, Arial, sans-serif',
          fontSize: 13,
          color: '#4B5563'
        },
        data: ['Private companies', 'Foundations', 'NGOs']
      },
      {
        bottom: 5,
        left: 'center',
        icon: 'rect',
        itemWidth: 24,
        itemHeight: 8,
        itemGap: 22,
        textStyle: {
          fontFamily: 'ProximaNova, Arial, sans-serif',
          fontSize: 13,
          color: '#4B5563'
        },
        data: [
          'Academic, training & research institutions',
          {
            name: 'Total',
            icon: 'path://M0,3 L24,3 L24,5 L0,5 Z',
            itemStyle: { color: '#253746', borderColor: '#253746', borderWidth: 0 }
          }
        ]
      }
    ],
    grid: {
      left: 60,
      right: 35,
      top: 22,
      bottom: 112
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: { lineStyle: { color: '#C9CED4' } },
      axisTick: { show: false },
      axisLabel: {
        color: '#4B5563',
        fontSize: 14,
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
        fontSize: 12,
        formatter: (value) => `$${value}M`
      },
      splitLine: { show: true, lineStyle: { color: '#C5CBD1', width: 1, type: 'solid' } }
    },
    series: [
      {
        name: 'Private companies',
        type: 'bar',
        stack: 'total',
        data: privateCompanies,
        barWidth: 86,
        itemStyle: { color: privateSectorColors[0] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}`,
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 600
        }
      },
      {
        name: 'Foundations',
        type: 'bar',
        stack: 'total',
        data: foundations,
        barWidth: 86,
        itemStyle: { color: privateSectorColors[1] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}`,
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 600
        }
      },
      {
        name: 'NGOs',
        type: 'bar',
        stack: 'total',
        data: ngos,
        barWidth: 86,
        itemStyle: { color: privateSectorColors[2] },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => `$${Math.round(params.value)}`,
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 600
        }
      },
      {
        name: 'Academic, training & research institutions',
        type: 'bar',
        stack: 'total',
        data: academic,
        barWidth: 86,
        itemStyle: { color: privateSectorColors[3] },
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
          fontSize: 13,
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
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
