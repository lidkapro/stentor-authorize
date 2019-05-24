import React, {Component} from 'react'

export const PopupWindow = ComposedComponent =>
    class PopupWindow extends Component {
        state = {visible: false}

        showModal = () => {
            this.setState({visible: true})
        }

        handleCancel = () => {
            this.setState({visible: false})
        }

        render() {
            return (
                <ComposedComponent
                    {...this.state}
                    {...this.props}
                    showModal={this.showModal}
                    handleCancel={this.handleCancel}
                />
            )
        }
    }
