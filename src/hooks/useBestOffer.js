import { useQuery } from "react-query";
import axios from "axios";

const getOffer = async () => {

  const { data: offer } = await axios.get(
    "https://apime.dev/api/centurylink_offer?order=price.desc&limit=1",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQSG1QTVBHU3JwNjdITllXVzVwSDd5emd5QmRqTG1NWHZjckFaR0RiZnRGeTR0Zml6Rm9LY1pqdTdFQmtEbzdLSFpLUEZKaGJaUG1GZiI6InQtYjhmY2EyOGYtYTdjYi00ZWY2LWI4NmEtYzE4YTc5NzMxZjUxIiwiSG12TE1nMnFlUDNuSzVWbTV0TVE3RFQzeVd2NmtIRXB1dkJZMmhnYWVSR0dMandTTjRzTDU4MmZXdU5ZM3p6UlY4aGZGSG96Q1BjbkQiOiI3NmExYzk0OS1hNDljLTQwYjgtYWVjOS0xNmVlMzA4OTMyZmMiLCJQVUhpOXdvcEh3VmZ4OUJQR1c1RGI1SEtob3lHUGJDb2pBaEFOSHlmb2lGNFRnRTJEQlNGbnR6RWh2bTdacGlTcVc2ekRaaUpvaHU0QiI6dHJ1ZSwiV0ZEWWROb3ZZb1F4dnJWeFI0dmFiQXVoc0g5dHRnbUszVVVod0hVOHd0RGR5alJnSlE0NFBCMjVSY0hZQUFERGtvZWdTZnU4ZXlCcVQiOmZhbHNlLCJZNTU4ZGpTVnhzdGVnM1BrQWg4QlFFWnhQS1RibnNRSmhXMjl1ZXREelNCUzN6ODVrWXhua0VWR0RwWm1vRDJSS3V2dDRyNWRDYW1vdyI6ZmFsc2UsInNpZ25lZCI6dHJ1ZSwiaWF0IjoxNjAxMDAxNDY1fQ.i7wL4pbusBZxw8Sol2Gbi9bGsUl6ln4q8O07K9TVCRQ`,
      },
    }
  );;
  return offer;
};

export default function useBestOffer() {
  return useQuery("best", getOffer);
}
