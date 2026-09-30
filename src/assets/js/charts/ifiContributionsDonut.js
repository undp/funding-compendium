const data = [
  { name: 'KfW', value: 104602576, percent: 33 },
  { name: 'World Bank Group', value: 88113014, percent: 28 },
  // Balanced whole-number rounding keeps the displayed shares at 100%.
  { name: 'Inter-American Development Bank', value: 29975774, percent: 10 },
  { name: 'Islamic Development Bank', value: 19732831, percent: 6 },
  { name: 'Development Bank of Latin America and the Caribbean (CAF)', value: 18601822, percent: 6 },
  { name: 'European Investment Bank', value: 17768782, percent: 6 },
  { name: 'IFAD', value: 17076747, percent: 5 },
  { name: 'African Development Bank', value: 10687027.90, percent: 3 },
  { name: 'Others', value: 9734086, percent: 3 }
];

const colors = [
  '#C3D51F',
  '#3D9999',
  '#E86B2E',
  '#B94E1C',
  '#9BBE22',
  '#6EB3B3',
  '#D8E55C',
  '#B94E1C',
  '#267878'
];

const displayNames = {
  'Development Bank of Latin America and the Caribbean (CAF)':
    'CAF'
};

const mobileDisplayNames = {
  'KfW': 'Kreditanstalt für Wiederaufbau (KfW)',
  'Development Bank of Latin America and the Caribbean (CAF)':
    'Development Bank of Latin America and the Caribbean (CAF)',
  'IFAD': 'International Fund for Agricultural Development (IFAD)'
};

export function initIfiContributionsDonut(el, echarts) {
  el.parentElement?.querySelector('.ifi-contributions-mobile')?.remove();

  const mobile = document.createElement('div');
  mobile.className = 'rr-allocation-mobile ifi-contributions-mobile';
  mobile.setAttribute('role', 'group');
  mobile.setAttribute('aria-label', 'Total contributions by international financial institution');
  let cumulativePercent = 0;
  const gradientStops = data.map((item, index) => {
    const start = cumulativePercent;
    cumulativePercent += item.percent;
    return `${colors[index]} ${start}% ${cumulativePercent}%`;
  }).join(', ');

  mobile.innerHTML = `
    <div class="rr-allocation-mobile__donut" style="--donut-gradient:${gradientStops}" aria-hidden="true">
      <div><strong>$316M</strong><span>Total</span></div>
    </div>
    <div class="rr-allocation-mobile__total">
      <span>Total contributions</span><strong>$316M</strong>
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
        <span><i style="--key-color:${colors[index]}" aria-hidden="true"></i>${mobileDisplayNames[item.name] || item.name}</span>
        <strong>${item.percent}%</strong>
      </div>
      <span class="rr-allocation-mobile__value">$${(item.value / 1000000).toFixed(1).replace(/\.0$/, '')}M</span>
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

  const chart = echarts.init(el);

  chart.setOption({
    
    textStyle: { fontFamily: 'ProximaNova, Arial, sans-serif' },
    title: {
      
      subtext: '',
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 14,
        color: '#7A838F'
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 14
      },
      formatter: function (params) {
        const item = data[params.dataIndex];
        return `<div style="font-weight:700;margin-bottom:7px">${item.name}</div>
          <div style="margin-bottom:4px">Contribution: <strong>$${(item.value / 1000000).toFixed(1).replace(/\.0$/, '')}M</strong></div>
          <div>Share: <strong>${item.percent}%</strong></div>`;
      }
    },
    color: colors,
    series: [{
      name: 'IFI contributions',
      type: 'pie',
      radius: ['36%', '58%'],
      center: ['63%', '54%'],
      startAngle: 90,
      clockwise: true,
      avoidLabelOverlap: true,
      minAngle: 2,
      itemStyle: {
        borderWidth: 0
      },
      label: {
        show: true,
        position: 'outside',
        formatter: function (params) {
          const item = data[params.dataIndex];
          return `{name|${displayNames[item.name] || item.name}}\n{percent|${item.percent}%}`;
        },
        rich: {
          name: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 13,
            lineHeight: 16,
            color: '#4B5563',
            width: 155,
            overflow: 'break'
          },
          percent: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 13,
            lineHeight: 19,
            fontWeight: 700,
            color: '#232E3D'
          }
        }
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 12,
        lineStyle: {
          color: '#7A8491',
          width: 1
        }
      },
      emphasis: {
        scale: true,
        scaleSize: 6
      },
      data: data.map((item) => ({
        name: item.name,
        value: item.value
      }))
    }, {
      type: 'pie',
      radius: [0, '1%'],
      center: ['63%', '54%'],
      silent: true,
      tooltip: { show: false },
      labelLine: { show: false },
      label: {
        show: true,
        position: 'center',
        formatter: '{total|$316}\n{caption|million}',
        rich: {
          total: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#232E3D',
            lineHeight: 34,
            align: 'center'
          },
          caption: {
            fontFamily: 'ProximaNova, Arial, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            color: '#4B5563',
            lineHeight: 20,
            align: 'center'
          }
        }
      },
      data: [{ value: 1, itemStyle: { color: 'transparent' } }]
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initIfiContributionsDonut;
