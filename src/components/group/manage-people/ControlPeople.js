import React, {Component} from 'react'
import {Card, Transfer, Icon} from 'antd'

class ControlPeople extends Component {
    state = {
        mockData: [
            {
                key: 1,
                name: 'Moska'
            },
            {
                key: 2,
                name: 'Stepan Litvinov'
            },
            {
                key: 3,
                name: 'Ivan Ivanov'
            }],
        targetKeys: [2, 3]
    }

    handleChange = targetKeys => {
        this.setState({targetKeys})
    }
    renderTitle = title => {
        return (
            <div>
                {
                    title === 'Members' ?
                        <Icon style={{marginRight:3}} type="smile" theme="twoTone"/> :
                        <Icon style={{marginRight:3}}  type="frown" theme="twoTone" twoToneColor="#eb2f96"/>
                }
                {title}
            </div>
        )
    }

    render() {
        const {renderTitle, handleChange} = this
        return (
            <Card
                size='small'
                type='inner'
                title='Add or remove people from the group'
            >
                <Transfer
                    dataSource={this.state.mockData}
                    showSearch
                    titles={[renderTitle('Not Members'), renderTitle('Members')]}
                    listStyle={{
                        width: '46%',
                        height: 300,
                    }}
                    targetKeys={this.state.targetKeys}
                    onChange={handleChange}
                    render={item => `${item.name}`}
                />
            </Card>
        )
    }
}

ControlPeople.propTypes = {}

export default ControlPeople
