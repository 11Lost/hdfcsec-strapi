import StockHero from '@/components/stock-details-page/StockHero';
import StockOverview from '@/components/stock-details-page/StockOverview';
import Overview from '@/components/stock-details-page/Overview';
import CompanyOverview from '@/components/stock-details-page/CompanyOverview';
import PeerComparison from '@/components/stock-details-page/PeerComparison';
import ReturnCalculator from '@/components/stock-details-page/ReturnCalculator';
import ResearchAnalysis from '@/components/stock-details-page/ResearchAnalysis';
import FAQ from '@/components/stock-details-page/FAQ';

export default function StockDetailsPage() {
  return (
    <>
      <StockHero />
      <StockOverview />
      <Overview />
      <CompanyOverview />
      <ReturnCalculator />
      <PeerComparison />
      <ResearchAnalysis />
      <FAQ />
    </>
  );
}
