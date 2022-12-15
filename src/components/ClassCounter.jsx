import React from "react"

export default class ClassCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  increase = () => {
    this.setState({ count: this.state.count + 1 })
  }

  decrease = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    return (
      <>
        <h1>{this.state.count}</h1>
        <button onClick={this.increase}>Increase</button>
        <button onClick={this.decrease}>Decrease</button>
      </>
    )
  }
}
