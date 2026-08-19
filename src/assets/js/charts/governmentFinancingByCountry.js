const countries = [
  'Argentina', 'Gabon', 'Guatemala', 'Colombia', 'Brazil', 'Panama',
  'Honduras', 'Dominica', 'Haiti', 'Saudi Arabia', 'Cuba', 'Uruguay',
  'Angola', 'Egypt', 'Turkmenistan', 'Morocco', 'Serbia', 'Montenegro',
  'Indonesia', 'India', 'Dominican Republic', 'Paraguay', 'Türkiye',
  'Bolivia', 'Ethiopia', 'Zambia',
  'Cameroon', 'Kazakhstan', 'Peru', 'Chile'
];

const values = [
  305.771408, 123.262922, 98.091888, 73.420221, 71.738041, 47.195679,
  43.388032, 42.569514, 40.688876, 39.723288, 36.997822, 36.185979,
  32.689568, 31.163880, 22.562688, 21.701618, 20.583841, 20.266471,
  19.242852, 18.448555, 17.459120, 17.316658, 17.306547, 15.066996,
  14.306534, 13.297705, 11.371325, 11.245327, 9.865238, 9.387963
];

export function initGovernmentFinancingByCountry(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    backgroundColor: '#ffffff',
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
      
      subtext: '$M · Last updated 26 June 2026',
      left: 0,
      top: 0,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: '#2B2A29'
      },
      subtextStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 12,
        color: '#807973'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: '#DDD6D0',
      borderWidth: 1,
      padding: 12,
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#2B2A29',
        fontSize: 12
      },
      formatter: function (params) {
        const item = params[0];
        const exact = Math.round(item.value * 1000000).toLocaleString('en-US');
        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:6px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Government financing: <strong>$${exact}</strong></div>`;
      }
    },
    grid: {
      left: 215,
      right: 85,
      top: 90,
      bottom: 45
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 330,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#877F79',
        fontSize: 11,
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#EEE9E5' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: countries,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#3B3734',
        fontSize: 11,
        lineHeight: 14,
        margin: 13,
        width: 185,
        overflow: 'break'
      }
    },
    series: [{
      name: 'Government financing',
      type: 'bar',
      data: values,
      barWidth: 12,
      itemStyle: {
        color: function (params) {
          if (params.dataIndex === 0) return '#D95F59';
          if (params.dataIndex <= 4) return '#E48269';
          if (params.dataIndex <= 9) return '#D99A77';
          return '#D8B49A';
        }
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        formatter: function (params) {
          return params.value >= 100
            ? `$${params.value.toFixed(0)}M`
            : `$${params.value.toFixed(1)}M`;
        },
        color: '#514944',
        fontSize: 10,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: { color: '#C94C46' }
      }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initGovernmentFinancingByCountry;
