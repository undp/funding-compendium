const contributors = [
  'Vertical fund—GEF',
  'European Union',
  'Vertical Fund—GFATM',
  'Argentina',
  'Multi-Partner Trust Funds',
  'Norway',
  'Germany',
  'Japan',
  'Republic of Korea',
  'Gabon',
  'Sweden',
  'Guatemala',
  'Saudi Arabia',
  'Denmark',
  'Vertical fund - Green Climate Fund',
  'Brazil',
  'Colombia',
  'World Bank Group',
  'United Nations Agencies',
  'United Kingdom'
];

const values = [
  371.578945,
  312.784472,
  310.762558,
  305.781408,
  233.741124,
  225.463048,
  221.601868,
  208.745006,
  131.564223,
  123.262922,
  110.882152,
  98.091888,
  92.705485,
  86.498670,
  84.422285,
  75.503188,
  73.721768,
  71.266739,
  69.396342,
  61.409719
];

const flagUrls = {
  'European Union': 'https://flagcdn.com/eu.svg',
  Argentina: 'https://flagcdn.com/ar.svg',
  Norway: 'https://flagcdn.com/no.svg',
  Germany: 'https://flagcdn.com/de.svg',
  Japan: 'https://flagcdn.com/jp.svg',
  'Republic of Korea': 'https://flagcdn.com/kr.svg',
  Gabon: 'https://flagcdn.com/ga.svg',
  Sweden: 'https://flagcdn.com/se.svg',
  Guatemala: 'https://flagcdn.com/gt.svg',
  'Saudi Arabia': 'https://flagcdn.com/sa.svg',
  Denmark: 'https://flagcdn.com/dk.svg',
  Brazil: 'https://flagcdn.com/br.svg',
  Colombia: 'https://flagcdn.com/co.svg',
  'United Nations Agencies': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg',
  'United Kingdom': 'https://flagcdn.com/gb.svg'
};

const logoPaths = {
  'Vertical fund—GEF': '../assets/img/logos/gef.png',
  'Vertical Fund—GFATM': '../assets/img/logos/gfatm.png',
  'Multi-Partner Trust Funds': '../assets/img/logos/mptf.png',
  'Vertical fund - Green Climate Fund': '../assets/img/logos/green-climate-fund.png',
  'World Bank Group': '../assets/img/logos/wbg.png'
};

const logoSizes = {
  'Vertical fund—GEF': [24, 32],
  'Vertical Fund—GFATM': [25, 30],
  'Multi-Partner Trust Funds': [60, 23],
  'Vertical fund - Green Climate Fund': [56, 30],
  'World Bank Group': [54, 28]
};

const tooltipNames = {
  'Vertical fund—GEF': 'Global Environment Facility',
  'Vertical Fund—GFATM': 'The Global Fund to Fight AIDS, Tuberculosis and Malaria'
};

const visualKey = (name) => `visual_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;

const flagStyles = Object.fromEntries(
  Object.entries(flagUrls).map(([name, url]) => [visualKey(name), {
    width: 28,
    height: 18,
    backgroundColor: { image: url },
    borderColor: '#C5CBD1',
    borderWidth: 1,
    align: 'center',
    verticalAlign: 'middle'
  }])
);

export function initTopOtherResourcesContributors(el, echarts) {
  const chart = echarts.init(el);
  const logoUrls = Object.fromEntries(
    Object.entries(logoPaths).map(([name, path]) => [name, new URL(path, window.location.href).href])
  );
  const logoStyles = Object.fromEntries(
    Object.entries(logoUrls).map(([name, url]) => [visualKey(name), {
      width: logoSizes[name][0],
      height: logoSizes[name][1],
      backgroundColor: { image: url },
      align: 'center',
      verticalAlign: 'middle'
    }])
  );

  chart.setOption({
    
    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#D8DDE3',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 13
      },
      formatter: function (params) {
        const item = params[0];
        const exactValue = Math.round(item.value * 1000000).toLocaleString('en-US');
        const displayName = tooltipNames[item.name] || item.name;

        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:6px">${displayName}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Other resources: <strong>$${exactValue}</strong></div>`;
      }
    },
    grid: {
      left: 330,
      right: 100,
      top: 0,
      bottom: 45
    },
    xAxis: {
      type: 'value',
      max: 400,
      interval: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: {
        lineStyle: { color: '#C5CBD1' }
      }
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        data: contributors,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          color: '#2F3742',
          fontSize: 12,
          lineHeight: 20,
          margin: 84,
          width: 245,
          align: 'right',
          overflow: 'truncate'
        }
      },
      {
        type: 'category',
        inverse: true,
        data: contributors,
        position: 'left',
        offset: 32,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          width: 64,
          margin: 10,
          align: 'center',
          formatter: function (name) {
            return flagUrls[name] || logoUrls[name] ? `{${visualKey(name)}|}` : '';
          },
          rich: {
            ...flagStyles,
            ...logoStyles
          }
        }
      }
    ],
    series: [{
      name: 'Other Resources',
      type: 'bar',
      data: values,
      barWidth: 16,
      itemStyle: { color: RESOURCE_COLORS.other },
      label: {
        show: true,
        position: 'right',
        distance: 9,
        formatter: (params) => `$${Math.round(params.value)}M`,
        color: '#4B5563',
        fontSize: 12,
        fontWeight: 400
      },
      emphasis: {
        itemStyle: { color: RESOURCE_COLORS.other, opacity: 0.82 }
      }
    }]
  });

  [...Object.values(flagUrls), ...Object.values(logoUrls)].forEach((url) => {
    const image = new Image();
    image.addEventListener('load', () => chart.resize());
    image.src = url;
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopOtherResourcesContributors;
import { RESOURCE_COLORS } from './chartColors';
