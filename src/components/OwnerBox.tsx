import { useState } from "react";
import {
  buyLand,
  setPrice,
  putForBid,
  sellForMaxBid,
} from "../components/ethersHelper";
let data = require("./../../data.json");

type Props = {
  id: string;
  name: string;
  price: string;
  status: string;
  setInfobox: (val: boolean) => void;
  currBidAmt: string;
};

const InfoBox: React.FC<Props> = (props) => {
  const [askPrice, setAskPrice] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [change, setChange] = useState(true);
  const buyHandler = async () => {
    await buyLand(props.id, data);
  };
  const saleHandler = async () => {
    await buyLand(props.id, data);
  };
  const putForSale = async () => {
    await setPrice(props.id, inputAmount);
    setInputAmount("");
  };
  const putForBidHandler = async () => {
    await putForBid(props.id);
  };
  const sellBid = async () => {
    await sellForMaxBid(props.id);
  };
  return (
    <>
      {props.status == "1" && change && (
        <div id="infobox" >
          <section id="details" className="message -left">
      <i className="nes-kirby"></i>
      <div id="details-content" className="nes-balloon from-left">
      <div><b>{props.name} No:{props.id} </b></div><br />
          
          <div>This is Owned by you</div>
          
          <button id="buy" className="nes-btn is-success"
            onClick={() => {
              setAskPrice(true);
              setChange(false);
            }}
          >
            Put for Sale
          </button>
          <button id="buy" className="nes-btn is-warning" onClick={putForBidHandler}>Put for Bid</button>
          <br />
          <button id="close" className="nes-btn is-error"
            onClick={() => {
              props.setInfobox(false);
            }}
          >
            close
          </button>
          </div>
          </section>
        </div>
      )}
      {props.status == "1" && askPrice && (  
          <div id="infobox" >
          <section id="details" className="message -left">
      <i className="nes-kirby"></i>
      <div id="details-content" className="nes-balloon from-left">
          
          <div className="nes-field">
          <b><label >Enter Amount:</label></b>
          <input
          type="text" id="name_field" className="nes-input"
            onChange={(e) => {
              setInputAmount(e.target.value);
            }}
            value={inputAmount}
          ></input>
          </div>
          
          
          <button id="buy" className="nes-btn is-success" onClick={putForSale}>Put for Sale</button>
          <button id="buy" className="nes-btn is-primary"
            onClick={() => {
              setAskPrice(false);
              setChange(true);
            }}
          >
            Go back
          </button><br />
          <button id="close" className="nes-btn is-error"
            onClick={() => {
              props.setInfobox(false);
            }}
          >
            close
          </button>
          </div>
          </section>
        </div>
          
      )}
      {props.status == "2" && (
        <div id="infobox">
          <section id="details" className="message -left">
      <i className="nes-kirby"></i>
      <div id="details-content" className="nes-balloon from-left">
          <div>This is Owned by you</div>
          <div>You have put this on Sale.</div>
          <button
            onClick={() => {
              props.setInfobox(false);
            }}
          >
            close
          </button>
          </div>
          </section>
        </div>
      )}
      {props.status == "3" && (
        <div id="infobox">
          <section id="details" className="message -left">
      <i className="nes-kirby"></i>
      <div id="details-content" className="nes-balloon from-left">
          <div>This is Owned by you</div>
          <div>You have put this on Bid.</div><br />
          <div>Max Bidding Amount:{props.currBidAmt} ETH</div>
          <button id="buy" className="nes-btn is-success" onClick={sellBid}>Sell For max Bid</button>
          <button id="close" className="nes-btn is-error"
            onClick={() => {
              props.setInfobox(false);
            }}
          >
            close
          </button>
          </div>
          </section>
        </div>
      )}
    </>
  );
};

export default InfoBox;
