import React from "react";

const Footer = (props) => {
  return (
    <footer className="footer navbar_sum">
      <div className="container">
        <p className="donate_addr text-light">
          If you're able, please consider donating back the faucet
          <button
            type="button"
            onClick={() =>
              props.raiseShowModal("Sk6ES3MxKhpqcXhNx9XJYgroNVjhQoerZ9")
            }
            className="btn btn-secondary donate_addr"
          >
            Sk6ES3MxKhpqcXhNx9XJYgroNVjhQoerZ9
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
