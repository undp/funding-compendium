// FOR DESIGN ARCHIVE ONLY — inactive implementation retained for reference.
import worldJson from '../../data/world.json';

const recipients = [
  { name: 'Argentina', labelName: 'Argentina', value: 306, coord: [-63.6167, -38.4161], lineEnd: [-91, -38], labelPosition: 'left' },
  { name: 'Ukraine', labelName: 'Ukraine', value: 191, coord: [31.1656, 48.3794], lineEnd: [70, 69], labelPosition: 'right' },
  { name: 'Syrian Arab Republic', labelName: 'Syrian Arab\nRepublic', value: 154, coord: [38.9968, 34.8021], lineEnd: [88, 45], labelPosition: 'right' },
  { name: 'Programme of Assistance to the Palestinian People', labelName: 'Programme of Assistance to the\nPalestinian People', value: 130, coord: [35.2332, 31.9522], lineEnd: [-12, 25], labelPosition: 'left' },
  { name: 'Gabon', labelName: 'Gabon', value: 123, coord: [11.6094, -0.8037], lineEnd: [-11, 0], labelPosition: 'left' },
  { name: 'Colombia', labelName: 'Colombia', value: 106, coord: [-74.2973, 4.5709], lineEnd: [-102, 5], labelPosition: 'left' },
  { name: 'Guatemala', labelName: 'Guatemala', value: 102, coord: [-90.2308, 15.7835], lineEnd: [-118, 18], labelPosition: 'left' },
  { name: 'Brazil', labelName: 'Brazil', value: 95, coord: [-51.9253, -14.235], lineEnd: [-79, -13], labelPosition: 'left' },
  { name: 'Lebanon', labelName: 'Lebanon', value: 86, coord: [35.8623, 33.8547], lineEnd: [88, 30], labelPosition: 'right' },
  { name: 'Democratic Republic of the Congo', labelName: 'Democratic Republic\nof the Congo', value: 84, coord: [21.7587, -4.0383], lineEnd: [56, -9], labelPosition: 'right' },
  { name: 'Yemen', labelName: 'Yemen', value: 82, coord: [48.5164, 15.5527], lineEnd: [88, 12], labelPosition: 'right' },
  { name: 'Republic of Moldova', labelName: 'Republic of\nMoldova', value: 74, coord: [28.3699, 47.4116], lineEnd: [-5, 70], labelPosition: 'left' },
  { name: 'Haiti', labelName: 'Haiti', value: 67, coord: [-72.2852, 18.9712], lineEnd: [-48, 25], labelPosition: 'right' },
  { name: 'Türkiye', labelName: 'Türkiye', value: 66, coord: [35.2433, 38.9637], lineEnd: [70, 57], labelPosition: 'right' },
  { name: 'Zimbabwe', labelName: 'Zimbabwe', value: 65, coord: [29.1549, -19.0154], lineEnd: [58, -29], labelPosition: 'right' }
];

const OTHER_DARK = '#0069B3';
const OTHER_MID = '#3F8CC3';
const OTHER_LIGHT = '#79ADD1';
const OTHER_PALE = '#A8CBE2';
const TEXT_COLOR = '#232E3D';
const LINE_COLOR = '#7A838F';

function getBubbleColor(value) {
  if (value >= 180) return OTHER_DARK;
  if (value >= 120) return OTHER_MID;
  if (value >= 90) return OTHER_LIGHT;
  return OTHER_PALE;
}

export function initTopOtherResourcesRecipients(el, echarts) {
  const chart = echarts.init(el);
  const cleanWorldJson = {
    ...worldJson,
    features: worldJson.features.filter((feature) => {
      const properties = feature.properties || {};
      const name = properties.name || properties.NAME || properties.admin;
      return name !== 'Antarctica';
    })
  };

  echarts.registerMap('world-clean', cleanWorldJson);

  const bubbleData = recipients.map((recipient) => ({
    name: recipient.name,
    value: [recipient.coord[0], recipient.coord[1], recipient.value],
    itemStyle: { color: getBubbleColor(recipient.value) }
  }));

  const labelData = recipients.map((recipient) => ({
    name: recipient.name,
    labelName: recipient.labelName,
    actualValue: recipient.value,
    value: [recipient.lineEnd[0], recipient.lineEnd[1]],
    label: { position: recipient.labelPosition }
  }));

  const lineData = recipients.map((recipient) => {
    const elbowX = recipient.coord[0] + (recipient.lineEnd[0] - recipient.coord[0]) * 0.42;
    return { coords: [recipient.coord, [elbowX, recipient.coord[1]], recipient.lineEnd] };
  });

  chart.setOption({
    backgroundColor: 'transparent',
    animation: false,
    tooltip: { show: false },
    geo: {
      map: 'world-clean',
      layoutCenter: ['50%', '50%'],
      layoutSize: '180%',
      aspectScale: 0.82,
      center: [0, 4],
      zoom: 1,
      roam: false,
      silent: true,
      itemStyle: { areaColor: '#DDE5E9', borderColor: '#F4F9FC', borderWidth: 0.8 },
      emphasis: { disabled: true },
      select: { disabled: true },
      label: { show: false }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: bubbleData,
        symbol: 'circle',
        symbolSize: function (value) {
          const normalized = (Math.sqrt(value[2]) - Math.sqrt(65)) / (Math.sqrt(306) - Math.sqrt(65));
          return 28 + normalized * 44;
        },
        itemStyle: { opacity: 0.82 },
        emphasis: { disabled: true },
        silent: true,
        z: 5
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        data: lineData,
        polyline: true,
        lineStyle: { color: LINE_COLOR, width: 1.2, opacity: 0.75 },
        effect: { show: false },
        silent: true,
        z: 6
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: labelData,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: LINE_COLOR },
        label: {
          show: true,
          distance: 8,
          formatter: function (params) {
            return `{amount|$${params.data.actualValue}M}\n{country|${params.data.labelName}}`;
          },
          rich: {
            amount: { fontFamily: 'Proxima Nova, Arial, sans-serif', color: TEXT_COLOR, fontSize: 16, fontWeight: 700, lineHeight: 20 },
            country: { fontFamily: 'Proxima Nova, Arial, sans-serif', color: TEXT_COLOR, fontSize: 13, fontWeight: 500, lineHeight: 16 }
          }
        },
        labelLayout: { hideOverlap: false },
        emphasis: { disabled: true },
        silent: true,
        z: 7
      }
    ]
  }, true);

  const resize = () => chart.resize();
  window.addEventListener('resize', resize);
  el.__echartsInstance = chart;
  el.__echartsResizeHandler = resize;

  return chart;
}

export default initTopOtherResourcesRecipients;
