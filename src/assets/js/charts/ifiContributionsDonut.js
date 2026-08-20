const data = [
  { name: 'KfW', value: 104602576, percent: 33 },
  { name: 'World Bank Group', value: 88113014, percent: 28 },
  { name: 'Inter-American Development Bank', value: 29975774, percent: 9 },
  { name: 'Islamic Development Bank', value: 19732831, percent: 6 },
  { name: 'Development Bank of Latin America and the Caribbean (CAF)', value: 18601822, percent: 6 },
  { name: 'European Investment Bank', value: 17768782, percent: 6 },
  { name: 'IFAD', value: 17076747, percent: 5 },
  { name: 'African Development Bank', value: 10687027.90, percent: 3 },
  { name: 'Others', value: 9734086, percent: 3 }
];

const colors = CATEGORY_COLORS.slice(0, data.length);

export function initIfiContributionsDonut(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
      
      subtext: '',
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#232E3D'
      },
      subtextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
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
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#232E3D',
        fontSize: 12
      },
      formatter: function (params) {
        const item = data[params.dataIndex];
        return `<div style="font-weight:700;margin-bottom:7px">${item.name}</div>
          <div style="margin-bottom:4px">Contribution: <strong>$${(item.value / 1000000).toFixed(1)}M</strong></div>
          <div>Share: <strong>${item.percent}%</strong></div>`;
      }
    },
    color: colors,
    series: [{
      name: 'IFI contributions',
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['50%', '56%'],
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
          return `{name|${item.name}}\n{percent|${item.percent}%}`;
        },
        rich: {
          name: {
            fontFamily: 'Proxima Nova, Arial, sans-serif',
            fontSize: 11,
            lineHeight: 16,
            color: '#4B5563',
            width: 155,
            overflow: 'break'
          },
          percent: {
            fontFamily: 'Proxima Nova, Arial, sans-serif',
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
          color: '#B8BEC6',
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
      center: ['50%', '56%'],
      silent: true,
      tooltip: { show: false },
      labelLine: { show: false },
      label: {
        show: true,
        position: 'center',
        formatter: '{total|$316}\n{caption|million}',
        rich: {
          total: {
            fontFamily: 'Proxima Nova, Arial, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#232E3D',
            lineHeight: 34,
            align: 'center'
          },
          caption: {
            fontFamily: 'Proxima Nova, Arial, sans-serif',
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
import { CATEGORY_COLORS } from './chartColors';
