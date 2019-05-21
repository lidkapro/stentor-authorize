import React, {Component} from 'react'
import {Card, Transfer, Icon} from 'antd'

class ManagePeople extends Component {
    state = {
        mockData: [
            {
                key: 'Moska'
            },
            {
                key: 'Stepan Litvinov'
            },
            {
                key: 'Ivan Ivanov'
            }],
        targetKeys: ['Moska']
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
                    render={item => `${item.key}`}
                />
            </Card>
        )
    }
}

ManagePeople.propTypes = {}

export default ManagePeople
