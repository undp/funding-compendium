// Initializes the institutional budget allocation donut chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initInstitutionalBudgetAllocation(el, echarts) {
  const data = [
    {
      name: 'Management',
      value: 507.6,
      percent: 53.4,
      color: SECONDARY_COLORS[0]
    },
    {
      name: 'Development/humanitarian activities',
      value: 328.2,
      percent: 34.5,
      color: SECONDARY_COLORS[1]
    },
    {
      name: 'Independent oversight and assurance activities',
      value: 77.7,
      percent: 8.2,
      color: SECONDARY_COLORS[2]
    },
    {
      name: 'Special purpose',
      value: 33.7,
      percent: 3.5,
      color: SECONDARY_COLORS[3]
    },
    {
      name: 'UN development coordination activities',
      value: 2.8,
      percent: 0.3,
      color: '#6B7280'
    }
  ];

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderWidth: 0,
      padding: 0,
      extraCssText: 'border-radius:0;box-shadow:0 4px 14px rgba(0,0,0,0.16);',
      textStyle: {
        color: '#263746',
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 13
      },
      formatter: function (params) {
        const item = data[params.dataIndex];

        return detailedTooltip(
          item.name,
          `$${item.value.toLocaleString('en-US')}M`,
          [{
            label: 'Share of total',
            color: item.color,
            value: `${item.percent}%`
          }]
        );
      }
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 30,
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 20,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 13,
        color: '#333',
        lineHeight: 18
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['44%', '72%'],
        center: ['50%', '43%'],
        startAngle: 90,
        avoidLabelOverlap: true,
        itemStyle: {
          borderWidth: 0
        },
        label: {
          show: true,
          position: 'outside',
          formatter: function (params) {
            const item = data[params.dataIndex];

            return (
              `{pct|${item.percent}%}\n` +
              `{value|$${item.value.toLocaleString('en-US')}M}`
            );
          },
          rich: {
            pct: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#333',
              lineHeight: 20
            },
            value: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 13,
              color: '#666'
            }
          }
        },
        labelLine: {
          show: true,
          length: 32,
          length2: 36,
          lineStyle: {
            color: '#7A8491',
            width: 1
          }
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color
          }
        }))
      },
      {
        type: 'pie',
        radius: [0, '1%'],
        center: ['50%', '43%'],
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
          formatter: '{total|$950M}\n{caption|Total}',
          rich: {
            total: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: '#333',
              lineHeight: 31,
              align: 'center'
            },
            caption: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 13,
              color: '#777',
              lineHeight: 20,
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

export default initInstitutionalBudgetAllocation;
import { SECONDARY_COLORS } from './chartColors';
import { detailedTooltip } from './detailedTooltip';
