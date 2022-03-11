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
      ok
    </div>
  );
};

export default CenturyCheck;
