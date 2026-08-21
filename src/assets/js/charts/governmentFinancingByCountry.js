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

const flagCodes = {
  Argentina: 'ar', Gabon: 'ga', Guatemala: 'gt', Colombia: 'co', Brazil: 'br',
  Panama: 'pa', Honduras: 'hn', Dominica: 'dm', Haiti: 'ht', 'Saudi Arabia': 'sa',
  Cuba: 'cu', Uruguay: 'uy', Angola: 'ao', Egypt: 'eg', Turkmenistan: 'tm',
  Morocco: 'ma', Serbia: 'rs', Montenegro: 'me', Indonesia: 'id', India: 'in',
  'Dominican Republic': 'do', Paraguay: 'py', 'Türkiye': 'tr', Bolivia: 'bo',
  Ethiopia: 'et', Zambia: 'zm', Cameroon: 'cm', Kazakhstan: 'kz', Peru: 'pe', Chile: 'cl'
};

const flagKey = (name) => `flag_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
const flagStyles = Object.fromEntries(countries.map((name) => [flagKey(name), {
  backgroundColor: {
    image: `https://flagcdn.com/${flagCodes[name]}.svg`
  },
  borderColor: '#c7cdd1',
  borderWidth: 0.5,
  height: 20,
  width: 30,
  verticalAlign: 'middle'
}]));

export function initGovernmentFinancingByCountry(el, echarts) {
  const chart = echarts.init(el);
  const mobileView = window.matchMedia('(max-width: 39.9375em)');

  chart.setOption({
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: { color: 'transparent' }
      },
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
      left: 260,
      right: 110,
      top: 40,
      bottom: 45
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 300,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#877F79',
        fontSize: 13,
        formatter: '${value}M'
      },
      splitLine: { lineStyle: { color: '#C5CBD1' } }
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
        lineHeight: 22,
        margin: 24,
        width: 290,
        overflow: 'truncate',
        formatter: function (name) {
          if (mobileView.matches) return name;
          return `{country|${name}}{gap|}{${flagKey(name)}|}`;
        },
        rich: {
          country: {
            color: '#3B3734',
            fontSize: 13,
            lineHeight: 22,
            width: 225,
            align: 'right',
            verticalAlign: 'middle'
          },
          gap: {
            width: 15
          },
          ...flagStyles
        }
      }
    },
    series: [{
      name: 'Government financing',
      type: 'bar',
      clip: false,
      data: values,
      barWidth: 16,
      itemStyle: {
        color: function (params) {
          const lightness = 27 + (params.dataIndex * 1.65);
          return `hsl(204, 72%, ${lightness}%)`;
        }
      },
      label: {
        show: true,
        position: 'right',
        distance: 7,
        formatter: function (params) {
          return params.value >= 100
            ? `$${params.value.toFixed(0)}M`
            : `$${params.value.toFixed(1).replace(/\.0$/, '')}M`;
        },
        color: '#514944',
        fontSize: 12,
        fontWeight: 600
      },
      emphasis: {
        itemStyle: { color: '#003b64' }
      }
    }]
  });

  // Argentina exceeds the $300M axis. Draw one continuous hover band through
  // the true bar endpoint while keeping the final axis line at $300M.
  const rowHighlightId = 'government-country-row-highlight';
  chart.on('mouseover', (params) => {
    if (params.seriesType !== 'bar') return;

    const axisStart = chart.convertToPixel({ xAxisIndex: 0 }, 0);
    const axisEnd = chart.convertToPixel({ xAxisIndex: 0 }, 300);
    const highlightEnd = params.dataIndex === 0
      ? chart.convertToPixel({ xAxisIndex: 0 }, values[0])
      : axisEnd;
    const rowCenter = chart.convertToPixel({ yAxisIndex: 0 }, countries[params.dataIndex]);
    const adjacentIndex = params.dataIndex === countries.length - 1
      ? params.dataIndex - 1
      : params.dataIndex + 1;
    const nextRowCenter = chart.convertToPixel({ yAxisIndex: 0 }, countries[adjacentIndex]);
    const rowHeight = Math.abs(nextRowCenter - rowCenter);

    chart.setOption({
      graphic: [{
        id: rowHighlightId,
        type: 'rect',
        silent: true,
        z: 1,
        shape: {
          x: axisStart,
          y: rowCenter - rowHeight / 2,
          width: Math.max(0, highlightEnd - axisStart),
          height: rowHeight
        },
        style: { fill: 'rgba(150, 150, 150, 0.3)' }
      }]
    });
  });

  const clearRowHighlight = () => {
    chart.setOption({
      graphic: [{ id: rowHighlightId, $action: 'remove' }]
    });
  };

  chart.on('mouseout', (params) => {
    if (params.seriesType === 'bar') clearRowHighlight();
  });
  chart.on('globalout', clearRowHighlight);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initGovernmentFinancingByCountry;
