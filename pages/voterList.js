import React, { useState, useEffect, useContext } from "react";

import VoterCard from "../components/voterCard/voterCard";
import Style from "../styles/voterList.module.css";
import CustomCursor from "@/components/ciivicchain/CustomCursor";

import { VotingContext } from "../context/Voter";
const voterList = () => {
  const { getAllVoterData, voterArray } = useContext(VotingContext);

  useEffect(() => {
    getAllVoterData();
  }, []);

  return (
    <div className={Style.voterList} style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <CustomCursor />
      <VoterCard voterArray={voterArray} />
    </div>
  );
};

export default voterList;




