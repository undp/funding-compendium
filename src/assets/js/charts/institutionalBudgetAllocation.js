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

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderMobileAllocation = () => {
    el.parentElement?.querySelector('.institutional-allocation-mobile')?.remove();

    let cumulativePercent = 0;
    const gradientStops = data.map((item) => {
      const start = cumulativePercent;
      cumulativePercent += (item.value / total) * 100;
      return `${item.color} ${start}% ${cumulativePercent}%`;
    }).join(', ');

    const mobile = document.createElement('div');
    mobile.className = 'rr-allocation-mobile institutional-allocation-mobile';
    mobile.setAttribute('role', 'group');
    mobile.setAttribute('aria-label', 'Institutional budget allocation');
    mobile.innerHTML = `
      <div class="rr-allocation-mobile__donut" style="--donut-gradient:${gradientStops}" aria-hidden="true">
        <div>
          <strong>$${Math.round(total)}M</strong>
          <span>Total</span>
        </div>
      </div>
      <div class="rr-allocation-mobile__list"></div>
    `;

    const list = mobile.querySelector('.rr-allocation-mobile__list');

    data.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'rr-allocation-mobile__row';
      if (index >= 2) row.hidden = true;
      row.innerHTML = `
        <div class="rr-allocation-mobile__label">
          <span><i style="--key-color:${item.color}" aria-hidden="true"></i>${item.name}</span>
          <strong>${item.percent}%</strong>
        </div>
        <span class="rr-allocation-mobile__value">$${item.value.toLocaleString('en-US')}M</span>
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
      backgroundColor: '#ffffff',
      borderWidth: 0,
      padding: 0,
      extraCssText: 'border-radius:0;box-shadow:0 4px 14px rgba(0,0,0,0.16);',
      textStyle: {
        color: '#263746',
        fontFamily: 'ProximaNova, Arial, sans-serif',
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
        fontFamily: 'ProximaNova, Arial, sans-serif',
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
              fontFamily: 'ProximaNova, Arial, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#333',
              lineHeight: 20
            },
            value: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
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
              fontFamily: 'ProximaNova, Arial, sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: '#333',
              lineHeight: 31,
              align: 'center'
            },
            caption: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
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
