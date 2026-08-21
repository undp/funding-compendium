// Initializes the regular resources by development status donut chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initResourcesByDevelopmentStatus(el, echarts) {
  const data = [
    {
      name: 'Least developed countries (LDCs)',
      value: 1062,
      itemStyle: { color: RESOURCE_COLORS.regular }
    },
    {
      name: 'Non-least developed countries',
      value: 213,
      itemStyle: { color: SECONDARY_COLORS[0] }
    }
  ];

  const percentages = {
    'Least developed countries (LDCs)': 83.3,
    'Non-least developed countries': 16.7
  };

  const displayValues = {
    'Least developed countries (LDCs)': '$1.062B',
    'Non-least developed countries': '$213M'
  };

  const shortLabels = {
    'Least developed countries (LDCs)': 'LDCs',
    'Non-least developed countries': 'Non-LDCs'
  };

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      extraCssText: 'border-radius:0;',
      formatter: function (params) {
        const pct = percentages[params.name];

        return detailedTooltip(params.name, displayValues[params.name], [
          {
            label: 'Share of programmatic resources',
            color: params.color,
            value: `${pct}%`
          }
        ]);
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
          length2: 20,
          lineStyle: {
            color: '#7A8491',
            width: 1
          }
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

export default initResourcesByDevelopmentStatus;
import { RESOURCE_COLORS, SECONDARY_COLORS } from './chartColors';
import { detailedTooltip } from './detailedTooltip';
