// Initializes the "Trends in regular and other resources" chart into the given element.
// el: DOM element
// echarts: imported echarts namespace
export function initTrendsInResources(el, echarts) {
  // Default data (can be overridden via data attributes)
  let years = ['2022', '2023', '2024', '2025'];
  let regularResources = [591, 566, 581, 442];
  let otherResources = [4343, 4422, 4344, 4598];
  let totals = [4934, 4988, 4925, 5040];
  let regularPercentages = [12, 11, 12, 9];
  let otherPercentages = [88, 89, 88, 91];

  // Try to override with data attributes (JSON format)
  try {
    if (el.dataset.years) years = JSON.parse(el.dataset.years);
    if (el.dataset.regularResources) regularResources = JSON.parse(el.dataset.regularResources);
    if (el.dataset.otherResources) otherResources = JSON.parse(el.dataset.otherResources);
    if (el.dataset.totals) totals = JSON.parse(el.dataset.totals);
    if (el.dataset.regularPercentages) regularPercentages = JSON.parse(el.dataset.regularPercentages);
    if (el.dataset.otherPercentages) otherPercentages = JSON.parse(el.dataset.otherPercentages);
  } catch (e) {
    // ignore parse errors and use defaults
  }

  const option = {
    animationDuration: 700,

    textStyle: {
      fontFamily: 'Proxima Nova, Arial, sans-serif',
      color: '#222222'
    },

    grid: {
      left: 98,
      right: 28,
      top: 58,
      bottom: 92
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.04)'
        }
      },
      backgroundColor: '#ffffff',
      borderColor: '#d9d9d9',
      borderWidth: 1,
      padding: [12, 14],
      textStyle: {
        color: '#222222',
        fontSize: 12,
        lineHeight: 20
      },
      formatter: function (params) {
        const index = params[0].dataIndex;

        return `
          <div style="min-width: 230px;">
            <div style="
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 8px;
            ">
              ${years[index]}
            </div>

            <div style="margin-bottom: 6px;">
              <span style="font-weight: 600;">
                Regular resources
              </span><br>
              <span style="color: #666666;">
                USD ${regularResources[index].toLocaleString()}M
                (${regularPercentages[index]}%)
              </span>
            </div>

            <div style="margin-bottom: 8px;">
              <span style="font-weight: 600;">
                Other resources
              </span><br>
              <span style="color: #666666;">
                USD ${otherResources[index].toLocaleString()}M
                (${otherPercentages[index]}%)
              </span>
            </div>

            <div style="
              border-top: 1px solid #e5e5e5;
              padding-top: 7px;
              font-size: 13px;
              font-weight: 700;
            ">
              Total: USD ${totals[index].toLocaleString()}M
            </div>
          </div>
        `;
      }
    },

    legend: {
      bottom: 14,
      left: 'center',
      icon: 'rect',
      itemWidth: 22,
      itemHeight: 6,
      itemGap: 24,
      textStyle: {
        color: '#555555',
        fontSize: 11
      },
      data: [
        'Regular resources',
        'Other resources',
        'Total'
      ]
    },

    xAxis: {
      type: 'category',
      data: years,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#bfbfbf',
          width: 1
        }
      },
      axisLabel: {
        color: '#333333',
        fontSize: 12,
        fontWeight: 500,
        margin: 11
      }
    },

    yAxis: {
      type: 'value',
      min: 0,
      max: 6000,
      interval: 1000,
      name: 'USD M',
      nameLocation: 'middle',
      nameGap: 56,
      nameRotate: 90,
      nameTextStyle: {
        color: '#555555',
        fontSize: 11,
        fontWeight: 500
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666666',
        fontSize: 11,
        margin: 12,
        formatter: function (value) {
          return value.toLocaleString('de-DE');
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#dddddd',
          width: 1
        }
      }
    },

    series: [
      {
        name: 'Regular resources',
        type: 'bar',
        stack: 'resources',
        barWidth: '66%',
        data: regularResources,
        itemStyle: {
          color: RESOURCE_COLORS.regular,
          borderRadius: 0
        },
        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            return `{percent|${regularPercentages[params.dataIndex]}%}`;
          },
          rich: {
            percent: {
              color: '#fff',
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 16,
              align: 'center'
            }
          }
        },
        emphasis: {
          focus: 'series'
        }
      },

      {
        name: 'Other resources',
        type: 'bar',
        stack: 'resources',
        barWidth: '66%',
        data: otherResources,
        itemStyle: {
          color: RESOURCE_COLORS.other,
          borderRadius: 0
        },
        label: {
          show: true,
          position: 'inside',
          formatter: function (params) {
            return `{percent|${otherPercentages[params.dataIndex]}%}`;
          },
          rich: {
            percent: {
              color: '#fff',
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 18,
              align: 'center'
            }
          }
        },
        emphasis: {
          focus: 'series'
        }
      },

      {
        name: 'Total',
        type: 'line',
        data: totals,
        symbol: 'none',
        smooth: false,
        z: 10,
        lineStyle: {
          color: SECONDARY_COLORS[2],
          width: 5
        },
        itemStyle: {
          color: SECONDARY_COLORS[2]
        },
        label: {
          show: true,
          position: 'top',
          distance: 12,
          formatter: function (params) {
            return `{total|USD ${(params.value / 1000).toFixed(1)}B}`;
          },
          rich: {
            total: {
              color: '#222222',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 16,
              padding: [2, 0, 2, 0]
            }
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          disabled: true
        }
      }
    ]
  };

  const chart = echarts.init(el);
  chart.setOption(option);

  // responsive
  const resize = () => chart.resize();
  window.addEventListener('resize', resize);

  // store for potential teardown
  el.__echartsInstance = chart;
}

export default initTrendsInResources;
import { RESOURCE_COLORS, SECONDARY_COLORS } from './chartColors';
