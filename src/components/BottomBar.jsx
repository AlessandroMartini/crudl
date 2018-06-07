import React from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

@autobind
class BottomBar extends React.Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
        title: PropTypes.node,
    }

    componentDidMount() {
        window.addEventListener('keyup', this.listenForEventOutside)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.listenForEventOutside)
    }

    listenForEventOutside = (e) => {
        if (this.props.open) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                this.props.onClose()
            }
        }
    }

    render() {
        const { open, children, title, onClose } = this.props
        return (
            <aside id="bottombar" role="group">
                <header>
                    {title && <h3>{title}</h3>}
                    <button
                        type="button"
                        aria-label="Close"
                        className="action-clear icon-only"
                        onClick={onClose}
                        >&zwnj;</button>
                </header>
                <div id="bottombar-container" aria-expanded={open}>
                    {children}
                </div>
            </aside>
        )
    }
}

export default BottomBar
