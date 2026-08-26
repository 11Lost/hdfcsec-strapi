import StockHero from '@/components/stock-details-page/StockHero';
import StockOverview from '@/components/stock-details-page/StockOverview';
import Overview from '@/components/stock-details-page/Overview';
import CompanyOverview from '@/components/stock-details-page/CompanyOverview';
import PeerComparison from '@/components/stock-details-page/PeerComparison';
import ReturnCalculator from '@/components/stock-details-page/ReturnCalculator';
import ResearchAnalysis from '@/components/stock-details-page/ResearchAnalysis';
import FAQ from '@/components/stock-details-page/FAQ';
import News from '@/components/stock-details-page/News';
import Reports from '@/components/stock-details-page/Reports';
import { fetchStockDetails } from '@/lib/api';

export default async function StockDetailsPage() {
  const stockDetails = await fetchStockDetails();
  const data = stockDetails.data || {};

  return (
    <>
      <StockHero data={data} />
      <StockOverview />
      <Overview data={data} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '65% calc(35% - 24px)', gap: '24px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <CompanyOverview data={data} />
          <ReturnCalculator data={data} />
          <PeerComparison />
          <ResearchAnalysis />
          <FAQ data={data} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <News data={data} />
          <Reports data={data} />
        </div>
      </div>
    </>
  );
}
