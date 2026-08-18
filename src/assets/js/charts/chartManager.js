import * as echarts from 'echarts';
import { initResourcesByFundingType } from './resourcesByFundingType';
import { initTrendsInResources } from './trendsInResources';
import { initContributionByDonorCategory } from './contributionByDonorCategory';
import { initContributionsByDonorResource } from './contributionsByDonorResource';
import { initResourcesByFundingChannel } from './resourcesByFundingChannel';
import { initRegularResourcesAllocation } from './regularResourcesAllocation';
import { initResourcesByDevelopmentStatus } from './resourcesByDevelopmentStatus';
import { initResourcesByCountryTypology } from './resourcesByCountryTypology';
import { initResourcesByRegion } from './resourcesByRegion';
import { initInstitutionalBudgetAllocation } from './institutionalBudgetAllocation';
import { initRegularResourcesContributionsMap } from './regularResourcesContributionsMap';
import { initTopCoreContributors } from './topCoreContributors';
import { initMultiYearPledges } from './multiYearPledges';
import { initTopGlocContributors } from './topGlocContributors';
import { initOtherResourcesPlaceholder } from './otherResourcesPlaceholder';
import { initTopOtherResourcesContributors } from './topOtherResourcesContributors';
import { initTopOtherResourcesRecipients } from './topOtherResourcesRecipients';
import { initThematicWindowContributions } from './thematicWindowContributions';
import { initFundingWindowContributorFlow } from './fundingWindowContributorFlow';
import { initTopPooledFundMemberStates } from './topPooledFundMemberStates';
import { initPooledFundContributions } from './pooledFundContributions';
import { initTopUnPooledFunds } from './topUnPooledFunds';
import { initGovernmentFinancingByCountry } from './governmentFinancingByCountry';
import { initGovernmentFinancingByRegion } from './governmentFinancingByRegion';
import { initVerticalFundContributions } from './verticalFundContributions';
import { initEuContributionsByRegion } from './euContributionsByRegion';
import { initIfiContributionsDonut } from './ifiContributionsDonut';
import { initIfiContributionsByType } from './ifiContributionsByType';
import { initTopIfiRecipientCountries } from './topIfiRecipientCountries';
import { initTopPrivateSectorContributors } from './topPrivateSectorContributors';
import { initPrivateSectorContributionsByType } from './privateSectorContributionsByType';

const registry = {
  'resources-by-funding-type': initResourcesByFundingType,
  'trends-in-resources': initTrendsInResources,
  'contribution-by-donor-category': initContributionByDonorCategory,
  'contributions-by-donor-resource': initContributionsByDonorResource,
  'resources-by-funding-channel': initResourcesByFundingChannel,
  'regular-resources-allocation': initRegularResourcesAllocation,
  'resources-by-development-status': initResourcesByDevelopmentStatus,
  'resources-by-country-typology': initResourcesByCountryTypology,
  'resources-by-region': initResourcesByRegion,
  'institutional-budget-allocation': initInstitutionalBudgetAllocation,
  'regular-resources-contributions-map': initRegularResourcesContributionsMap,
  'top-core-contributors': initTopCoreContributors,
  'multi-year-pledges': initMultiYearPledges,
  'top-gloc-contributors': initTopGlocContributors,
  topGlocContributors: initTopGlocContributors,
  'other-resources-placeholder': initOtherResourcesPlaceholder,
  'top-other-resources-contributors': initTopOtherResourcesContributors,
  'top-other-resources-recipients': initTopOtherResourcesRecipients,
  'thematic-window-contributions': initThematicWindowContributions,
  'funding-window-contributor-flow': initFundingWindowContributorFlow,
  'top-pooled-fund-member-states': initTopPooledFundMemberStates,
  'pooled-fund-contributions': initPooledFundContributions,
  'top-un-pooled-funds': initTopUnPooledFunds,
  'government-financing-by-country': initGovernmentFinancingByCountry,
  'government-financing-by-region': initGovernmentFinancingByRegion,
  'vertical-fund-contributions': initVerticalFundContributions,
  'eu-contributions-by-region': initEuContributionsByRegion,
  'ifi-contributions-donut': initIfiContributionsDonut,
  'ifi-contributions-by-type': initIfiContributionsByType,
  'top-ifi-recipient-countries': initTopIfiRecipientCountries,
  'top-private-sector-contributors': initTopPrivateSectorContributors,
  'private-sector-contributions-by-type': initPrivateSectorContributionsByType
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
