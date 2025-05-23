import React, { useEffect, useState } from "react";
import ParameterSlider from "@/components/ParameterSlider";
import MetricCard from "@/components/MetricCard";
import GrowthChart from "@/components/GrowthChart";
import PerformanceScorecard from "@/components/PerformanceScorecard";
import GrowthLoopInfo from "@/components/GrowthLoopInfo";
import {
  SimulationParams,
  SimulationResults,
  formatCurrency,
  formatNumber,
  formatPercentage,
  runSimulation,
} from "@/utils/simulationUtils";
import { exportToCsv, exportToPdf } from "@/utils/exportUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw, Share } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import SprklabsLogo from "../../public/SprklabsLogo";

const Index = () => {
  const defaultParams: SimulationParams = {
    initialCustomerBase: 1000,
    initialAcquisitionBudget: 10000,
    customerAcquisitionCost: 35,
    averageOrderValue: 75,
    annualPurchaseFrequency: 1.5,
    profitMargin: 10,
    reinvestmentRate: 30,
    simulationTimeframe: 24,
  };

  const getInitialParams = (): SimulationParams => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialParams: SimulationParams = { ...defaultParams };

    (Object.keys(defaultParams) as (keyof SimulationParams)[]).forEach(
      (key) => {
        const paramValue = searchParams.get(key);
        if (paramValue !== null) {
          // Attempt to convert to number, fallback to default if parsing fails
          const parsedValue = parseFloat(paramValue);
          if (!isNaN(parsedValue)) {
            (initialParams[key] as number) = parsedValue;
          }
        }
      }
    );

    return initialParams;
  };

  const [params, setParams] = useState<SimulationParams>(getInitialParams());
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<string>("revenue");

  // Run simulation when parameters change
  useEffect(() => {
    const simulationResults = runSimulation(params);
    setResults(simulationResults);
    // Store results and parameters in window object for PDF export
    (
      window as { __SIMULATION_RESULTS__?: SimulationResults }
    ).__SIMULATION_RESULTS__ = simulationResults;
    (
      window as { __SIMULATION_PARAMS__?: SimulationParams }
    ).__SIMULATION_PARAMS__ = params;
  }, [params]);

  const handleSliderChange = (
    key: keyof SimulationParams,
    values: number[]
  ) => {
    setParams((prev) => ({ ...prev, [key]: values[0] }));
  };

  const handleResetSimulation = () => {
    setParams({
      initialCustomerBase: 1000,
      initialAcquisitionBudget: 10000,
      customerAcquisitionCost: 35,
      averageOrderValue: 75,
      annualPurchaseFrequency: 1.5,
      profitMargin: 10,
      reinvestmentRate: 30,
      simulationTimeframe: 24,
    });
  };

  const copyShareLink = (): void => {
    const dummyShareUrl = `${window.location.href}?initialCustomerBase=${params.initialCustomerBase}&initialAcquisitionBudget=${params.initialAcquisitionBudget}&customerAcquisitionCost=${params.customerAcquisitionCost}&averageOrderValue=${params.averageOrderValue}&annualPurchaseFrequency=${params.annualPurchaseFrequency}&profitMargin=${params.profitMargin}&reinvestmentRate=${params.reinvestmentRate}&simulationTimeframe=${params.simulationTimeframe}`;
    navigator.clipboard
      .writeText(dummyShareUrl)
      .then(() => {
        toast("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy link. Please try again.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="  text-3xl font-bold mb-2">
          E-Commerce Paid Growth Loop Simulator
        </h1>

        <p className=" text-gray-600">
          Visualize how reinvesting revenue into customer acquisition creates
          compounded growth over time
        </p>
      </div>

      {/* Model Parameters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Model Parameters</h2>
          <div className=" flex justify-between">
            <p className="text-gray-600 mb-6">
              Adjust these parameters to customize your growth loop simulation
            </p>
            <div
              className="cursor-pointer border p-3  rounded-md hover:bg-slate-100"
              onClick={handleResetSimulation}
            >
              <RefreshCcw
                className="cursor-pointer "
                onClick={handleResetSimulation}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ParameterSlider
                label="Initial Customer Base"
                value={params.initialCustomerBase}
                onChange={(value) =>
                  handleSliderChange("initialCustomerBase", value)
                }
                min={100}
                max={5000}
                step={100}
                tooltip="The number of existing customers you start with before implementing your growth loop."
                tips="Higher initial customer bases provide a stronger foundation for growth but don't guarantee faster scaling. For startups, use a realistic number based on your current traction."
                bestPractice="Use your actual current customer count. If pre-launch, estimate your expected early adopters."
              />

              <ParameterSlider
                label="Initial Acquisition Budget"
                value={params.initialAcquisitionBudget}
                onChange={(value) =>
                  handleSliderChange("initialAcquisitionBudget", value)
                }
                min={1000}
                max={50000}
                step={1000}
                prefix="$"
                tooltip="Your starting marketing budget before revenue reinvestment begins"
                tips="This represents your initial investment in customer acquisition before reinvestment of profits begins fueling growth"
                bestPractice="Allocate an amount that allows you to acquire at least 20-30% more customers at your current CAC"
              />

              <ParameterSlider
                label="Customer Acquisition Cost (CAC)"
                value={params.customerAcquisitionCost}
                onChange={(value) =>
                  handleSliderChange("customerAcquisitionCost", value)
                }
                min={5}
                max={200}
                step={1}
                prefix="$"
                tooltip="Average cost to acquire one new customer through your marketing channels."
                tips="Lower CAC improves ROI and accelerates growth. Focus on efficient acquisition channels."
                bestPractice="Use your actual CAC if known. If unsure, research industry benchmarks for your business model."
              />

              <ParameterSlider
                label="Average Order Value (AOV)"
                value={params.averageOrderValue}
                onChange={(value) =>
                  handleSliderChange("averageOrderValue", value)
                }
                min={10}
                max={500}
                step={5}
                prefix="$"
                tooltip="The average amount each customer spends per purchase."
                tips="Higher AOV directly impacts your revenue potential. Consider bundling or upselling strategies."
                bestPractice="Use your actual AOV from existing sales data. For new products, research comparable offerings in your market."
              />
            </div>

            <div>
              <ParameterSlider
                label="Annual Purchase Frequency"
                value={params.annualPurchaseFrequency}
                onChange={(value) =>
                  handleSliderChange("annualPurchaseFrequency", value)
                }
                min={1}
                max={12}
                step={0.1}
                tooltip="How many times a customer purchases from you in a year."
                tips="Higher purchase frequency compounds revenue. Consider subscription models or reorder reminders."
                bestPractice="Use actual repurchase data if available. For new products, be conservative with estimates."
              />

              <ParameterSlider
                label="Profit Margin"
                value={params.profitMargin}
                onChange={(value) => handleSliderChange("profitMargin", value)}
                min={1}
                max={90}
                step={1}
                suffix="%"
                tooltip="The percentage of revenue that becomes profit after expenses."
                tips="Higher margins provide more capital for reinvestment, accelerating your growth loop."
                bestPractice="Use your actual profit margins. If developing a new product, calculate based on COGS and overhead."
              />

              <ParameterSlider
                label="Reinvestment Rate"
                value={params.reinvestmentRate}
                onChange={(value) =>
                  handleSliderChange("reinvestmentRate", value)
                }
                min={5}
                max={80}
                step={1}
                suffix="%"
                tooltip="Percentage of profit reinvested in marketing."
                tips="Higher reinvestment rates accelerate growth but reduce short-term profits."
                bestPractice="Strike a balance between growth and sustainability. 20-40% is common for early-stage businesses."
              />

              <ParameterSlider
                label="Simulation Timeframe"
                value={params.simulationTimeframe}
                onChange={(value) =>
                  handleSliderChange("simulationTimeframe", value)
                }
                min={6}
                max={60}
                step={1}
                suffix=" months"
                tooltip="How many months into the future to simulate growth."
                tips="Longer timeframes show compound effects but become less accurate due to market changes."
                bestPractice="12-24 months is practical for most businesses. Use longer periods to visualize compound growth."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      {results && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Performance Summary</h2>
            <p className="text-gray-600 mb-6">
              Key metrics from your growth loop simulation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Revenue"
                value={formatCurrency(results.summary.totalRevenue)}
                description="Cumulative revenue over simulation period"
                type="revenue"
              />

              <MetricCard
                title="Total Profit"
                value={formatCurrency(results.summary.totalProfit)}
                description="Cumulative profit over simulation period"
                type="profit"
              />

              <MetricCard
                title="Customer Growth"
                value={`${formatNumber(
                  results.customerData[results.customerData.length - 1]
                    .customers
                )}`}
                description={`${formatPercentage(
                  results.summary.customerGrowth
                )} increase from start`}
                type="customers"
                growth={Math.round(results.summary.customerGrowth)}
              />

              <MetricCard
                title="Average ROI"
                value={`${formatPercentage(results.summary.averageROI)}`}
                description="Return on marketing investment"
                type="roi"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Growth Projection Results */}
      {results && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">
              Growth Projection Results
            </h2>
            <p className="text-gray-600 mb-6">
              Visual representation of your growth metrics over time
            </p>

            <Tabs
              defaultValue="revenue"
              value={activeChartTab}
              onValueChange={setActiveChartTab}
              className="mb-6"
            >
              <TabsList className="mb-8 ">
                <TabsTrigger value="revenue">Revenue & Profit</TabsTrigger>
                <TabsTrigger value="customers">Customer Growth</TabsTrigger>
                <TabsTrigger value="marketing">Marketing Budget</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly View</TabsTrigger>
              </TabsList>

              <TabsContent value="revenue">
                <GrowthChart data={results.revenueData} type="revenue" />
              </TabsContent>

              <TabsContent value="customers">
                <GrowthChart data={results.customerData} type="customers" />
              </TabsContent>

              <TabsContent value="marketing">
                <GrowthChart data={results.marketingData} type="marketing" />
              </TabsContent>

              <TabsContent value="quarterly">
                <h3 className="text-lg font-medium mb-3">
                  Quarterly Performance Scorecard
                </h3>
                <PerformanceScorecard data={results.quarterlyData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Share & Export */}
      {results && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Share & Export</h2>
            <p className="text-gray-600 mb-6">
              Save your simulation results or share them with others
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-3">Export Data</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => exportToCsv(results)}
                    className="justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={exportToPdf}
                    className="justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium mb-3">Share Results</h3>
                <Button
                  variant="outline"
                  onClick={copyShareLink}
                  className="justify-start"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Understanding Growth Loops */}
      <GrowthLoopInfo />

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          <span className="font-semibold">Devhaus</span> © 2025
        </p>
        <div className="flex gap-2 items-center justify-center">
          <p className="mt-1">In partnership with </p>
          <a href="https://www.sprklabs.io/" target="_blank" rel="noreferrer">
            <SprklabsLogo />
          </a>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Index;
