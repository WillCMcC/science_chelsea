const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();

const getOffers = async () => {
  var tokenConfig = {
    method: "post",
    url: "https://api.centurylink.com/oauth/token?grant_type=client_credentials",
    headers: {
      Referer: "https://shop.centurylink.com/",
      Origin: "https://shop.centurylink.com/",
      Host: "api.centurylink.com",
      Authorization:
        "Basic aEhzNTRxNUpnbFN1a1ZHWlNvdGxpdldhN083OE5TVVE6OWNjemhSOTd1V0VoNTg5OA==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: { grant_type: "client_credentials" },
  };

  const { data: token_data } = await axios(tokenConfig);

  let token = token_data.access_token;

  var config = {
    method: "post",
    url: "https://api.centurylink.com/Application/v2/DCEP-Consumer/offer",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      addressId: "211959565",
      billingSource: "L-Q",
      fullAddress: "607 W 28TH ST,VANCOUVER,WA 98660,USA",
      orderRefNum: "ORD1604598892183",
      wireCenter: "VANCWA01",
    },
  };

  const { data: offers } = await axios(config);

  return offers;
};

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/offers", async function (req, res) {
  let offers;
  try {
    offers = await getOffers();
  } catch (error) {
    console.log(error.message);
  }

  for (let offerIndex in offers.offersList) {
    let offer = offers.offersList[offerIndex];

    let offerRow;
    let existingOffer;

    try {
      existingOffer = await axios.get(
        `https://apime.dev/api/centurylink_offer?centurylink_id=eq.${offer.catalogId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQSG1QTVBHU3JwNjdITllXVzVwSDd5emd5QmRqTG1NWHZjckFaR0RiZnRGeTR0Zml6Rm9LY1pqdTdFQmtEbzdLSFpLUEZKaGJaUG1GZiI6InQtYjhmY2EyOGYtYTdjYi00ZWY2LWI4NmEtYzE4YTc5NzMxZjUxIiwiSG12TE1nMnFlUDNuSzVWbTV0TVE3RFQzeVd2NmtIRXB1dkJZMmhnYWVSR0dMandTTjRzTDU4MmZXdU5ZM3p6UlY4aGZGSG96Q1BjbkQiOiI3NmExYzk0OS1hNDljLTQwYjgtYWVjOS0xNmVlMzA4OTMyZmMiLCJQVUhpOXdvcEh3VmZ4OUJQR1c1RGI1SEtob3lHUGJDb2pBaEFOSHlmb2lGNFRnRTJEQlNGbnR6RWh2bTdacGlTcVc2ekRaaUpvaHU0QiI6dHJ1ZSwiV0ZEWWROb3ZZb1F4dnJWeFI0dmFiQXVoc0g5dHRnbUszVVVod0hVOHd0RGR5alJnSlE0NFBCMjVSY0hZQUFERGtvZWdTZnU4ZXlCcVQiOnRydWUsIlk1NThkalNWeHN0ZWczUGtBaDhCUUVaeFBLVGJuc1FKaFcyOXVldER6U0JTM3o4NWtZeG5rRVZHRHBabW9EMlJLdXZ0NHI1ZENhbW93Ijp0cnVlLCJzaWduZWQiOnRydWUsImlhdCI6MTYwMTAwMTQ2NX0.yrD48Ogj-6ydFDu7ML-H7Jo8DNk_Ae3McHrGiBBMttM`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }

    if (!existingOffer.data[0]) {
      try {
        offerRow = await axios.post(
          "https://apime.dev/api/centurylink_offer",
          {
            centurylink_id: offer.catalogId,
            description: offer.description,
            price: offer.price,
            speed: offer.downloadSpeed,
            mbps: offer.downloadSpeedMbps,
            fiber: !!offer.gfastFlag,
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQSG1QTVBHU3JwNjdITllXVzVwSDd5emd5QmRqTG1NWHZjckFaR0RiZnRGeTR0Zml6Rm9LY1pqdTdFQmtEbzdLSFpLUEZKaGJaUG1GZiI6InQtYjhmY2EyOGYtYTdjYi00ZWY2LWI4NmEtYzE4YTc5NzMxZjUxIiwiSG12TE1nMnFlUDNuSzVWbTV0TVE3RFQzeVd2NmtIRXB1dkJZMmhnYWVSR0dMandTTjRzTDU4MmZXdU5ZM3p6UlY4aGZGSG96Q1BjbkQiOiI3NmExYzk0OS1hNDljLTQwYjgtYWVjOS0xNmVlMzA4OTMyZmMiLCJQVUhpOXdvcEh3VmZ4OUJQR1c1RGI1SEtob3lHUGJDb2pBaEFOSHlmb2lGNFRnRTJEQlNGbnR6RWh2bTdacGlTcVc2ekRaaUpvaHU0QiI6dHJ1ZSwiV0ZEWWROb3ZZb1F4dnJWeFI0dmFiQXVoc0g5dHRnbUszVVVod0hVOHd0RGR5alJnSlE0NFBCMjVSY0hZQUFERGtvZWdTZnU4ZXlCcVQiOnRydWUsIlk1NThkalNWeHN0ZWczUGtBaDhCUUVaeFBLVGJuc1FKaFcyOXVldER6U0JTM3o4NWtZeG5rRVZHRHBabW9EMlJLdXZ0NHI1ZENhbW93Ijp0cnVlLCJzaWduZWQiOnRydWUsImlhdCI6MTYwMTAwMTQ2NX0.yrD48Ogj-6ydFDu7ML-H7Jo8DNk_Ae3McHrGiBBMttM`,
            },
          }
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  offers.offersList = offers.offersList.map((offer) => {
    return {
      centurylink_id: offer.catalogId,
      description: offer.description,
      price: offer.price,
      speed: offer.downloadSpeed,
      mbps: offer.downloadSpeedMbps,
    };
  });
  res.json(offers);
});
app.listen(9055);
