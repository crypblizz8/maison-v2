import { PrivyClient, SiweSession } from "@privy-io/privy-browser";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Form from "./components/Form";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import axios from "axios";
import Web3 from "web3";
import TabContainer from "./components/TabContainer";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  const [indexFile, setIndexFile] = useState();

  const [ipfsHash, setIPFSHash] = useState();
  const [ensDomain, setENSDomain] = useState();

  const [ipfsHashData, setIPFSHashData] = useState(false);

  const { address } = useAccount();

  // Get file for Pinata.
  const fileInput = useRef();

  const web3calling = async () => {
    // alert("ensDomain", ensDomain);
    // return;
    try {
      web3.eth.ens
        .setContenthash(ensDomain, `ipfs://${ipfsHash}`, {
          from: process.env.NEXT_TEMP_ENS_ADDRESS_SENDER,
        })
        .then(function (result) {
          console.log(result.events);
        });
    } catch (error) {
      console.log("Error settingContentHash data to web3: ", error);
    }
  };

  useEffect(() => {
    // web3calling();
    // console.log("ensDomain", ensDomain);
  }, [authenticated, address, ipfsHashData, ensDomain]);

  return (
    <div>
      <Header />
      {/* <h1 className="text-8xl bold font-medium text-gray-900 py-4">
        Decentralized <br /> Front ends
      </h1> */}

      <main className="flex flex-row justify-center items-center min-h-[95vh] ">
        <TabContainer />
        {/* <Form
          ensDomain={ensDomain}
          setENSDomain={setENSDomain}
          web3calling={web3calling}
          ipfsHashData={ipfsHashData}
          authenticated={authenticated}
          ipfsHash={ipfsHash}
          setIPFSHash={setIPFSHash}
          setIndexFile={setIndexFile}
          fileRef={fileInput}
        /> */}
      </main>
    </div>
  );
}
