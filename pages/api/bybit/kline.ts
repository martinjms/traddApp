// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { APIResponseWithTime, InverseClient } from 'bybit-api'
import dayjs from 'dayjs'

export type Candle = {
  symbol: string,
  open_time: number,
  interval: string,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  turnover: string
}
type KlineResponse = {
  ret_code: number,
  ret_msg: string,
  ext_code: string,
  ext_info: string,
  result: Candle[],
  time_now: string
}
const useLivenet = true;

const client = new InverseClient(
  process.env.API_KEY,
  process.env.API_SECRET,
  useLivenet,
);

export function getKline() {
  console.log("getKline")
  return client.getKline({ symbol: 'BTCUSD', interval: "D", from: dayjs().subtract(200, "days").unix(), limit: 200 })
    .then((res) => {
      console.log("success")
      return [200, res.result as Candle[], null] as const
    })
    .catch(err => {
      return [400, null, err] as const
    });

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<KlineResponse>
) {
  const [code, payload, error] = await getKline()

  res.status(code).json(payload || error)
}
