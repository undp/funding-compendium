// Initializes the regular resources allocation pie chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initRegularResourcesAllocation(el, echarts) {
  const data = [
    {
      name: 'Country activities',
      value: 1393,
      styleKey: 'country',
      itemStyle: { color: '#4472C4' }
    },
    {
      name: 'Regional activities',
      value: 83,
      styleKey: 'regional',
      itemStyle: { color: '#ED7D31' }
    },
    {
      name: 'Global activities',
      value: 19,
      styleKey: 'global',
      itemStyle: { color: '#A5A5A5' }
    },
    {
      name: 'Consolidated Development Effectiveness',
      value: 83,
      styleKey: 'effectiveness',
      itemStyle: { color: '#FFC000' }
    },
    {
      name: 'UN Development Coordination - SRC',
      value: 40,
      styleKey: 'coordination',
      itemStyle: { color: '#5B9BD5' }
    }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatValue = (value) =>
    '$' + value.toLocaleString('en-US') + 'M';

  const valueStyle = (color) => ({
    fontFamily: 'Proxima Nova, Arial, sans-serif',
    fontSize: 19,
    fontWeight: 700,
    color,
    lineHeight: 24
  });

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      borderColor: '#D9D9D9',
      borderWidth: 1,
      padding: [10, 12],

      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#222'
      },

      formatter: (params) => {
        const percentage = ((params.value / total) * 100).toFixed(1);

        return `
          <div style="
            font-family: 'Proxima Nova', Arial, sans-serif;
            min-width: 90px;
          ">
            <div style="
              font-size: 12px;
              color: #777;
              margin-bottom: 3px;
            ">
              Share of total
            </div>

            <div style="
              font-size: 20px;
              font-weight: 700;
              color: #222;
            ">
              ${percentage}%
            </div>
          </div>
        `;
      }
    },

    series: [
      {
        type: 'pie',

        // Better suited to the wide, relatively short website container.
        radius: '68%',
        center: ['52%', '51%'],

        startAngle: 90,
        clockwise: true,

        avoidLabelOverlap: true,

        itemStyle: {
          borderWidth: 0
        },

        label: {
          show: true,
          position: 'outside',

          // Important:
          // don't align labels all the way to the chart edge.
          alignTo: 'none',

          distanceToLabelLine: 7,

          formatter: (params) => {
            const key = params.data.styleKey;

            return (
              `{name|${params.name}}\n` +
              `{${key}|${formatValue(params.value)}}`
            );
          },

          rich: {
            name: {
              fontFamily: 'Proxima Nova, Arial, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              color: '#4F4F4F',
              lineHeight: 18
            },

            country: valueStyle('#4472C4'),
            regional: valueStyle('#ED7D31'),

            // Slightly darker than the actual slice
            // for accessibility/readability on white.
            global: valueStyle('#7F7F7F'),

            // Darker yellow/orange for better contrast.
            effectiveness: valueStyle('#C18400'),

            coordination: valueStyle('#5B9BD5')
          }
        },

        labelLine: {
          show: true,

          // First section leaving the slice
          length: 18,

          // Horizontal section before label
          length2: 30,

          minTurnAngle: 80,

          lineStyle: {
            width: 1,
            color: '#999'
          }
        },

        /*
         * Only stagger vertically.
         *
         * The previous version also moved labels horizontally
         * with dx values such as -70px. That caused the huge
         * diagonal connector lines in a wide responsive container.
         */
        labelLayout: (params) => {
          const name = data[params.dataIndex]?.name;

          const verticalOffsets = {
            'Country activities': 8,
            'Regional activities': 14,
            'Global activities': 2,
            'Consolidated Development Effectiveness': -12,
            'UN Development Coordination - SRC': -26
          };

          const dy = verticalOffsets[name] || 0;

          const result = {
            y: params.labelRect.y + dy,
            hideOverlap: false,
            moveOverlap: 'shiftY'
          };

          /*
           * If ECharts provides the connector points,
           * move the final point with the label.
           *
           * This keeps the leader line attached cleanly
           * after we stagger the labels vertically.
           */
          if (params.labelLinePoints) {
            const points = params.labelLinePoints.map((point) => [...point]);

            points[2][1] += dy;

            result.labelLinePoints = points;
          }

          return result;
        },

        emphasis: {
          scale: true,
          scaleSize: 4,

          itemStyle: {
            borderWidth: 0,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.12)'
          }
        },

        data
      }
    ]
  };

  const chart = echarts.init(el);

  chart.setOption(option);

  const resize = () => {
    chart.resize();
  };

  window.addEventListener('resize', resize);

  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initRegularResourcesAllocation;
