// Initializes the "Resources by funding type" chart into the given element.
// el: DOM element
// echarts: imported ECharts namespace
export function initResourcesByFundingType(el, echarts) {
  // Read configuration from data attributes where available.
  let years = ['2025', '2024'];

  let usdValues = {
    'Regular resources': [442, 581],
    'Other resources': [4598, 4344]
  };

  try {
    if (el.dataset.years) {
      years = JSON.parse(el.dataset.years);
    }
  } catch (error) {
    // Keep default values if parsing fails.
  }

  try {
    if (el.dataset.usd) {
      usdValues = JSON.parse(el.dataset.usd);
    }
  } catch (error) {
    // Keep default values if parsing fails.
  }

  const regularPercentages = (el.dataset.regular || '9,12')
    .split(',')
    .map(Number);

  const otherPercentages = (el.dataset.other || '91,88')
    .split(',')
    .map(Number);

  const formatUsd = (value) =>
    Number(value || 0).toLocaleString('en-US');

  const option = {
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif',
      color: '#222222'
    },

    grid: {
      left: 70,
      right: 25,
      top: 10,
      bottom: 60
    },

    tooltip: {
      show: false
    },

    legend: {
      top: 'auto',
      bottom: 0,
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#222222',
        fontSize: 15
      },
      data: ['Regular resources', 'Other resources']
    },

    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        formatter: '{value}%'
      },
      splitLine: {
        show: true,
        lineStyle: { color: '#C5CBD1' }
      }
    },

    yAxis: {
      type: 'category',
      inverse: true,
      data: years,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },

    series: [
      {
        name: 'Regular resources',
        type: 'bar',
        silent: true,
        stack: 'total',
        barWidth: 56,
        data: regularPercentages,

        itemStyle: {
          color: RESOURCE_COLORS.regular,
          borderRadius: 0
        },

        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            const usd =
              (usdValues['Regular resources'] || [])[params.dataIndex] || 0;

            return (
              `{percent|${params.value}%}\n` +
              `{amount|$${formatUsd(usd)}M}`
            );
          },

          rich: {
            percent: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              color: '#283000',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 20,
              align: 'center'
            },
            amount: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              color: '#283000',
              fontSize: 13,
              lineHeight: 17,
              align: 'center'
            }
          }
        },

        emphasis: {
          disabled: true
        }
      },

      {
        name: 'Other resources',
        type: 'bar',
        silent: true,
        stack: 'total',
        barWidth: 56,
        data: otherPercentages,

        itemStyle: {
          color: RESOURCE_COLORS.other,
          borderRadius: 0
        },

        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            const usd =
              (usdValues['Other resources'] || [])[params.dataIndex] || 0;

            return (
              `{percent|${params.value}%}\n` +
              `{amount|$${formatUsd(usd)}M}`
            );
          },

          rich: {
            percent: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 20,
              align: 'center'
            },
            amount: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              color: '#ffffff',
              fontSize: 13,
              lineHeight: 17,
              align: 'center'
            }
          }
        },

        emphasis: {
          disabled: true
        }
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);

  // Store references for potential teardown.
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initResourcesByFundingType;
import { RESOURCE_COLORS } from './chartColors';
