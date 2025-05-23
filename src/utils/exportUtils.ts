import {
  SimulationResults,
  SimulationParams,
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "./simulationUtils";

export const exportToCsv = (data: SimulationResults): void => {
  const quarterlyData = data.quarterlyData;

  // Create CSV header
  let csvContent =
    "Quarter,Revenue,QoQ Revenue Growth,Profit,QoQ Profit Growth,Starting Customers,New Customers,Ending Customers,QoQ Customer Growth,Marketing Budget,ROI\n";

  // Add data rows
  quarterlyData.forEach((quarter) => {
    csvContent += `Q${quarter.quarter},${quarter.revenue},${quarter.qoqRevenueGrowth}%,${quarter.profit},${quarter.qoqProfitGrowth}%,${quarter.customersStart},${quarter.newCustomers},${quarter.customersEnd},${quarter.qoqCustomerGrowth}%,${quarter.marketingBudget},${quarter.roi}%\n`;
  });

  // Create download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", "growth-simulation-results.csv");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPdf = (): void => {
  // Get the current simulation results and parameters from the page
  const results = (window as { __SIMULATION_RESULTS__?: SimulationResults })
    .__SIMULATION_RESULTS__;
  const params = (window as { __SIMULATION_PARAMS__?: SimulationParams })
    .__SIMULATION_PARAMS__;

  if (!results || !params) {
    alert("No simulation data available to export");
    return;
  }

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to export PDF");
    return;
  }

  // Create a simplified, print-friendly version
  printWindow.document.write(`
    <html>
      <head>
        <title>Growth Loop Simulation Results</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          .metric-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
          }
          .metric-title {
            font-size: 16px;
            color: #666;
            margin-bottom: 8px;
          }
          .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }
          .metric-description {
            font-size: 14px;
            color: #666;
            margin-top: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          th {
            background: #f8f9fa;
            font-weight: bold;
          }
          .params-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .param-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
          }
          .param-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
          }
          .param-value {
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
          @media print {
            body { padding: 20px; }
            .metric-card, .param-item { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>E-Commerce Growth Loop Simulation Results</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
          <h2 class="section-title">Simulation Parameters</h2>
          <div class="params-grid">
            <div class="param-item">
              <div class="param-label">Initial Customer Base</div>
              <div class="param-value">${formatNumber(
                params.initialCustomerBase
              )}</div>
            </div>
            <div class="param-item">
              <div class="param-label">Initial Acquisition Budget</div>
              <div class="param-value">${formatCurrency(
                params.initialAcquisitionBudget
              )}</div>
            </div>
            <div class="param-item">
              <div class="param-label">Customer Acquisition Cost</div>
              <div class="param-value">${formatCurrency(
                params.customerAcquisitionCost
              )}</div>
            </div>
            <div class="param-item">
              <div class="param-label">Average Order Value</div>
              <div class="param-value">${formatCurrency(
                params.averageOrderValue
              )}</div>
            </div>
            <div class="param-item">
              <div class="param-label">Annual Purchase Frequency</div>
              <div class="param-value">${params.annualPurchaseFrequency}x</div>
            </div>
            <div class="param-item">
              <div class="param-label">Profit Margin</div>
              <div class="param-value">${formatPercentage(
                params.profitMargin
              )}</div>
            </div>
            <div class="param-item">
              <div class="param-label">Reinvestment Rate</div>
              <div class="param-value">${formatPercentage(
                params.reinvestmentRate
              )}</div>
            </div>
            <div class="param-item">
              <div class="param-label">Simulation Timeframe</div>
              <div class="param-value">${
                params.simulationTimeframe
              } months</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Performance Summary</h2>
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-title">Total Revenue</div>
              <div class="metric-value">${formatCurrency(
                results.summary.totalRevenue
              )}</div>
              <div class="metric-description">Cumulative revenue over simulation period</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Total Profit</div>
              <div class="metric-value">${formatCurrency(
                results.summary.totalProfit
              )}</div>
              <div class="metric-description">Cumulative profit over simulation period</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Customer Growth</div>
              <div class="metric-value">${formatNumber(
                results.customerData[results.customerData.length - 1].customers
              )}</div>
              <div class="metric-description">${formatPercentage(
                results.summary.customerGrowth
              )} increase from start</div>
            </div>
            <div class="metric-card">
              <div class="metric-title">Average ROI</div>
              <div class="metric-value">${formatPercentage(
                results.summary.averageROI
              )}</div>
              <div class="metric-description">Return on marketing investment</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Quarterly Performance</h2>
          <table>
            <thead>
              <tr>
                <th>Quarter</th>
                <th>Revenue</th>
                <th>QoQ Growth</th>
                <th>Profit</th>
                <th>Customers</th>
                <th>Marketing Budget</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              ${results.quarterlyData
                .map(
                  (quarter) => `
                <tr>
                  <td>Q${quarter.quarter}</td>
                  <td>${formatCurrency(quarter.revenue)}</td>
                  <td>${formatPercentage(quarter.qoqRevenueGrowth)}</td>
                  <td>${formatCurrency(quarter.profit)}</td>
                  <td>${formatNumber(quarter.customersEnd)}</td>
                  <td>${formatCurrency(quarter.marketingBudget)}</td>
                  <td>${formatPercentage(quarter.roi)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2 class="section-title">Monthly Trends</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Profit</th>
                <th>Customers</th>
                <th>Marketing Budget</th>
              </tr>
            </thead>
            <tbody>
              ${results.revenueData
                .map(
                  (data, index) => `
                <tr>
                  <td>${data.month}</td>
                  <td>${formatCurrency(data.revenue)}</td>
                  <td>${formatCurrency(data.profit)}</td>
                  <td>${formatNumber(
                    results.customerData[index].customers
                  )}</td>
                  <td>${formatCurrency(
                    results.marketingData[index].budget
                  )}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `);

  // Wait for content to load then print
  printWindow.document.close();
  printWindow.focus();

  // Small delay to ensure content is loaded
  setTimeout(() => {
    printWindow.print();
    // Close the window after printing
    printWindow.onafterprint = () => printWindow.close();
  }, 250);
};

// export
