import { buyLand, placeBid } from "../components/ethersHelper";
import { useState } from "react";
let data = require("./../../alksc.json");

type Props = {
  id: string;
  name: string;
  price: string;
  status: string;
  setInfobox: (val: boolean) => void;
  currBidAmt: string;
  cancel: boolean;
};

const InfoBox: React.FC<Props> = (props) => {
  const [bidAmount, setBidAmount] = useState("");

  const buyHandler = async () => {
    await buyLand(props.id, data).then((r) => {
      console.log(r);
    });
  };
  const bidHandler = async () => {
    await placeBid(props.id, bidAmount).then((r) => {
      console.log(r);
    });
    setBidAmount("");
  };
  return (
    <>
      {(props.status == "0" || props.status == "2") && (
        <div id="infobox" >
          
    <section id="details" className="message -left">
      <i className="nes-kirby"></i>
      
      <div id="details-content" className="nes-balloon from-left">
          
          <div><b>{props.name} No:{props.id} </b></div><br />
          <div>Price:{props.price} ETH</div>
          <div> 
            <b><p className="nes-badge"><span id="badge" className="is-warning">ForSale</span></p></b>
            </div>
          <button id="buy" className="nes-btn is-primary" onClick={buyHandler}>Buy</button>
          <button id="close" className="nes-btn is-error"
            onClick={() => {
              props.setInfobox(false);
            }}
          >Cancel
          </button>
      </div>
    </section>
          
        </div>
      )}
      {props.status == "1" && (
        <div id="infobox" >
          
        <section id="details" className="message -left">
          <i className="nes-kirby"></i>
          
          <div id="details-content" className="nes-balloon from-left">
          <div><b>{props.name} No:{props.id} </b></div><br />
          <div></div>
          <div>This is not for Sale</div>
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
      {props.status == "3" && (
        <div id="infobox2">
        <section id="details" className="message -left">
    <i className="nes-kirby"></i>
    <div id="details-content" className="nes-balloon from-left">
    <div><b>{props.name} No:{props.id} </b></div><br />
          
          <div className="nes-badge">
  <span id="bid" className="is-error">This is for bid</span>
</div>
<div>Current Bid: {props.currBidAmt}</div>
          <div className="nes-field">
          <b><label >Enter Amount in ETH:</label></b>
          <input
          type="text" id="name_field" className="nes-input"
          onChange={(e) => {
            setBidAmount(e.target.value);
          }}
          value={bidAmount}
          ></input>
          </div>
          
          <button  id="buy" className="nes-btn is-warning"  onClick={bidHandler}>Put Bid</button>
          <button  id="close" className="nes-btn is-error" 
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
