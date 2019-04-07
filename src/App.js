import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import GitHubButton from "react-github-btn";
import http from "./services/httpService";
import DonationModal from "./components/donationModal";
import Loader from "react-loader-spinner";
import FaucetForm from "./components/faucetForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    loading: false,
    modalShow: false,
    gCaptcha: "",
    success: ""
  };

  showModal = () => {
    this.setState({
      modalShow: true
    });
  };

  hideModal = () => {
    this.setState({
      modalShow: false
    });
  };

  handleCaptcha = gCaptcha => {
    this.setState({ gCaptcha });
  };

  doSubmit = async data => {
    const { gCaptcha } = this.state;
    this.setState({ loading: true });

    let success = false;
    let message = "";
    let txID = "";

    if(data && gCaptcha) {
    const response = await http.post("backend/backend.php", {
      "g-recaptcha-response": gCaptcha,
      address: data
    });

    if (response.data.result) {
      success = true;
      txID = response.data.txid;
    } else if (response.data.message) {
      message = response.data.message;
    }
   } else {
     message = "Please prove you're not a robot.";
   } 

    this.setState({
      loading: false,
      success,
      txID,
      message,
      address: data,
      gCaptcha: ""
    });
  };

  render() {
    const { loading, modalShow, success, address, message, txID } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div
          style={{
            position: "absolute",
            width: "100%",
            minWidht: "100vw",
            minHeight: "100vh"
          }}
        >
          {loading && (
            <div className="loader">
              <Loader
                type="RevolvingDot"
                color="#3cb054"
                height="100"
                width="100"
              />
            </div>
          )}
          <header>
            <div className="navbar_ppc navbar-dark shadow-sm">
              <div className="container d-flex justify-content-between">
                <img
                  className="logo"
                  style={{ maxWidth: "100vw", margin: 10 }}
                  src="https://peercoinexplorer.net/peercoin-horizontal-greenleaf-whitetext-transparent.svg"
                  alt="Peercoin Logo"
                />
              </div>
            </div>
          </header>
          <main role="main">
            <section className="jumbotron text-center">
              <div className="container">
                <DonationModal
                  modalShow={modalShow}
                  hideModal={this.hideModal}
                />
                <h1 className="jumbotron-heading">Peercoin Testnet Faucet</h1>
                <hr />
                <FaucetForm
                  raiseSubmit={this.doSubmit}
                  raiseCaptcha={this.handleCaptcha}
                  success={success}
                />
                {success === true && (
                  <div
                    className="alert alert-success"
                    role="alert"
                    style={{ marginTop: "10px", wordWrap: "break-word" }}
                  >
                    <b>
                      100  tPPC have been paid out to <span className="donate_addr">n4pJDAqsagWbouT7G7xRH8548s9pZpQwtG </span>{address}{" "}
                      <br/>Transaction ID:<span className="donate_addr">7b65b660b17efcb82f4a84f1c34a27d5ef371abcd1719c8ff80ff83d96e33b8e {txID}</span>
                    </b>
                  </div>
                )}
                {success === false && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ marginTop: "10px" }}
                  >
                    <b>Something went wrong. Please try again. </b>
                    <p>{message}</p>
                  </div>
                )}
       
              <div className="alert alert-secondary" style={{margin: "10px auto"}} role="alert">
              Please send unused coins back to: <span className="donate_addr">
              n4pJDAqsagWbouT7G7xRH8548s9pZpQwtG
            </span>
            </div>
            </div>
            </section>
          </main>
          <footer className="footer navbar_ppc">
            <div className="container">
              <p className="donate_addr text-light">
                If you're enjoying this service, please consider donating to
                <button
                  type="button"
                  onClick={() => this.showModal()}
                  className="btn btn-secondary donate_addr"
                >
                  PA3VZmupxdsX5TuS1PyXZPsbbhZGT2htPz
                </button>
              </p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
