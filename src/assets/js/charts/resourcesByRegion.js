// Initializes the regular resources by region bar chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initResourcesByRegion(el, echarts) {
  const data = [
    {
      name: 'Africa',
      value: 870,
      percent: 68,
      color: RESOURCE_COLORS.regular
    },
    {
      name: 'Asia and the Pacific',
      value: 182,
      percent: 14,
      color: SECONDARY_COLORS[0]
    },
    {
      name: 'Arab States',
      value: 128,
      percent: 10,
      color: SECONDARY_COLORS[1]
    },
    {
      name: 'Latin America and the Caribbean',
      value: 52,
      percent: 4,
      color: SECONDARY_COLORS[2]
    },
    {
      name: 'Europe and the CIS',
      value: 43,
      percent: 3,
      color: SECONDARY_COLORS[3]
    }
  ];

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    grid: {
      left: 215,
      right: 140,
      top: 10,
      bottom: 10
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const item = data[params[0].dataIndex];

        return `
          <strong>${item.name}</strong><br>
          $${item.value.toLocaleString()}M<br>
          ${item.percent}% of programmatic resources
        `;
      }
    },

    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      show: false
    },

    yAxis: {
      type: 'category',
      inverse: true,
      data: data.map((item) => item.name),

      axisLine: {
        show: false
      },

      axisTick: {
        show: false
      },

      axisLabel: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        color: '#333',
        margin: 14
      }
    },

    series: [
      {
        type: 'bar',

        data: data.map((item) => ({
          value: item.percent,
          itemStyle: {
            color: item.color
          }
        })),

        barWidth: 30,
        barCategoryGap: '45%',

        showBackground: true,

        backgroundStyle: {
          color: '#F1F1F1'
        },

        label: {
          show: true,
          position: 'right',
          distance: 8,

          formatter: function (params) {
            const item = data[params.dataIndex];

            return (
              `{pct|${item.percent}%}  ` +
              `{value|$${item.value.toLocaleString()}M}`
            );
          },

          rich: {
            pct: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#333'
            },

            value: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 14,
              color: '#666'
            }
          }
        }
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);

  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initResourcesByRegion;
import { RESOURCE_COLORS, SECONDARY_COLORS } from './chartColors';
