import React from "react";
import "./modal.css";
export default class Modal extends React.Component {
  onClose(e) {
    this.props.onClose && this.props.onClose(e);
  }
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Obrigado pela compra, volte sempre!</h2>
        <div class="content">
          {this.props.children}
          <div class="actions">
            <button
              class="toggle-button"
              onClick={() => {
                this.onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
