export function initContributionsByDonorResource(el, echarts) {
  const donorData = [
    { donor: 'Vertical fund – GEF', other: 371578945, regular: 0 },
    { donor: 'Germany', other: 221601868, regular: 105197907 },
    { donor: 'European Union', other: 312784472, regular: 0 },
    { donor: 'Vertical Fund', other: 310762558, regular: 0 },
    { donor: 'Argentina', other: 305781408, regular: 0 },
    { donor: 'Norway', other: 225463048, regular: 37343097 },
    { donor: 'Japan', other: 208745006, regular: 45391094 },
    { donor: 'MPTF', other: 233741124, regular: 0 },
    { donor: 'Sweden', other: 110882152, regular: 40911333 },
    {
      donor: 'Republic of Korea',
      other: 131564223,
      regular: 15370924
    },
    { donor: 'Gabon', other: 123262922, regular: 0 },
    { donor: 'Denmark', other: 86498670, regular: 19104386 },
    { donor: 'Guatemala', other: 98091888, regular: 0 },
    { donor: 'Saudi Arabia', other: 92705485, regular: 2000000 },
    { donor: 'Canada', other: 58632333, regular: 29325513 },
    { donor: 'The Netherlands', other: 49744666, regular: 37037037 },
    {
      donor: 'Vertical fund – Green Climate Fund',
      other: 84422285,
      regular: 0
    },
    {
      donor: 'United Kingdom',
      other: 61409719,
      regular: 14666667
    },
    { donor: 'Brazil', other: 75503188, regular: 0 },
    { donor: 'Colombia', other: 73721768, regular: 0 },
    { donor: 'World Bank Group', other: 71266739, regular: 0 },
    { donor: 'Switzerland', other: 31223598, regular: 38608749 },
    {
      donor: 'United Nations Agencies',
      other: 69396342,
      regular: 0
    },
    { donor: 'Italy', other: 58389842, regular: 0 },
    { donor: 'Qatar', other: 47124296, regular: 8000000 },
    { donor: 'Panama', other: 47172327, regular: 0 },
    { donor: 'Honduras', other: 43388032, regular: 0 },
    { donor: 'Dominica', other: 42569514, regular: 0 },
    { donor: 'Haiti', other: 40688876, regular: 0 },
    { donor: 'Cuba', other: 36997822, regular: 0 }
  ];

  donorData.sort(
    (a, b) =>
      b.other + b.regular -
      (a.other + a.regular)
  );

  const chartData = [...donorData].reverse();

  const donors = chartData.map((item) => item.donor);
  const otherResources = chartData.map((item) => item.other);
  const regularResources = chartData.map((item) => item.regular);
  const totals = chartData.map(
    (item) => item.other + item.regular
  );

  const flagUrls = {
    Germany: 'https://flagcdn.com/de.svg',
    Argentina: 'https://flagcdn.com/ar.svg',
    Norway: 'https://flagcdn.com/no.svg',
    Japan: 'https://flagcdn.com/jp.svg',
    Sweden: 'https://flagcdn.com/se.svg',
    'Republic of Korea': 'https://flagcdn.com/kr.svg',
    Gabon: 'https://flagcdn.com/ga.svg',
    Denmark: 'https://flagcdn.com/dk.svg',
    Guatemala: 'https://flagcdn.com/gt.svg',
    'Saudi Arabia': 'https://flagcdn.com/sa.svg',
    Canada: 'https://flagcdn.com/ca.svg',
    'The Netherlands': 'https://flagcdn.com/nl.svg',
    'United Kingdom': 'https://flagcdn.com/gb.svg',
    Brazil: 'https://flagcdn.com/br.svg',
    Colombia: 'https://flagcdn.com/co.svg',
    Switzerland: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Civil_Ensign_of_Switzerland_%28Pantone%29.svg/250px-Civil_Ensign_of_Switzerland_%28Pantone%29.svg.png',
    Italy: 'https://flagcdn.com/it.svg',
    Qatar: 'https://flagcdn.com/qa.svg',
    Panama: 'https://flagcdn.com/pa.svg',
    Honduras: 'https://flagcdn.com/hn.svg',
    Dominica: 'https://flagcdn.com/dm.svg',
    Haiti: 'https://flagcdn.com/ht.svg',
    Cuba: 'https://flagcdn.com/cu.svg',
    'European Union': 'https://flagcdn.com/eu.svg',
    'United Nations Agencies':
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg'
  };

  const logoUrls = {
    'Vertical fund – GEF': '../assets/img/logos/gef.png',
    MPTF: '../assets/img/logos/mptf.png',
    'Vertical fund – Green Climate Fund': '../assets/img/logos/green-climate-fund.png',
    'World Bank Group': '../assets/img/logos/wbg.png'
  };

  const logoSizes = {
    'Vertical fund – GEF': [24, 32],
    MPTF: [60, 23],
    'Vertical fund – Green Climate Fund': [56, 30],
    'World Bank Group': [54, 28]
  };

  const getFlagKey = (donor) =>
    `flag_${donor.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const richFlagStyles = {};
  const richLogoStyles = {};

  Object.entries(flagUrls).forEach(([donor, url]) => {
    richFlagStyles[getFlagKey(donor)] = {
      width: 30,
      height: 20,
      backgroundColor: {
        image: url
      },
      borderColor: '#C5CBD1',
      borderWidth: 1,
      align: 'center',
      verticalAlign: 'middle'
    };
  });

  Object.entries(logoUrls).forEach(([donor, url]) => {
    const [width, height] = logoSizes[donor];
    const resolvedUrl = new URL(url, window.location.href).href;

    richLogoStyles[getFlagKey(donor)] = {
      width,
      height,
      backgroundColor: {
        image: resolvedUrl
      },
      align: 'center',
      verticalAlign: 'middle'
    };
  });

  const formatExact = (value) =>
    Number(value).toLocaleString('en-US');

  const formatMillions = (value) =>
    `$${Math.round(value / 1000000)}M`;

  const option = {
    animationDuration: 700,

    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif',
      color: '#222222'
    },

    title: {
      /*text: 'Contributions by donor and resource type',*/
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#333333',
        fontSize: 26,
        fontWeight: 700
      }
    },

    grid: {
      left: 330,
      right: 60,
      top: 72,
      bottom: 68
    },

    legend: {
      top: 24,
      left: 'center',
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 24,
      data: [
        'Regular resources',
        'Other resources'
      ],
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#555555',
        fontSize: 15
      }
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: 'rgba(35, 46, 61, 0.035)' }
      },
      backgroundColor: '#ffffff',
      borderColor: '#d8d8d8',
      borderWidth: 0,
      padding: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#222222',
        fontSize: 13,
        lineHeight: 21
      },
      formatter: function (params) {
        const index = params[0].dataIndex;
        const item = chartData[index];
        const total = item.other + item.regular;
        const share = (value) => formatTooltipPercent(value, total);

        return detailedTooltip(item.donor, `$${formatExact(total)}`, [
          { label: 'Regular resources', color: RESOURCE_COLORS.regular, value: item.regular > 0 ? `$${formatExact(item.regular)}` : '—', detail: item.regular > 0 ? share(item.regular) : null },
          { label: 'Other resources', color: RESOURCE_COLORS.other, value: item.other > 0 ? `$${formatExact(item.other)}` : '—', detail: item.other > 0 ? share(item.other) : null }
        ]);
      }
    },

    xAxis: {
      type: 'value',
      min: 0,
      max: 400000000,
      interval: 50000000,

      nameLocation: 'middle',
      nameGap: 48,

      nameTextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#666666',
        fontSize: 13,
        fontWeight: 600
      },

      axisLine: {
        show: false
      },

      axisTick: {
        show: false
      },

      axisLabel: {
        color: '#666666',
        fontSize: 12,
        margin: 12,
        formatter: function (value) {
          return value === 0
            ? '0'
            : value / 1000000;
        }
      },

      splitLine: {
        show: true,
        lineStyle: {
          color: '#C5CBD1',
          width: 1
        }
      }
    },

    yAxis: [
      {
        type: 'category',
        data: donors,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 245,
          margin: 84,
          align: 'right',
          overflow: 'truncate',
          color: '#333333',
          fontFamily: 'Proxima Nova, Arial, sans-serif',
          fontSize: 13,
          lineHeight: 20
        }
      },
      {
        type: 'category',
        data: donors,
        position: 'left',
        offset: 32,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 64,
          margin: 10,
          align: 'center',
          formatter: function (donor) {
            if (logoUrls[donor] || flagUrls[donor]) {
              return `{${getFlagKey(donor)}|}`;
            }

            return '';
          },
          rich: {
            ...richFlagStyles,
            ...richLogoStyles
          }
        }
      }
    ],

    series: [
      {
        name: 'Regular resources',
        type: 'bar',
        stack: 'resources',
        barWidth: 18,
        barCategoryGap: '30%',
        data: regularResources,

        itemStyle: {
          color: RESOURCE_COLORS.regular,
          borderRadius: 0
        },

        emphasis: {
          focus: 'series'
        }
      },

      {
        name: 'Other resources',
        type: 'bar',
        stack: 'resources',
        barWidth: 18,
        barCategoryGap: '30%',
        data: otherResources,

        itemStyle: {
          color: RESOURCE_COLORS.other,
          borderRadius: 0
        },

        emphasis: {
          focus: 'series'
        }
      },

      {
        name: 'Total',
        type: 'scatter',
        symbolSize: 1,
        silent: true,
        z: 10,

        data: totals.map((total, index) => [
          total,
          index
        ]),

        itemStyle: {
          color: 'transparent'
        },

        label: {
          show: true,
          position: 'right',
          distance: 9,
          formatter: function (params) {
            return formatMillions(params.value[0]);
          },
          color: '#222222',
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'Proxima Nova, Arial, sans-serif'
        },

        tooltip: {
          show: false
        }
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  Object.values(logoUrls).forEach((url) => {
    const image = new Image();
    image.addEventListener('load', () => chart.resize());
    image.src = new URL(url, window.location.href).href;
  });

  const resize = () => chart.resize();

  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  chart.setOption({
    media: [{
      query: { maxWidth: 600 },
      option: {
        grid: { left: 118, right: 34, top: 50, bottom: 56 },
        legend: {
          top: 8,
          itemWidth: 18,
          itemHeight: 7,
          itemGap: 12,
          textStyle: { fontSize: 10 }
        },
        xAxis: { axisLabel: { fontSize: 9, margin: 8 } },
        yAxis: [
          {
            axisLabel: {
              width: 108,
              margin: 10,
              fontSize: 10,
              lineHeight: 13,
              overflow: 'truncate'
            }
          },
          {
            show: false,
            offset: 22,
            axisLabel: { width: 38, margin: 5 }
          }
        ],
        series: [
          { barWidth: 14 },
          { barWidth: 14 },
          { label: { fontSize: 10, distance: 5 } }
        ]
      }
    }]
  });

  return chart;
}

export default initContributionsByDonorResource;
import { RESOURCE_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
