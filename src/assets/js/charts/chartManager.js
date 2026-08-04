import * as echarts from 'echarts';
import { initResourcesByFundingType } from './resourcesByFundingType';
import { initTrendsInResources } from './trendsInResources';
import { initContributionByDonorCategory } from './contributionByDonorCategory';
import { initContributionsByDonorResource } from './contributionsByDonorResource';

const registry = {
  'resources-by-funding-type': initResourcesByFundingType,
  'trends-in-resources': initTrendsInResources,
  'contribution-by-donor-category': initContributionByDonorCategory,
  'contributions-by-donor-resource': initContributionsByDonorResource
};

function initChartEl(el) {
  const type = el.dataset.chartType;
  const initFn = registry[type];
  if (!initFn) return;

  try {
    initFn(el, echarts);
  } catch (err) {
    // fail silently in production; developer can inspect console
    // eslint-disable-next-line no-console
    console.error('Error initializing chart', type, err);
  }
}

export function initCharts(root = document) {
  const els = Array.from(root.querySelectorAll('[data-chart-type]'));
  els.forEach(initChartEl);
}

export default { initCharts };
