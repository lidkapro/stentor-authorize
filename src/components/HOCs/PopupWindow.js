import React, {Component} from 'react'

export const PopupWindow = ComposedComponent =>
    class PopupWindow extends Component {
        state = {visible: false}

        showModal = () => {
            this.setState({visible: true})
        }

        handleOk = () => {
            this.setState({visible: false})
        }

        handleCancel = () => {
            this.setState({visible: false})
        }

        render() {
            return (
                <ComposedComponent
                    {...this.state}
                    {...this.props}
                    handleOk={this.handleOk}
                    showModal={this.showModal}
                    handleCancel={this.handleCancel}
                />
            )
        }
    }
