import { Candle, getKline } from './api/bybit/kline';

import dynamic from "next/dynamic";
const DynamicChart = dynamic(() => import('../components/DynamicChart'), {
  ssr: false,
})
export async function getServerSideProps() {
  // Fetch data from external API
  console.log("")
  let candles;
  const [code, kline, error] = await getKline()
  if (code == 200 && kline) {
    candles = kline.map(x => ({
      time: x.open_time,
      open: x.open,
      high: x.high,
      low: x.low,
      close: x.close
    }))
  }
  return { props: { data: candles } }

}

export default function Chart({ data }: { data: Candle[] }) {
  console.log(data)
  return (
    <div >
      <DynamicChart data={data} />
    </div>
  );
}
