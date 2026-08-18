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
  let otherMultilaterals = 266;

  let title = 'Contribution by donor category in 2025';

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

  if (el.dataset.otherMultilaterals) {
    otherMultilaterals = parseNumber(
      el.dataset.otherMultilaterals,
      otherMultilaterals
    );
  }

  if (el.dataset.title) {
    title = el.dataset.title;
  }

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
      : `${rounded.toFixed(1)}%`;
  };

  const option = {
    animationDuration: 600,

    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif',
      color: '#222222'
    },

    title: {
      text: title,
      left: 'center',
      top: -5,

      textStyle: {
        fontFamily: 'Proxima Nova, Arial, sans-serif',
        fontSize: 20,
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
          (params.value / total) * 100;

        const isBreakdown =
          params.seriesName ===
          'Multilateral breakdown';

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
              USD ${formatM(params.value)}M
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
                      (params.value / multilateral) * 100
                    )}
                    of multilateral funding
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
          '45%'
        ],

        center: [
          '49%',
          '54%'
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
            return (
              `{name|${params.name}}\n` +
              `{percent|${formatPercent(params.percent)}}`
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
              color: CATEGORY_COLORS[2]
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
          '52%',
          '78%'
        ],

        center: [
          '49%',
          '54%'
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
            14,

          length2:
            10,

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
            4,

          formatter: function (params) {
            if (
              params.data &&
              params.data.placeholder
            ) {
              return '';
            }

            const percentOfTotal =
              (params.value / total) * 100;

            return (
              `{name|${params.name}}\n` +
              `{percent|${formatPercent(percentOfTotal)}}`
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
              'Vertical funds',

            value:
              verticalFunds,

            itemStyle: {
              color:
                CATEGORY_COLORS[3]
            }
          },

          {
            name:
              'UN pooled funds',

            value:
              pooledFunds,

            itemStyle: {
              color:
                CATEGORY_COLORS[4]
            }
          },

          {
            name:
              'European Union',

            value:
              europeanUnion,

            itemStyle: {
              color:
                CATEGORY_COLORS[5]
            }
          },

          {
            name:
              'Other multilaterals',

            value:
              otherMultilaterals,

            itemStyle: {
              color:
                CATEGORY_COLORS[6]
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
}

export default initContributionByDonorCategory;
import { CATEGORY_COLORS } from './chartColors';
