const funds = [
  'Peacebuilding Fund',
  'Somalia Joint Fund',
  'Uzbekistan Vision 2030 Fund',
  'DRC Fonds National REDD',
  'Trust Fund for Peace in Colombia',
  'Special Trust Fund for Afghanistan',
  'Joint SDG Fund',
  'Central African Forest Initiative',
  'South Sudan RSRTF',
  'UN-REDD Programme Fund',
  'Papua New Guinea UN Country Fund II',
  'Systematic Observations Financing Facility',
  'Spotlight Initiative 2.0 Fund',
  'Global Disability Fund',
  'JP OPT Sawasya III'
];

const values = [
  40.987864,
  16.017976,
  15.991372,
  13.234994,
  12.341197,
  11.930920,
  11.131859,
  10.344107,
  9.322698,
  7.938622,
  7.397133,
  5.962281,
  5.562490,
  4.766646,
  4.608071
];

export function initTopUnPooledFunds(el, echarts) {
  const chart = echarts.init(el);

  chart.setOption({
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    title: {
      subtext: 'Net funded amount · $ millions',
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
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
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
        const item = params[0];
        const exact = Math.round(item.value * 1000000).toLocaleString('en-US');
        return `<div style="font-family:'Proxima Nova',Arial,sans-serif;font-weight:700;margin-bottom:6px">${item.name}</div>
          <div style="font-family:'Proxima Nova',Arial,sans-serif">Net funded amount: <strong>$${exact}</strong></div>`;
      }
    },
    grid: {
      left: 265,
      right: 85,
      top: 55,
      bottom: 40
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 45,
      interval: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#7A838F',
        fontSize: 11,
        formatter: '${value}m'
      },
      splitLine: { lineStyle: { color: '#E8EAED' } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: funds,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#2F3742',
        fontSize: 11,
        lineHeight: 14,
        margin: 14,
        width: 235,
        overflow: 'break'
      }
    },
    series: [{
      name: 'Net funded amount',
      type: 'bar',
      data: values,
      barWidth: 15,
      itemStyle: {
        color: function (params) {
          if (params.dataIndex === 0) return '#5B2C83';
          if (params.dataIndex <= 4) return '#8C62AA';
          return '#C3AAD1';
        }
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        formatter: (params) => `$${params.value.toFixed(1)}m`,
        color: '#3B4650',
        fontSize: 11,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: { color: '#3E1D5A' }
      }
    }]
  });

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopUnPooledFunds;
