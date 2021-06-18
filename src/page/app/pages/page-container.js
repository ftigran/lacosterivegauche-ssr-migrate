import React, { useState } from "react";
import { Footer } from "../components/footer";
import { Top } from "../components/top";
import { Instruction } from "../components/instruction";
import { Prizes } from "../components/prizes";
import { Winners } from "../components/winners";
import { Header } from "../components/header";
import Grid from "@material-ui/core/Grid";
import json2mq from "json2mq";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const PageContainer = () => {
  const mobile = useMediaQuery(
    json2mq({
      maxWidth: 759,
    })
  );

  return (
    <Grid container justify="center" className="pageWrapper">
      <Header />
      <Top />
      <Grid container className="gradientBG" justify="center">
        <Grid item xs={12} style={{ maxWidth: 1200 }}>
          <img
            src="/src/images/fl1.png"
            width="885"
            height="889"
            className="bgimg img1"
          />
          <img
            src="/src/images/fl2.png"
            width="873"
            height="873"
            className="bgimg img2"
          />
          <img
            src="/src/images/fl3.png"
            width="927"
            height="927"
            className="bgimg img3"
          />
          <Instruction />
          <h2>Призы</h2>
          <Prizes />
          <h2>Победители</h2>
          <div className="bgimg img4">
            <img
              src="/src/images/fl4.png"
              width="904"
              height="831"
              className="bgiamg imga4"
            />
          </div>
          <Winners />
        </Grid>
      </Grid>
      {/* <Grid item className="contentWrapper" xs={12}></Grid> */}
      <Footer />
    </Grid>
  );
};

export default PageContainer;
