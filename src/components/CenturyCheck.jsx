import React from "react";
import { PuffLoader } from "react-spinners";
import useCheck from "../hooks/useCheck.js";
import useBestOffer from "../hooks/useBestOffer.js";

const CenturyCheck = (props) => {
  const { status, data, error, isFetching } = useCheck();
  const { status: bestStatus, data: bestOffer } = useBestOffer();

  let gigaBit = [];

  if (data && !bestOffer.fiber) {
    gigaBit = data && data.filter((offer) => offer.mbps > 900);
  } else if (bestOffer && bestOffer.fiber) {
    gigaBit = [bestOffer];
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "60px",
        backgroundColor: "rgba(0,0,0,.1)",
        maxWidth: "100vw",
        maxHeight: "calc(100vh - 90px)",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      <div
        style={{
          opacity: isFetching ? ".6" : "0",
          display: "flex",
          gap: "20px",
          fontSize: "12px",
          lineHeight: "23px",
          flexDirection: window.innerHeight > window.innerWidth ? 'column' : 'row'
        }}
      >
        <PuffLoader size={15} />
        <span>I'm asking Centurylink for updates...</span>
      </div>
      <h1>Do Chelsea and Will have gigbit ethernet available yet?</h1>
      {bestStatus != "loading" && <h2>{gigaBit[0] ? "Yes" : "Nope"}</h2>}
      {status == "loading" && !isFetching && <div>{"Loading..."}</div>}
      {bestOffer && bestOffer[0] && (
        <div>
          <div>{`Best known offer from CenturyLink is ${bestOffer[0].mbps} Mbps down at $${bestOffer[0].price}/month`}</div>
          <div
            style={{
              fontWeight: "lighter",
            }}
          >
            "{bestOffer[0].description}"
          </div>
        </div>
      )}
      <span
        style={{
          alignSelf: 'flex-end',
          marginTop: 'auto',
        }}
      >Contact: will@apime.dev</span>
    </div>
  );
};

export default CenturyCheck;
