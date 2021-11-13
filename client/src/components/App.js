import React, { useEffect, useState } from "react";
import Home from "./Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./User/User";
import Hospital from "../abis/Hospital.json";
import Web3 from "web3";
import Login from "./Register/Login";
import SignUp from "./Register/SignUp";

function App() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [hospital, setHospital] = useState("");

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
  }, []);

  const loadBlockChain = async () => {
    const web3 = window.web3;

    const account = await web3?.eth.getAccounts();
    if (account) {
      setAccount(account[0]);
    }
    console.log(account);
    const hospitalId = await web3?.eth.net.getId();
    console.log(hospitalId);

    const hospitalData = Hospital.networks[hospitalId];
    if (hospitalData) {
      console.log(hospitalData.address);
      const hospital = await new web3.eth.Contract(
        Hospital.abi,
        hospitalData.address
      );
      setHospital(hospital);
      console.log(hospital);

      const time = await hospital.methods.time().call();
      console.log(time / 100);

      const tokenStart = await hospital.methods.tokenStart().call();
      const tokenNum = await hospital.methods.tokenNum().call();
      for (let i = tokenStart; i <= tokenNum; i++) {
        const patient = await hospital.methods.patients(i).call();
        console.log(patient[0]);
        console.log(patient[1] / 100);
        console.log(patient[2]);
      }

      setLoading(false);
    } else {
      window.alert("Voting Contract not deployed to detected voting");
    }
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-ethereum browser detected. You should consider trying metamask"
      );
    }
  };

  return (
    <div className="main_app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user">
            <User hospital={hospital} account={account} />
          </Route>
          <Route exact path="/login">
            <Login hospital={hospital} account={account} />
          </Route>
          <Route exact path="/signup">
            <SignUp hospital={hospital} account={account} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
