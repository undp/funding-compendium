// Initializes the regular resources by country typology donut chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initResourcesByCountryTypology(el, echarts) {
  const data = [
    {
      name: 'Low-income countries (LICs)',
      value: 987,
      itemStyle: { color: RESOURCE_COLORS.regular }
    },
    {
      name: 'Middle-income countries (MICs)',
      value: 288,
      itemStyle: { color: SECONDARY_COLORS[0] }
    }
  ];

  const percentages = {
    'Low-income countries (LICs)': 77,
    'Middle-income countries (MICs)': 23
  };

  const displayValues = {
    'Low-income countries (LICs)': '$987M',
    'Middle-income countries (MICs)': '$288M'
  };

  const shortLabels = {
    'Low-income countries (LICs)': 'LICs',
    'Middle-income countries (MICs)': 'MICs'
  };

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        const pct = percentages[params.name];

        return `
          <strong>${params.name}</strong><br>
          ${displayValues[params.name]}<br>
          ${pct}% of programmatic resources
        `;
      }
    },

    series: [
      {
        type: 'pie',
        radius: ['54%', '78%'],
        center: ['50%', '45%'],
        startAngle: 90,
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 3
        },
        label: {
          show: true,
          position: 'outside',
          alignTo: 'edge',
          edgeDistance: 10,
          bleedMargin: 5,
          formatter: function (params) {
            const pct = percentages[params.name];

            return (
              `{name|${shortLabels[params.name]}}\n` +
              `{value|${displayValues[params.name]}}  ` +
              `{pct|${pct}%}`
            );
          },
          rich: {
            name: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#333',
              lineHeight: 20
            },
            value: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 14,
              color: '#555'
            },
            pct: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              color: '#333'
            }
          }
        },
        labelLine: {
          show: true,
          length: 18,
          length2: 20
        },
        data
      },
      {
        type: 'pie',
        radius: [0, '1%'],
        center: ['50%', '45%'],
        silent: true,
        tooltip: {
          show: false
        },
        labelLine: {
          show: false
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{total|$1.275B}\n{caption|Total}',
          rich: {
            total: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 26,
              fontWeight: 700,
              color: '#333',
              lineHeight: 34,
              align: 'center'
            },
            caption: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 14,
              fontWeight: 400,
              color: '#777',
              lineHeight: 22,
              align: 'center'
            }
          }
        },
        data: [
          {
            value: 1,
            itemStyle: {
              color: 'transparent'
            }
          }
        ]
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

export default initResourcesByCountryTypology;
import { RESOURCE_COLORS, SECONDARY_COLORS } from './chartColors';
