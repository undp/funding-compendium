// Initializes the regular resources allocation pie chart.
// el: DOM element
// echarts: imported ECharts namespace
export function initRegularResourcesAllocation(el, echarts) {
  const data = [
    {
      name: 'Country activities',
      value: 1384.4,
      styleKey: 'country',
      itemStyle: { color: RESOURCE_COLORS.regular }
    },
    {
      name: 'Regional activities',
      value: 83.4,
      styleKey: 'regional',
      itemStyle: { color: SECONDARY_COLORS[0] }
    },
    {
      name: 'Global activities',
      value: 18.7,
      styleKey: 'global',
      itemStyle: { color: SECONDARY_COLORS[1] }
    },
    {
      name: 'Consolidated development effectiveness',
      value: 82,
      styleKey: 'effectiveness',
      itemStyle: { color: SECONDARY_COLORS[2] }
    },
    {
      name: 'UN development coordination—SRC',
      value: 39.7,
      styleKey: 'coordination',
      itemStyle: { color: SECONDARY_COLORS[3] }
    }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatValue = (value) =>
    '$' + value.toLocaleString('en-US') + 'M';

  const valueStyle = (color) => ({
    fontFamily: 'ProximaNova, Arial, sans-serif',
    fontSize: 19,
    fontWeight: 700,
    color,
    lineHeight: 24
  });

  const renderMobileAllocation = () => {
    el.parentElement?.querySelector('.rr-allocation-mobile')?.remove();

    const mobile = document.createElement('div');
    mobile.className = 'rr-allocation-mobile';
    mobile.setAttribute('role', 'group');
    mobile.setAttribute('aria-label', 'Core programme budget allocation');
    let cumulativePercent = 0;
    const gradientStops = data.map((item) => {
      const start = cumulativePercent;
      cumulativePercent += (item.value / total) * 100;
      return `${item.itemStyle.color} ${start}% ${cumulativePercent}%`;
    }).join(', ');
    const countryPercent = (data[0].value / total) * 100;

    mobile.innerHTML = `
      <div class="rr-allocation-mobile__donut" style="--donut-gradient:${gradientStops}" aria-hidden="true">
        <div>
          <strong>${countryPercent.toFixed(0)}%</strong>
          <span>Country<br>activities</span>
        </div>
      </div>
      <div class="rr-allocation-mobile__total">
        <span>Total allocation</span>
        <strong>${formatValue(total)}</strong>
      </div>
      <div class="rr-allocation-mobile__list"></div>
    `;

    const list = mobile.querySelector('.rr-allocation-mobile__list');

    data
      .slice()
      .sort((a, b) => b.value - a.value)
      .forEach((item, index) => {
        const percent = (item.value / total) * 100;
        const row = document.createElement('div');
        row.className = 'rr-allocation-mobile__row';
        if (index >= 2) row.hidden = true;
        row.innerHTML = `
          <div class="rr-allocation-mobile__label">
            <span><i style="--key-color:${item.itemStyle.color}" aria-hidden="true"></i>${item.name}</span>
            <strong>${percent.toFixed(1).replace(/\.0$/, '')}%</strong>
          </div>
          <span class="rr-allocation-mobile__value">${formatValue(item.value)}</span>
        `;
        list.appendChild(row);
      });

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'rr-allocation-mobile__toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span class="show-more">Show more</span><span class="show-less">Show less</span>';
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      mobile.classList.toggle('is-list-expanded', !expanded);
      Array.from(list.children).slice(2).forEach((row) => { row.hidden = expanded; });
    });
    mobile.appendChild(toggle);

    el.insertAdjacentElement('afterend', mobile);
  };

  renderMobileAllocation();

  const option = {
    textStyle: { fontFamily: 'ProximaNova, Arial, sans-serif' },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      borderColor: '#D9D9D9',
      borderWidth: 1,
      padding: [10, 12],

      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#222'
      },

      formatter: (params) => {
        const percentage = ((params.value / total) * 100).toFixed(1).replace(/\.0$/, '');

        return `
          <div style="
            font-family: 'ProximaNova', Arial, sans-serif;
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
              fontFamily: 'ProximaNova, Arial, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              color: '#4F4F4F',
              lineHeight: 18
            },

            country: valueStyle('#637300'),
            regional: valueStyle(SECONDARY_COLORS[0]),

            // Slightly darker than the actual slice
            // for accessibility/readability on white.
            global: valueStyle(SECONDARY_COLORS[1]),

            // Darker yellow/orange for better contrast.
            effectiveness: valueStyle(SECONDARY_COLORS[2]),

            coordination: valueStyle(SECONDARY_COLORS[3])
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
            'Consolidated development effectiveness': -12,
            'UN development coordination—SRC': -26
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
import { RESOURCE_COLORS, SECONDARY_COLORS } from './chartColors';
