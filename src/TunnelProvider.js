import PropTypes from 'prop-types'
import React, { Component } from 'react'

import SlotFillState from './TunnelState'
import SlotFillContext from './TunnelContext'

export default class TunnelProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <SlotFillContext.Provider
        value={{
          tunnelState: new SlotFillState(),
        }}
      >
        {this.props.children}
      </SlotFillContext.Provider>
    )
  }
}
