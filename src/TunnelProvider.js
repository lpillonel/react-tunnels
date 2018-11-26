import PropTypes from 'prop-types'
import React, { Component } from 'react'

import TunnelState from './TunnelState'
import TunnelContext from './TunnelContext'

export default class TunnelProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <TunnelContext.Provider
        value={{
          tunnelState: new TunnelState(),
        }}
      >
        {this.props.children}
      </TunnelContext.Provider>
    )
  }
}
