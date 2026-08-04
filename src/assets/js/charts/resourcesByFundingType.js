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
      fontFamily: 'ProximaNova, Arial, sans-serif',
      color: '#222222'
    },

    grid: {
      left: 70,
      right: 25,
      top: 55,
      bottom: 45
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#222222',
        fontSize: 12,
        lineHeight: 20
      },
      formatter: function (params) {
        const year = params[0]?.axisValue || '';

        return [
          `<strong>${year}</strong>`,
          ...params.map((item) => {
            const usd =
              (usdValues[item.seriesName] || [])[item.dataIndex] || 0;

            return (
              `${item.marker}${item.seriesName}: ` +
              `${item.value}% — USD ${formatUsd(usd)}M`
            );
          })
        ].join('<br>');
      }
    },

    legend: {
      top: 0,
      icon: 'rect',
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#222222',
        fontSize: 11
      },
      data: ['Regular resources', 'Other resources']
    },

    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      name: 'Percentage of total resources',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        formatter: '{value}%'
      },
      splitLine: {
        show: true
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
        stack: 'total',
        barWidth: 56,
        data: regularPercentages,

        itemStyle: {
          color: '#4A90C2',
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
              `{amount|USD ${formatUsd(usd)}M}`
            );
          },

          rich: {
            percent: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 17,
              align: 'center'
            },
            amount: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#ffffff',
              fontSize: 11,
              lineHeight: 15,
              align: 'center'
            }
          }
        },

        emphasis: {
          focus: 'series'
        }
      },

      {
        name: 'Other resources',
        type: 'bar',
        stack: 'total',
        barWidth: 56,
        data: otherPercentages,

        itemStyle: {
          color: '#6FB544',
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
              `{amount|USD ${formatUsd(usd)}M}`
            );
          },

          rich: {
            percent: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 'bold',
              lineHeight: 20,
              align: 'center'
            },
            amount: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#ffffff',
              fontSize: 13,
              lineHeight: 17,
              align: 'center'
            }
          }
        },

        emphasis: {
          focus: 'series'
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