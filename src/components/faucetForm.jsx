import HCaptcha from "@hcaptcha/react-hcaptcha";
import React, { Component } from "react";

class FaucetForm extends Component {
  constructor(props) {
    super(props);
    this.hCaptchaRef = React.createRef();
  }

  state = {
    data: "",
    disabled: true,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.hCaptchaRef.current.resetCaptcha();
    this.props.raiseSubmit(this.state.data["addressInput"]);
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data }, () => this.validate());
  };

  validate = () => {
    const { data } = this.state;

    if (!data["addressInput"] || data["addressInput"].length === 0) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  renderButtonClass = () => {
    const { success } = this.props;
    if (success === true) {
      return "btn btn-success";
    } else if (success === false) {
      return "btn btn-danger";
    }
    return "btn btn-primary";
  };

  onVerifyCaptcha = (token) => {
    console.log(token);
  };

  render() {
    const { data, disabled } = this.state;
    return (
      <React.Fragment>
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <h4>Payout address:</h4>
            <input
              type="input"
              className="form-control form-control-md"
              name="addressInput"
              style={{ marginTop: "15px" }}
              placeholder="Enter Sumcoin address"
              value={data["addressInput"] || ""}
              onChange={(e) => this.handleChange(e)}
            />
            <small className="form-text text-muted">
              Current Payout varies, currently <b>"0.00001"</b> SUM.
            </small>
          </div>
        </div>
        <div
          className="row"
          style={{ display: "inline-block", margin: "15px" }}
        >
          <HCaptcha
            sitekey="8231157b-b8d7-4273-87dc-5c836e422274"
            ref={this.hCaptchaRef}
            onVerify={(e) => this.props.raiseCaptcha(e)}
          />
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <button
              disabled={disabled}
              className={this.renderButtonClass()}
              onClick={(e) => this.handleSubmit(e)}
              style={{ margin: "10px" }}
            >
              Request
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FaucetForm;
