// Initializes the "Resources by funding channel" stacked area chart.
// el: DOM element
// echarts: imported echarts namespace
export function initResourcesByFundingChannel(el, echarts) {
  const years = ['2022', '2023', '2024', '2025'];

  // ======================================================
  // DATA — USD MILLIONS
  // ======================================================

  const data = {
    'Third-party cost-sharing': [
      1918.060867,
      1793.600347,
      1812.300670,
      1945.827036
    ],

    'Government financing': [
      1124.037568,
      1194.290257,
      1167.303461,
      1425.934731
    ],

    'Vertical funds': [
      885.152917,
      1032.913610,
      926.758424,
      829.421591
    ],

    'Regular resources': [
      590.941542,
      566.077213,
      581.005615,
      442.318070
    ],

    'United Nations pooled funds': [
      220.622514,
      210.416950,
      241.957584,
      226.084378
    ],

    'Reimbursable support services': [
      76.322282,
      64.375964,
      62.326190,
      55.483459
    ],

    'Thematic funds': [
      118.617483,
      126.267133,
      133.075502,
      115.049362
    ]
  };

  const totals = [
    4933.755173,
    4987.941473,
    4924.727445,
    5040.118625
  ];

  const shares2025 = {
    'Third-party cost-sharing': 39,
    'Government financing': 28,
    'Vertical funds': 16,
    'Regular resources': 9,
    'United Nations pooled funds': 4,
    'Reimbursable support services': 1,
    'Thematic funds': 2
  };

  // ======================================================
  // COLORS
  // ======================================================

  const colors = {
    'Third-party cost-sharing': CATEGORY_COLORS[0],
    'Government financing': CATEGORY_COLORS[1],
    'Vertical funds': CATEGORY_COLORS[2],
    'Regular resources': RESOURCE_COLORS.regular,
    'United Nations pooled funds': CATEGORY_COLORS[3],
    'Reimbursable support services': CATEGORY_COLORS[4],
    'Thematic funds': CATEGORY_COLORS[5]
  };

  const seriesOrder = [
    'Third-party cost-sharing',
    'Government financing',
    'Vertical funds',
    'Regular resources',
    'United Nations pooled funds',
    'Reimbursable support services',
    'Thematic funds'
  ];

  const legendOrder = [
    'Thematic funds',
    'Reimbursable support services',
    'United Nations pooled funds',
    'Regular resources',
    'Vertical funds',
    'Government financing',
    'Third-party cost-sharing'
  ];

  // ======================================================
  // FORMATTERS
  // ======================================================

  function formatValue(value) {
    return '$' + Math.round(value).toLocaleString('en-US');
  }

  function formatM(value) {
    return '$' + Math.round(value).toLocaleString('en-US') + 'M';
  }

  function formatShort(value) {
    if (value >= 1000) {
      return (
        '$' +
        (value / 1000)
          .toFixed(2)
          .replace(/0+$/, '')
          .replace(/\.$/, '') +
        'B'
      );
    }

    return '$' + Math.round(value) + 'M';
  }

  function formatTotal(value) {
    return (
      '$' +
      (value / 1000)
        .toFixed(1).replace(/\.0$/, '')
        .replace('.0', '') +
      'B'
    );
  }

  // ======================================================
  // BUILD SERIES
  // ======================================================

  const series = [];

  // Keep track of indexes
  const areaSeriesIndex = {};
  const hoverLabelSeriesIndex = {};

  // ======================================================
  // 1. MAIN STACKED AREA SERIES
  // ======================================================

  seriesOrder.forEach((name) => {

    areaSeriesIndex[name] = series.length;

    series.push({
      name: name,

      type: 'line',

      stack: 'funding',

      data: data[name],

      symbol: 'none',

      smooth: false,

      lineStyle: {
        width: 0.7,
        color: 'rgba(255,255,255,0.72)'
      },

      areaStyle: {
        opacity: 0.95,
        color: colors[name]
      },

      itemStyle: {
        color: colors[name]
      },

      emphasis: {
        focus: 'series',

        areaStyle: {
          opacity: 1
        }
      },

      blur: {
        areaStyle: {
          opacity: 0.35
        }
      },

      z: 5
    });

  });

  // ======================================================
  // 2. CALCULATE MIDPOINT OF EACH BAND
  // ======================================================

  const cumulative = [0, 0, 0, 0];

  const midpointData = {};

  seriesOrder.forEach((name) => {

    midpointData[name] =
      data[name].map((value, index) => {

        const midpoint =
          cumulative[index] +
          value / 2;

        cumulative[index] += value;

        return midpoint;

      });

  });

  // ======================================================
  // 3. PERMANENT VALUES
  //
  // These remain visible BEFORE hover.
  // ======================================================

  seriesOrder.forEach((name) => {

    const points =
      years.map((year, index) => ({

        value: [
          year,
          midpointData[name][index]
        ],

        fundingValue:
          data[name][index]

      }));

    series.push({

      name: name + ' permanent values',

      type: 'scatter',

      data: points,

      symbolSize: 0,

      silent: true,

      itemStyle: {
        color: 'transparent'
      },

      label: {

        show: false,

        position: 'inside',

        formatter: function (params) {

          const value =
            params.data.fundingValue;

          if (value < 100) {

            return (
              '{small|' +
              formatValue(value) +
              '}'
            );

          }

          if (value < 250) {

            return (
              '{medium|' +
              formatValue(value) +
              '}'
            );

          }

          return (
            '{large|' +
            formatValue(value) +
            '}'
          );

        },

        rich: {

          large: {

            color: '#303030',

            fontFamily:
              'Proxima Nova, Arial, sans-serif',

            fontSize: 14,

            fontWeight: 700,

            textBorderColor:
              'rgba(255,255,255,0.9)',

            textBorderWidth: 3

          },

          medium: {

            color: '#303030',

            fontFamily:
              'Proxima Nova, Arial, sans-serif',

            fontSize: 12,

            fontWeight: 700,

            textBorderColor:
              'rgba(255,255,255,0.94)',

            textBorderWidth: 3

          },

          small: {

            color: '#303030',

            fontFamily:
              'Proxima Nova, Arial, sans-serif',

            fontSize: 10,

            fontWeight: 700,

            textBorderColor:
              'rgba(255,255,255,0.96)',

            textBorderWidth: 3

          }

        }

      },

      tooltip: {
        show: false
      },

      z: 30

    });

  });

  // ======================================================
  // 4. HOVER LABEL SERIES
  //
  // Hidden normally.
  //
  // When a funding stream is hovered, this layer is
  // highlighted and shows all FOUR values prominently.
  // ======================================================

  seriesOrder.forEach((name) => {

    const points =
      years.map((year, index) => ({

        value: [
          year,
          midpointData[name][index]
        ],

        fundingValue:
          data[name][index],

        year: year

      }));

    hoverLabelSeriesIndex[name] =
      series.length;

    series.push({

      name: name + ' hover values',

      type: 'scatter',

      data: points,

      symbolSize: 0,

      silent: true,

      itemStyle: {
        color: 'transparent'
      },

      label: {
        show: false
      },

      emphasis: {

        label: {

          show: true,

          position: 'inside',

          formatter: function (params) {

            return '{value|' + formatShort(params.data.fundingValue) + '}';

          },

          backgroundColor:
            'rgba(255,255,255,0.94)',

          borderColor:
            'rgba(0,0,0,0.12)',

          borderWidth: 1,

          borderRadius: 0,

          padding: [5, 8],

          rich: {

            year: {

              color: '#777777',

              fontFamily:
                'Proxima Nova, Arial, sans-serif',

              fontSize: 10,

              fontWeight: 500,

              lineHeight: 14,

              align: 'center'

            },

            value: {

              color: '#222222',

              fontFamily:
                'Proxima Nova, Arial, sans-serif',

              fontSize: 14,

              fontWeight: 700,

              lineHeight: 18,

              align: 'center'

            }

          }

        }

      },

      tooltip: {
        show: false
      },

      z: 100

    });

  });

  // ======================================================
  // 5. TOTAL LABELS ABOVE CHART
  // ======================================================

  series.push({

    name: 'Total',

    type: 'scatter',

    data: years.map((year, index) => [year, totals[index]]),

    symbol: 'circle',

    symbolSize: 0,

    clip: false,

    silent: true,

    itemStyle: {
      color: 'transparent'
    },

    label: {

      show: true,

      position: 'top',

      distance: 8,

      formatter: function (params) {
        return formatTotal(params.value[1]);
      },

      color: '#263746',

      fontFamily:
        'Proxima Nova, Arial, sans-serif',

      fontSize: 14,

      fontWeight: 700

    },

    tooltip: {
      show: false
    },

    z: 60

  });

  // ======================================================
  // OPTION
  // ======================================================

  const option = {
    textStyle: { fontFamily: 'Proxima Nova, Arial, sans-serif' },

    animation: false,
    color:
      seriesOrder.map(
        name => colors[name]
      ),

    // ====================================================
    // TOOLTIP
    //
    // YEAR tooltip still works when moving horizontally.
    // ====================================================

    tooltip: {

      trigger: 'axis',

      confine: true,

      axisPointer: {

        type: 'line',

        snap: true,

        lineStyle: {
          color: 'rgba(35, 46, 61, 0.28)',
          width: 1,
          type: 'dashed'
        },

        label: {

          show: true,

          backgroundColor: '#333333',

          color: '#ffffff',

          padding: [5, 9],

          borderRadius: 0,

          margin: 8,

          fontFamily:
            'Proxima Nova, Arial, sans-serif',

          fontSize: 13,

          fontWeight: 700

        }

      },

      backgroundColor: '#ffffff',

      borderColor: '#cccccc',

      borderWidth: 0,

      padding: 0,

      extraCssText:
        'box-shadow:0 4px 14px rgba(0,0,0,0.14);' +
        'border-radius:0;',

      textStyle: {

        color: '#222222',

        fontFamily:
          'Proxima Nova, Arial, sans-serif',

        fontSize: 13

      },

      formatter: function (params) {

        const validParams =
          params.filter(item =>
            seriesOrder.includes(
              item.seriesName
            )
          );

        if (!validParams.length) {
          return '';
        }

        const year =
          validParams[0].axisValue;

        const yearIndex = years.indexOf(year);
        const total = totals[yearIndex];

        return detailedTooltip(year, formatM(total), seriesOrder
          .slice()
          .reverse()
          .map((category) => {
            const value = data[category][yearIndex];
            return {
              label: category,
              color: colors[category],
              value: value > 0 ? formatM(value) : '—',
              detail: value > 0 ? formatTooltipPercent(value, total) : null
            };
          }));

      }

    },

    // ====================================================
    // LEGEND
    // ====================================================

    legend: {

      id: 'funding-channel-legend',

      orient: 'vertical',

      right: 22,

      top: 'middle',

      itemWidth: 30,

      itemHeight: 10,

      itemGap: 25,

      icon: 'rect',

      selectedMode: true,

      data: legendOrder,

      formatter: function (name) {
        return name;
      },

      textStyle: {

        fontFamily:
          'Proxima Nova, Arial, sans-serif',

        fontSize: 15,

        fontWeight: 500,

        color: '#222222',

        lineHeight: 22,

        rich: {

          name: {

            width: 220,

            fontFamily:
              'Proxima Nova, Arial, sans-serif',

            fontSize: 14,

            fontWeight: 500,

            color: '#222222',

            lineHeight: 18

          },

          value: {

            fontFamily:
              'Proxima Nova, Arial, sans-serif',

            fontSize: 13,

            fontWeight: 700,

            color: '#333333',

            lineHeight: 18

          },

          share: {

            fontFamily:
              'Proxima Nova, Arial, sans-serif',

            fontSize: 12,

            fontWeight: 400,

            color: '#777777',

            lineHeight: 18

          }

        }

      }

    },

    // ====================================================
    // GRID
    // ====================================================

    grid: {

      left: 80,

      right: 355,

      top: 40,

      bottom: 70,

      containLabel: false

    },

    // ====================================================
    // X AXIS
    // ====================================================

    xAxis: {

      type: 'category',

      triggerEvent: true,

      boundaryGap: false,

      data: years,

      axisLine: {

        show: true,

        lineStyle: {
          color: '#999999',
          width: 1
        }

      },

      axisTick: {
        show: false
      },

      axisLabel: {

        margin: 13,

        color: '#111111',

        fontFamily:
          'Proxima Nova, Arial, sans-serif',

        fontSize: 16

      },

      axisPointer: {

        show: true,

        type: 'line',

        snap: true,

        lineStyle: {
          color: '#555555',
          width: 1.4,
          type: 'dashed'
        },

        label: {

          show: true,

          backgroundColor: '#333333',

          color: '#ffffff',

          padding: [5, 9],

          borderRadius: 0,

          fontFamily:
            'Proxima Nova, Arial, sans-serif',

          fontSize: 13,

          fontWeight: 700

        }

      }

    },

    // ====================================================
    // Y AXIS
    // ====================================================

    yAxis: {

      type: 'value',

      min: 0,

      max: 5500,

      axisLine: {
        show: false
      },

      axisTick: {
        show: false
      },

      axisLabel: {
        show: false
      },

      splitLine: {
        show: false
      }

    },

    series: series

  };

  const myChart = echarts.init(el);
  myChart.setOption(option);

  // ======================================================
  // INTERACTION
  //
  // Hovering ANY colored band highlights its four
  // corresponding values across 2022–2025.
  // ======================================================

  myChart.off('mouseover');
  myChart.off('mouseout');
  myChart.off('globalout');

  myChart.on('mouseover', function (params) {

    if (window.matchMedia('(max-width: 39.9375em)').matches) return;

    if (
      params.componentType !== 'series' ||
      !seriesOrder.includes(params.seriesName)
    ) {
      return;
    }

    const name =
      params.seriesName;

    // Clear any previous hover labels
    seriesOrder.forEach(category => {

      myChart.dispatchAction({

        type: 'downplay',

        seriesIndex:
          hoverLabelSeriesIndex[category]

      });

    });

    // Highlight selected category's 4 labels
    myChart.dispatchAction({

      type: 'highlight',

      seriesIndex:
        hoverLabelSeriesIndex[name]

    });

  });

  myChart.on('mouseout', function (params) {

    if (window.matchMedia('(max-width: 39.9375em)').matches) return;

    if (
      params.componentType !== 'series' ||
      !seriesOrder.includes(params.seriesName)
    ) {
      return;
    }

    myChart.dispatchAction({

      type: 'downplay',

      seriesIndex:
        hoverLabelSeriesIndex[
          params.seriesName
        ]

    });

  });

  myChart.on('globalout', function () {

    if (window.matchMedia('(max-width: 39.9375em)').matches) return;

    seriesOrder.forEach(category => {

      myChart.dispatchAction({

        type: 'downplay',

        seriesIndex:
          hoverLabelSeriesIndex[category]

      });

    });

  });

  // Touch devices do not have a persistent hover state. Tapping a band
  // reveals that category's annual values across all four years.
  let activeMobileYear = null;
  myChart.on('click', function (params) {
    const isMobile = window.matchMedia('(max-width: 39.9375em)').matches;

    if (isMobile) {
      if (params.componentType === 'xAxis' && years.includes(String(params.value))) {
        const selectedYear = String(params.value);
        const chartWrap = el.closest('.fl-channel-chart-wrap');

        if (activeMobileYear === selectedYear) {
          activeMobileYear = null;
          myChart.dispatchAction({ type: 'hideTip' });
          myChart.dispatchAction({ type: 'updateAxisPointer', currTrigger: 'leave' });
          chartWrap?.classList.remove('is-tooltip-open');
          return;
        }

        activeMobileYear = selectedYear;
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: areaSeriesIndex[seriesOrder[0]],
          dataIndex: years.indexOf(selectedYear)
        });
        chartWrap?.classList.add('is-tooltip-open');
      }
      return;
    }

    if (
      params.componentType !== 'series' ||
      !seriesOrder.includes(params.seriesName)
    ) {
      return;
    }

    seriesOrder.forEach(category => {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: hoverLabelSeriesIndex[category]
      });
    });

    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: hoverLabelSeriesIndex[params.seriesName]
    });
  });

  el.__echartsInstance = myChart;
  const resize = () => myChart.resize();
  window.addEventListener('resize', resize);
  el.__echartsResizeHandler = resize;

  return myChart;
}
import { RESOURCE_COLORS, CATEGORY_COLORS } from './chartColors';
import { detailedTooltip, formatTooltipPercent } from './detailedTooltip';
