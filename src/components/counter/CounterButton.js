import { Component } from "react";
import propTypes from "prop-types";
import classes from "./counter.module.css";

class CounterButton extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="counter">
        <button onClick={() =>this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
        <button onClick={() =>this.props.decrementMethod(this.props.by)}>+{this.props.by}</button>
      </div>
    );
  }



}

CounterButton.defaultProps = {
  by: 1
};

CounterButton.propTypes = {
  by: propTypes.number
};

export default CounterButton;
