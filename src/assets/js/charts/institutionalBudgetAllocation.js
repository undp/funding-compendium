// Initializes the institutional budget allocation donut chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initInstitutionalBudgetAllocation(el, echarts) {
  const data = [
    {
      name: 'Management',
      value: 654.2,
      percent: 60.58,
      color: '#006EB5'
    },
    {
      name: 'Development/humanitarian activities',
      value: 301.4,
      percent: 28,
      color: '#00C4B3'
    },
    {
      name: 'Independent oversight and assurance activities',
      value: 80.2,
      percent: 7.43,
      color: '#B6D600'
    },
    {
      name: 'Special purpose',
      value: 44.1,
      percent: 4,
      color: '#B14EFF'
    }
  ];

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        const item = data[params.dataIndex];

        return `
          <strong>${item.name}</strong><br>
          $${item.value.toLocaleString()}M<br>
          ${item.percent}% of total
        `;
      }
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 30,
      itemWidth: 14,
      itemHeight: 14,
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
              `{value|$${item.value.toLocaleString()}M}`
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
          length2: 36
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
          formatter: '{total|$1.080B}\n{caption|Total}',
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
