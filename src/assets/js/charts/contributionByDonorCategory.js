// Initializes the "Contribution by donor category" nested pie chart.
// el: DOM element
// echarts: imported echarts namespace
export function initContributionByDonorCategory(el, echarts) {
  const parseNumber = (value, fallback = 0) => {
    if (value == null || value === '') return fallback;
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  let donorGovernments = 1814;
  let programmeGovernments = 1588;
  let verticalFunds = 825;
  let pooledFunds = 234;
  let europeanUnion = 313;
  let otherMultilaterals = 266;
  let title = 'Contribution by donor category in 2025';

  if (el.dataset.donorGovernments) {
    donorGovernments = parseNumber(el.dataset.donorGovernments, donorGovernments);
  }
  if (el.dataset.programmeGovernments) {
    programmeGovernments = parseNumber(el.dataset.programmeGovernments, programmeGovernments);
  }
  if (el.dataset.verticalFunds) {
    verticalFunds = parseNumber(el.dataset.verticalFunds, verticalFunds);
  }
  if (el.dataset.pooledFunds) {
    pooledFunds = parseNumber(el.dataset.pooledFunds, pooledFunds);
  }
  if (el.dataset.europeanUnion) {
    europeanUnion = parseNumber(el.dataset.europeanUnion, europeanUnion);
  }
  if (el.dataset.otherMultilaterals) {
    otherMultilaterals = parseNumber(el.dataset.otherMultilaterals, otherMultilaterals);
  }
  if (el.dataset.title) {
    title = el.dataset.title;
  }

  const multilateral =
    verticalFunds + pooledFunds + europeanUnion + otherMultilaterals;

  const total =
    donorGovernments + programmeGovernments + multilateral;

  const formatM = (value) =>
    Math.round(value).toLocaleString('en-US');

  const option = {
    animationDuration: 600,

    textStyle: {
      fontFamily: 'ProximaNova, Arial, sans-serif',
      color: '#222222'
    },
    
    title: {
      text: title,
      left: 'center',
      top: 12,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        fontSize: 18,
        fontWeight: 700,
        color: '#444'
      }
    },

    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#d8d8d8',
      borderWidth: 1,
      padding: [12, 14],
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#222',
        fontSize: 12,
        lineHeight: 20
      },
      formatter: function (params) {
        if (params.data && params.data.placeholder) {
          return '';
        }

        const percentOfTotal = (params.value / total) * 100;
        const isBreakdown = params.seriesName === 'Multilateral breakdown';

        return `
          <div style="min-width: 210px; font-family: 'ProximaNova', sans-serif;">
            <div style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">
              ${params.name}
            </div>
            <div>USD ${formatM(params.value)}M</div>
            <div>${percentOfTotal.toFixed(1)}% of total contributions</div>
            ${
              isBreakdown
                ? `
                  <div style="margin-top: 7px; padding-top: 7px; border-top: 1px solid #e5e5e5; color: #666;">
                    ${(params.value / multilateral * 100).toFixed(1)}% of multilateral funding
                  </div>
                `
                : ''
            }
          </div>
        `;
      }
    },

    /*legend: {
      bottom: 28,
      left: 'center',
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 7,
      itemGap: 18,
      textStyle: {
        fontFamily: 'ProximaNova, Arial, sans-serif',
        color: '#555',
        fontSize: 11
      },
      data: [
        'Vertical funds',
        'UN pooled funds',
        'European Union',
        'Other multilaterals'
      ]
    },*/

    series: [
      {
        name: 'Main donor categories',
        type: 'pie',
        radius: [0, '40%'],
        center: ['50%', '50%'],
        startAngle: 90,
        clockwise: true,
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 0,
          borderRadius: 0
        },
        emphasis: {
          scale: false,
          focus: 'self'
        },
        labelLine: {
          show: false
        },
        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            return `{name|${params.name}}\n{percent|${Math.round(params.percent)}%}`;
          },
          rich: {
            name: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 17,
              align: 'center'
            },
            percent: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 20,
              align: 'center'
            }
          }
        },
        data: [
          {
            name: 'Donor country\ngovernments',
            value: donorGovernments,
            itemStyle: { color: '#4A77C3' }
          },
          {
            name: 'Programme country\ngovernments',
            value: programmeGovernments,
            itemStyle: { color: '#F47B2A' }
          },
          {
            name: 'Multilateral',
            value: multilateral,
            itemStyle: { color: '#B88D00' }
          }
        ]
      },
      {
        name: 'Multilateral breakdown',
        type: 'pie',
        radius: ['47%', '68%'],
        center: ['50%', '50%'],
        startAngle: 90,
        clockwise: true,
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 0,
          borderRadius: 0
        },
        emphasis: {
          scale: false,
          focus: 'self'
        },
        labelLine: {
          show: true,
          length: 14,
          length2: 9,
          lineStyle: {
            color: '#999',
            width: 1
          }
        },
        label: {
          show: true,
          position: 'outside',
          formatter: function (params) {
            if (params.data && params.data.placeholder) {
              return '';
            }
            const percentOfTotal = Math.round((params.value / total) * 100);
            return `{name|${params.name}}\n{percent|${percentOfTotal}%}`;
          },
          rich: {
            name: {
              width: 145,
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#222',
              fontSize: 11,
              fontWeight: 700,
              lineHeight: 15,
              overflow: 'break'
            },
            percent: {
              fontFamily: 'ProximaNova, Arial, sans-serif',
              color: '#555',
              fontSize: 11,
              fontWeight: 600,
              lineHeight: 15
            }
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY',
          hideOverlap: false
        },
        data: [
          {
            value: donorGovernments,
            name: '',
            placeholder: true,
            tooltip: { show: false },
            label: { show: false },
            labelLine: { show: false },
            itemStyle: {
              color: 'rgba(0,0,0,0)',
              borderColor: 'rgba(0,0,0,0)'
            },
            emphasis: { disabled: true }
          },
          {
            value: programmeGovernments,
            name: '',
            placeholder: true,
            tooltip: { show: false },
            label: { show: false },
            labelLine: { show: false },
            itemStyle: {
              color: 'rgba(0,0,0,0)',
              borderColor: 'rgba(0,0,0,0)'
            },
            emphasis: { disabled: true }
          },
          {
            name: 'Vertical funds',
            value: verticalFunds,
            itemStyle: { color: '#FFC20E' }
          },
          {
            name: 'UN pooled funds',
            value: pooledFunds,
            itemStyle: { color: '#5B9BD5' }
          },
          {
            name: 'European Union',
            value: europeanUnion,
            itemStyle: { color: '#70AD47' }
          },
          {
            name: 'Other multilaterals',
            value: otherMultilaterals,
            itemStyle: { color: '#666666' }
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
}

export default initContributionByDonorCategory;
