import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { VotingContext } from "../context/Voter";
import Style from "../styles/index.module.css";
import Card from "../components/card/card";
import CustomCursor from "@/components/ciivicchain/CustomCursor";

const Home = () => {
  const router = useRouter();
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    getAllVoterData,
    currentAccount,
    voterLength,
  } = useContext(VotingContext);

  useEffect(() => {
    const checkWallet = async () => {
      const account = await checkIfWalletIsConnected();
      if (!account) {
        router.push("/");
      }
    };
    checkWallet();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getNewCandidate();
      getAllVoterData();
    }
  }, [currentAccount]);

  if (!currentAccount) {
    return null;
  }

  return (
    <div className={Style.home} style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <CustomCursor />
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>
                No Candidate:<span style={{ color: '#FF9D00', fontFamily: "'DM Mono', monospace" }}>{candidateLength || 0}</span>
              </p>
            </div>
            <div className={Style.candidate_list}>
              <p>
                No Voter:<span style={{ color: '#FF9D00', fontFamily: "'DM Mono', monospace" }}>{voterLength || 0}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  );
};

export default Home;