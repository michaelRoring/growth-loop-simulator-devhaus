export interface SimulationParams {
  initialCustomerBase: number;
  initialAcquisitionBudget: number;
  customerAcquisitionCost: number;
  averageOrderValue: number;
  annualPurchaseFrequency: number;
  profitMargin: number;
  reinvestmentRate: number;
  simulationTimeframe: number;
}

export interface QuarterlyData {
  quarter: number;
  revenue: number;
  qoqRevenueGrowth: number;
  profit: number;
  qoqProfitGrowth: number;
  customersStart: number;
  newCustomers: number;
  customersEnd: number;
  qoqCustomerGrowth: number;
  marketingBudget: number;
  roi: number;
}

export interface SimulationResults {
  quarterlyData: QuarterlyData[];
  revenueData: { month: number; revenue: number; profit: number }[];
  customerData: { month: number; customers: number }[];
  marketingData: { month: number; budget: number }[];
  summary: {
    totalRevenue: number;
    totalProfit: number;
    customerGrowth: number;
    averageROI: number;
  };
}

export function runSimulation(params: SimulationParams): SimulationResults {
  const {
    initialCustomerBase,
    initialAcquisitionBudget,
    customerAcquisitionCost,
    averageOrderValue,
    annualPurchaseFrequency,
    profitMargin,
    reinvestmentRate,
    simulationTimeframe,
  } = params;

  // Derived values
  const monthlyPurchaseFrequency = annualPurchaseFrequency / 12;
  const monthlyRevenuePerCustomer =
    averageOrderValue * monthlyPurchaseFrequency;

  let customers = initialCustomerBase;
  let marketingBudget = initialAcquisitionBudget;

  const revenueData: { month: number; revenue: number; profit: number }[] = [];
  const customerData: { month: number; customers: number }[] = [];
  const marketingData: { month: number; budget: number }[] = [];
  const quarterlyData: QuarterlyData[] = [];

  let totalRevenue = 0;
  let totalProfit = 0;
  let previousQuarterCustomers = initialCustomerBase;
  let previousQuarterRevenue = 0;
  let previousQuarterProfit = 0;
  let quarterStartCustomers = initialCustomerBase;

  // Run monthly simulation
  for (let month = 1; month <= simulationTimeframe; month++) {
    // Calculate monthly metrics
    const monthlyRevenue = customers * monthlyRevenuePerCustomer;

    // FIX 1: Convert profitMargin from percentage to decimal
    const monthlyProfit = monthlyRevenue * (profitMargin / 100);

    // FIX 2: Convert reinvestmentRate from percentage to decimal
    const reinvestment = monthlyProfit * (reinvestmentRate / 100);

    // Update marketing budget
    marketingBudget += reinvestment;

    // Calculate new customers acquired
    const newCustomers = Math.floor(marketingBudget / customerAcquisitionCost);

    // Update metrics
    marketingBudget -= newCustomers * customerAcquisitionCost;
    customers += newCustomers;
    totalRevenue += monthlyRevenue;
    totalProfit += monthlyProfit;

    // Store data
    revenueData.push({ month, revenue: monthlyRevenue, profit: monthlyProfit });
    customerData.push({ month, customers });
    marketingData.push({ month, budget: marketingBudget });

    // Store quarterly data
    if (month % 3 === 0) {
      const quarterNumber = Math.floor((month - 1) / 3) + 1;
      const quarterRevenue = revenueData
        .slice(-3)
        .reduce((sum, d) => sum + d.revenue, 0);
      const quarterProfit = revenueData
        .slice(-3)
        .reduce((sum, d) => sum + d.profit, 0);

      // FIX 3: Correct ROI calculation
      const quarterlyMarketingSpent = marketingBudget > 0 ? marketingBudget : 1; // Avoid division by zero
      const roi = (quarterProfit / quarterlyMarketingSpent) * 100;

      const qoqRevenueGrowth = previousQuarterRevenue
        ? (quarterRevenue / previousQuarterRevenue - 1) * 100
        : 0;
      const qoqProfitGrowth = previousQuarterProfit
        ? (quarterProfit / previousQuarterProfit - 1) * 100
        : 0;
      const qoqCustomerGrowth =
        (customers / previousQuarterCustomers - 1) * 100;

      quarterlyData.push({
        quarter: quarterNumber,
        revenue: quarterRevenue,
        qoqRevenueGrowth: Math.round(qoqRevenueGrowth * 10) / 10,
        profit: quarterProfit,
        qoqProfitGrowth: Math.round(qoqProfitGrowth * 10) / 10,
        customersStart: quarterStartCustomers,
        newCustomers: customers - quarterStartCustomers,
        customersEnd: customers,
        qoqCustomerGrowth: Math.round(qoqCustomerGrowth * 10) / 10,
        marketingBudget,
        roi: Math.round(roi * 10) / 10,
      });

      previousQuarterCustomers = customers;
      previousQuarterRevenue = quarterRevenue;
      previousQuarterProfit = quarterProfit;
      quarterStartCustomers = customers;
    }
  }

  // Calculate summary metrics
  const customerGrowth = (customers / initialCustomerBase - 1) * 100;

  // FIX 4: Correct totalMarketingSpent calculation (with percentage conversion)
  const totalMarketingSpent =
    initialAcquisitionBudget + totalProfit * (reinvestmentRate / 100);
  const averageROI = totalMarketingSpent
    ? (totalProfit / totalMarketingSpent) * 100
    : 0;

  return {
    revenueData,
    customerData,
    marketingData,
    quarterlyData,
    summary: {
      totalRevenue,
      totalProfit,
      customerGrowth,
      averageROI,
    },
  };
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(Math.round(num));
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};
