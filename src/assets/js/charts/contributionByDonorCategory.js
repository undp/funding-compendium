// Initializes the "Contribution by donor category" nested pie chart.
// el: DOM element
// echarts: imported echarts namespace
export function initContributionByDonorCategory(el, echarts) {
  const parseNumber = (value, fallback = 0) => {
    if (value == null || value === '') return fallback;

    const n = Number(value);

    return Number.isFinite(n)
      ? n
      : fallback;
  };

  let donorGovernments = 1814;
  let programmeGovernments = 1588;
  let verticalFunds = 825;
  let pooledFunds = 234;
  let europeanUnion = 313;
  let financialInstitutions = 98;
  let unAgencies = 69;
  let privateSectorAndOthers = 99;

  if (el.dataset.donorGovernments) {
    donorGovernments = parseNumber(
      el.dataset.donorGovernments,
      donorGovernments
    );
  }

  if (el.dataset.programmeGovernments) {
    programmeGovernments = parseNumber(
      el.dataset.programmeGovernments,
      programmeGovernments
    );
  }

  if (el.dataset.verticalFunds) {
    verticalFunds = parseNumber(
      el.dataset.verticalFunds,
      verticalFunds
    );
  }

  if (el.dataset.pooledFunds) {
    pooledFunds = parseNumber(
      el.dataset.pooledFunds,
      pooledFunds
    );
  }

  if (el.dataset.europeanUnion) {
    europeanUnion = parseNumber(
      el.dataset.europeanUnion,
      europeanUnion
    );
  }

  if (el.dataset.financialInstitutions) {
    financialInstitutions = parseNumber(
      el.dataset.financialInstitutions,
      financialInstitutions
    );
  }

  if (el.dataset.unAgencies) {
    unAgencies = parseNumber(
      el.dataset.unAgencies,
      unAgencies
    );
  }

  if (el.dataset.privateSectorAndOthers) {
    privateSectorAndOthers = parseNumber(
      el.dataset.privateSectorAndOthers,
      privateSectorAndOthers
    );
  }

  const otherMultilaterals =
    financialInstitutions +
    unAgencies +
    privateSectorAndOthers;

  const multilateral =
    verticalFunds +
    pooledFunds +
    europeanUnion +
    otherMultilaterals;

  const total =
    donorGovernments +
    programmeGovernments +
    multilateral;

  // Format USD values
  const formatM = (value) =>
    Math.round(value).toLocaleString('en-US');

  // Format percentages:
  // 36.0 -> 36%
  // 31.5 -> 31.5%
  // 32.5 -> 32.5%
  const formatPercent = (value) => {
    const rounded =
      Math.round(value * 10) / 10;

    return Number.isInteger(rounded)
      ? `${rounded}%`
      : `${rounded.toFixed(1).replace(/\.0$/, '')}%`;
  };

  const option = {
    animationDuration: 600,

    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif',
      color: '#222222'
    },

    legend: {
      show: true,
      orient: 'vertical',
      left: '13%',
      bottom: 32,
      icon: 'rect',
      itemWidth: 24,
      itemHeight: 8,
      itemGap: 7,
      selectedMode: false,
      data: [
        'Financial Institutions',
        'UN agencies',
        'Private sector, foundations, NGOs, Academic Institutions and others'
      ],
      formatter: function (name) {
        const labels = {
          'Financial Institutions':
            'Financial Institutions — 2%',
          'UN agencies':
            'UN agencies — 1%',
          'Private sector, foundations, NGOs, Academic Institutions and others':
            'Private sector, foundations, NGOs, Academic Institutions and others — 2%'
        };

        return labels[name] || name;
      },
      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#333333',
        fontSize: 15,
        lineHeight: 19
      }
    },

    tooltip: {
      trigger: 'item',

      backgroundColor: '#ffffff',
      borderColor: '#d8d8d8',
      borderWidth: 1,

      padding: [12, 14],

      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        color: '#222',
        fontSize: 13,
        lineHeight: 21
      },

      formatter: function (params) {
        if (
          params.data &&
          params.data.placeholder
        ) {
          return '';
        }

        const percentOfTotal =
          params.data.displayPercent ??
          (params.value / total) * 100;

        const isOtherBreakdown =
          params.seriesName ===
          'Other multilaterals breakdown';

        const isBreakdown =
          params.seriesName ===
            'Multilateral breakdown' ||
          isOtherBreakdown;

        const breakdownTotal =
          isOtherBreakdown
            ? otherMultilaterals
            : multilateral;

        const breakdownLabel =
          isOtherBreakdown
            ? 'other multilaterals'
            : 'multilateral funding';

        return `
          <div
            style="
              min-width: 210px;
              font-family: 'Proxima Nova', Arial, sans-serif;
            "
          >
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                margin-bottom: 6px;
              "
            >
              ${params.name}
            </div>

            <div>
              $${formatM(params.value)}M
            </div>

            <div>
              ${formatPercent(percentOfTotal)}
              of total contributions
            </div>

            ${
              isBreakdown
                ? `
                  <div
                    style="
                      margin-top: 7px;
                      padding-top: 7px;
                      border-top: 1px solid #e5e5e5;
                      color: #666;
                    "
                  >
                    ${formatPercent(
                      (params.value / breakdownTotal) * 100
                    )}
                    of ${breakdownLabel}
                  </div>
                `
                : ''
            }
          </div>
        `;
      }
    },

    series: [
      // =====================================================
      // INNER PIE:
      // Main donor categories
      // =====================================================
      {
        name: 'Main donor categories',

        type: 'pie',

        radius: [
          0,
          '54%'
        ],

        center: [
          '56%',
          '45%'
        ],

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
            const roundedInnerPercentages = {
              'Donor country\ngovernments': '36%',
              'Programme country\ngovernments': '32%',
              Multilateral: '32%'
            };

            return (
              `{name|${params.name}}\n` +
              `{percent|${roundedInnerPercentages[params.name] || formatPercent(params.percent)}}`
            );
          },

          rich: {
            name: {
              fontFamily:
                'Proxima Nova, Arial, sans-serif',

              color: '#fff',

              fontSize: 12,

              fontWeight: 400,
              

              lineHeight: 12,

              align: 'center'
            },

            percent: {
              fontFamily:
                'Proxima Nova, Arial, sans-serif',

              color: '#fff',

              fontSize: 16,

              fontWeight: 700,

              lineHeight: 22,

              align: 'center'
            }
          }
        },

        data: [
          {
            name:
              'Donor country\ngovernments',

            value:
              donorGovernments,

            itemStyle: {
              color: CATEGORY_COLORS[0]
            }
          },

          {
            name:
              'Programme country\ngovernments',

            value:
              programmeGovernments,

            itemStyle: {
              color: CATEGORY_COLORS[1]
            }
          },

          {
            name:
              'Multilateral',

            value:
              multilateral,

            itemStyle: {
              color: '#E86B2E'
            }
          }
        ]
      },

      // =====================================================
      // OUTER PIE:
      // Multilateral breakdown
      // =====================================================
      {
        name:
          'Multilateral breakdown',

        type:
          'pie',

        radius: [
          '61%',
          '80%'
        ],

        center: [
          '56%',
          '45%'
        ],

        startAngle:
          90,

        clockwise:
          true,

        itemStyle: {
          borderColor:
            '#ffffff',

          borderWidth:
            0,

          borderRadius:
            0
        },

        emphasis: {
          scale:
            false,

          focus:
            'self'
        },

        labelLine: {
          show:
            true,

          length:
            26,

          length2:
            30,

          lineStyle: {
            color:
              '#999',

            width:
              1
          }
        },

        label: {
          show:
            true,

          position:
            'outside',

          distanceToLabelLine:
            6,

          formatter: function (params) {
            if (
              params.data &&
              params.data.placeholder
            ) {
              return '';
            }

            const percentOfTotal =
              params.data.displayPercent ??
              (params.value / total) * 100;

            const breakdownValue =
              params.data.showValue
                ? `$${formatM(params.value)}M `
                : '';

            return (
              `{name|${params.name}}\n` +
              `{percent|${breakdownValue}${formatPercent(percentOfTotal)}}`
            );
          },

          rich: {
            name: {
              fontFamily:
                'Proxima Nova, Arial, sans-serif',

              color:
                '#222',

              fontSize:
                13,

              fontWeight:
                700,

              lineHeight:
                17
            },

            percent: {
              fontFamily:
                'Proxima Nova, Arial, sans-serif',

              color:
                '#555',

              fontSize:
                13,

              fontWeight:
                600,

              lineHeight:
                17
            }
          }
        },

        labelLayout: {
          moveOverlap:
            'shiftY',

          hideOverlap:
            false,

          draggable:
            false
        },

        data: [
          // -----------------------------------------
          // Transparent placeholder:
          // Donor country governments
          // -----------------------------------------
          {
            value:
              donorGovernments,

            name:
              '',

            placeholder:
              true,

            tooltip: {
              show:
                false
            },

            label: {
              show:
                false
            },

            labelLine: {
              show:
                false
            },

            itemStyle: {
              color:
                'rgba(0,0,0,0)',

              borderColor:
                'rgba(0,0,0,0)'
            },

            emphasis: {
              disabled:
                true
            }
          },

          // -----------------------------------------
          // Transparent placeholder:
          // Programme country governments
          // -----------------------------------------
          {
            value:
              programmeGovernments,

            name:
              '',

            placeholder:
              true,

            tooltip: {
              show:
                false
            },

            label: {
              show:
                false
            },

            labelLine: {
              show:
                false
            },

            itemStyle: {
              color:
                'rgba(0,0,0,0)',

              borderColor:
                'rgba(0,0,0,0)'
            },

            emphasis: {
              disabled:
                true
            }
          },

          // -----------------------------------------
          // Multilateral breakdown
          // -----------------------------------------
          {
            name:
              'Other\nmultilaterals',

            value:
              otherMultilaterals,

            itemStyle: {
              color:
                '#F08A54'
            }
          },

          {
            name:
              'Vertical funds',

            value:
              verticalFunds,

            itemStyle: {
              color:
                '#7F2704'
            }
          },

          {
            name:
              'UN pooled funds',

            value:
              pooledFunds,

            itemStyle: {
              color:
                '#A63A0B'
            }
          },

          {
            name:
              'European Union',

            value:
              europeanUnion,

            itemStyle: {
              color:
                '#C85118'
            }
          }
        ]
      },

      // =====================================================
      // THIRD RING:
      // Details within the original "Other multilaterals" slice
      // =====================================================
      {
        name:
          'Other multilaterals breakdown',

        type:
          'pie',

        radius: [
          '82%',
          '90%'
        ],

        center: [
          '56%',
          '45%'
        ],

        startAngle:
          90,

        clockwise:
          true,

        itemStyle: {
          borderColor:
            '#ffffff',

          borderWidth:
            1
        },

        emphasis: {
          scale:
            false,

          focus:
            'self'
        },

        label: {
          show:
            false
        },

        labelLine: {
          show:
            false
        },

        data: [
          {
            value:
              donorGovernments +
              programmeGovernments,

            name:
              '',

            placeholder:
              true,

            tooltip: {
              show:
                false
            },

            itemStyle: {
              color:
                'rgba(0,0,0,0)',

              borderColor:
                'rgba(0,0,0,0)'
            },

            emphasis: {
              disabled:
                true
            }
          },

          {
            name:
              'Financial Institutions',

            value:
              financialInstitutions,

            displayPercent:
              2,

            itemStyle: {
              color:
                '#D9672C'
            }
          },

          {
            name:
              'UN agencies',

            value:
              unAgencies,

            displayPercent:
              1,

            itemStyle: {
              color:
                '#F3A06F'
            }
          },

          {
            name:
              'Private sector, foundations, NGOs, Academic Institutions and others',

            value:
              privateSectorAndOthers,

            displayPercent:
              2,

            itemStyle: {
              color:
                '#F8C3A2'
            }
          },

          {
            value:
              verticalFunds +
              pooledFunds +
              europeanUnion,

            name:
              '',

            placeholder:
              true,

            tooltip: {
              show:
                false
            },

            itemStyle: {
              color:
                'rgba(0,0,0,0)',

              borderColor:
                'rgba(0,0,0,0)'
            },

            emphasis: {
              disabled:
                true
            }
          }
        ]
      }
    ]
  };

  const chart =
    echarts.init(el);

  chart.setOption(option);

  const resize = () => {
    chart.resize();
  };

  window.addEventListener(
    'resize',
    resize
  );

  el.__echartsInstance =
    chart;

  el.__echartsResizeHandler = resize;

  return chart;
}

export default initContributionByDonorCategory;
import { CATEGORY_COLORS } from './chartColors';
