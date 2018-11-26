import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

import TunnelContext from './TunnelContext'

export default class TunnelPlaceholder extends Component {
  static propTypes = {
    children: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.symbol]),
    id: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
  }

  static defaultProps = {
    component: Fragment,
  }

  static contextType = TunnelContext

  componentDidMount() {
    const { id } = this.props
    const { tunnelState } = this.context
    tunnelState.subscribe(id, this.handlePropsChange)
  }

  componentWillUnmount() {
    const { id } = this.props
    const { tunnelState } = this.context
    tunnelState.unsubscribe(id, this.handlePropsChange)
  }

  handlePropsChange = () => {
    this.forceUpdate()
  }

  render() {
    const { tunnelState } = this.context
    const {
      id,
      children: renderChildren,
      component: Tag,
      multiple,
      ...props
    } = this.props
    const tunnelProps = tunnelState.getTunnelProps(id)

    if (renderChildren) {
      if (Array.isArray(tunnelProps) || multiple) {
        return !tunnelProps
          ? renderChildren({ items: [] })
          : renderChildren({
              items: Array.isArray(tunnelProps) ? tunnelProps : [tunnelProps],
            })
      } else {
        return renderChildren(tunnelProps || {})
      }
    }

    if (Array.isArray(tunnelProps)) {
      return (
        <Tag>
          {tunnelProps.map((item, i) => {
            if (typeof item.children === 'function') {
              return React.cloneElement(item.children(props), { key: i })
            }
            return React.cloneElement(item.children, { key: i })
          })}
        </Tag>
      )
    } else if (tunnelProps) {
      if (typeof tunnelProps.children === 'function') {
        return <Tag>{tunnelProps.children(props)}</Tag>
      }
      return <Tag>{tunnelProps.children}</Tag>
    } else {
      return null
    }
  }
}
