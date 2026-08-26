import StockHero from '@/components/stock-details-page/StockHero';
import StockOverview from '@/components/stock-details-page/StockOverview';
import Overview from '@/components/stock-details-page/Overview';
import CompanyOverview from '@/components/stock-details-page/CompanyOverview';
import PeerComparison from '@/components/stock-details-page/PeerComparison';
import ReturnCalculator from '@/components/stock-details-page/ReturnCalculator';
import ResearchAnalysis from '@/components/stock-details-page/ResearchAnalysis';
import FAQ from '@/components/stock-details-page/FAQ';
import { fetchStockDetails } from '@/lib/api';

export default async function StockDetailsPage() {
  const stockDetails = await fetchStockDetails();
  const data = stockDetails.data || {};

  return (
    <>
      <StockHero data={data} />
      <StockOverview />
      <Overview data={data} />
      <CompanyOverview data={data} />
      <ReturnCalculator />
      <PeerComparison />
      <ResearchAnalysis />
      <FAQ data={data} />
    </>
  );
}
