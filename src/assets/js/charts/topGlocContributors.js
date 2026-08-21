const countries = [
  'South Sudan',
  'Iraq',
  'Angola',
  'South Africa',
  'Nigeria',
  'Indonesia',
  "Côte D'Ivoire",
  'Lebanon',
  'Pakistan',
  'Ecuador'
];

const arrears = [0, 2.178347, 2.050960, 0, 0, 0, 0.593283, 0.482320, 0.605378, 0.751422];
const currentYear = [4.104243, 0.541441, 0, 1.561569, 0, 1.020358, 0.433866, 0.486082, 0.249447, 0.020918];
const inKind = [0, 0, 0.146696, 0.156477, 1.367872, 0.265233, 0.085263, 0, 0, 0];
const totals = [4.104243, 2.719788, 2.197656, 1.718046, 1.367872, 1.285591, 1.112412, 0.968402, 0.854825, 0.772340];

const flagCodes = {
  'South Sudan': 'ss',
  Iraq: 'iq',
  Angola: 'ao',
  'South Africa': 'za',
  Nigeria: 'ng',
  Indonesia: 'id',
  "Côte D'Ivoire": 'ci',
  Lebanon: 'lb',
  Pakistan: 'pk',
  Ecuador: 'ec'
};

const flagUrls = Object.fromEntries(
  Object.entries(flagCodes).map(([name, code]) => [name, `https://flagcdn.com/${code}.svg`])
);

const flagKey = (name) => `flag_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
const flagStyles = Object.fromEntries(
  Object.entries(flagUrls).map(([name, url]) => [flagKey(name), {
    width: 28,
    height: 18,
    backgroundColor: { image: url },
    borderColor: '#C5CBD1',
    borderWidth: 1,
    align: 'center',
    verticalAlign: 'middle'
  }])
);

export function initTopGlocContributors(el, echarts) {
  const option = {
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
        fontSize: 13,
        color: '#6B7280'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'transparent' } },
      backgroundColor: '#ffffff',
      borderColor: '#D1D5DB',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const format = (value) => `$${(value * 1000000).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
        const share = (value) => formatTooltipPercent(value, totals[index]);

        return detailedTooltip(countries[index], format(totals[index]), [
          { label: 'Arrears', color: SECONDARY_COLORS[0], value: arrears[index] > 0 ? format(arrears[index]) : '—', detail: arrears[index] > 0 ? share(arrears[index]) : null },
          { label: 'Current year payment', color: SECONDARY_COLORS[1], value: currentYear[index] > 0 ? format(currentYear[index]) : '—', detail: currentYear[index] > 0 ? share(currentYear[index]) : null },
          { label: 'In-kind', color: SECONDARY_COLORS[2], value: inKind[index] > 0 ? format(inKind[index]) : '—', detail: inKind[index] > 0 ? share(inKind[index]) : null }
        ]);
      }
    },
    legend: {
      top: 50,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 22,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#4B5563'
      }
    },
    grid: {
      left: 235,
      right: 80,
      top: 100,
      bottom: 35
    },
    xAxis: {
      type: 'value',
      max: 4,
      interval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#6B7280',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        data: countries,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 160,
          align: 'right',
          color: '#232E3D',
          fontSize: 12,
          lineHeight: 20,
          margin: 58
        }
      },
      {
        type: 'category',
        inverse: true,
        data: countries,
        position: 'left',
        offset: 20,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 34,
          align: 'center',
          margin: 8,
          formatter: function (name) {
            return `{${flagKey(name)}|}`;
          },
          rich: flagStyles
        }
      }
    ],
    series: [
      {
        name: 'Arrears',
        type: 'bar',
        clip: false,
        stack: 'total',
        barWidth: 22,
        data: arrears,
        itemStyle: { color: SECONDARY_COLORS[0] }
      },
      {
        name: 'Current year payment',
        type: 'bar',
        clip: false,
        stack: 'total',
        barWidth: 22,
        data: currentYear,
        itemStyle: { color: SECONDARY_COLORS[1] }
      },
      {
        name: 'In-kind',
        type: 'bar',
        clip: false,
        stack: 'total',
        barWidth: 22,
        data: inKind,
        itemStyle: { color: SECONDARY_COLORS[2] }
      },
      {
        type: 'bar',
        clip: false,
        data: totals,
        barWidth: 22,
        barGap: '-100%',
        silent: true,
        itemStyle: { color: 'transparent' },
        label: {
          show: true,
          position: 'right',
          distance: 8,
          formatter: (params) => `$${params.value.toFixed(2)}M`,
          color: '#232E3D',
          fontSize: 12,
          fontWeight: 700
        },
        z: 10
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  // South Sudan extends beyond the $4M axis. Use one continuous custom row
  // band so its hover state reaches the true end of the stacked bar.
  const rowHighlightId = 'gloc-contributor-row-highlight';
  chart.on('mouseover', (params) => {
    if (params.seriesType !== 'bar' || params.seriesName === undefined) return;

    const axisStart = chart.convertToPixel({ xAxisIndex: 0 }, 0);
    const axisEnd = chart.convertToPixel({ xAxisIndex: 0 }, 4);
    const highlightEnd = params.dataIndex === 0
      ? chart.convertToPixel({ xAxisIndex: 0 }, totals[0])
      : axisEnd;
    const rowCenter = chart.convertToPixel({ yAxisIndex: 0 }, countries[params.dataIndex]);
    const adjacentIndex = params.dataIndex === countries.length - 1
      ? params.dataIndex - 1
      : params.dataIndex + 1;
    const nextRowCenter = chart.convertToPixel({ yAxisIndex: 0 }, countries[adjacentIndex]);
    const rowHeight = Math.abs(nextRowCenter - rowCenter);

    chart.setOption({
      graphic: [{
        id: rowHighlightId,
        type: 'rect',
        silent: true,
        z: 1,
        shape: {
          x: axisStart,
          y: rowCenter - rowHeight / 2,
          width: Math.max(0, highlightEnd - axisStart),
          height: rowHeight
        },
        style: { fill: 'rgba(35, 46, 61, 0.035)' }
      }]
    });
  });

  const clearRowHighlight = () => {
    chart.setOption({
      graphic: [{ id: rowHighlightId, $action: 'remove' }]
    });
  };

  chart.on('mouseout', (params) => {
    if (params.seriesType === 'bar') clearRowHighlight();
  });
  chart.on('globalout', clearRowHighlight);

  Object.values(flagUrls).forEach((url) => {
    const image = new Image();
    image.addEventListener('load', () => chart.resize());
    image.src = url;
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopGlocContributors;
import { SECONDARY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
