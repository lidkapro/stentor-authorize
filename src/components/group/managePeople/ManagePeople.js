import React, {Component} from 'react'
import {Card, Transfer, Icon} from 'antd'
import {inject, observer} from 'mobx-react/index'

@inject('people')
@observer
class ManagePeople extends Component {

    componentDidMount() {
        const {people, match} = this.props
        people.findUsersInGroup(match.params.groupName,0)
        people.findAllUser(0)
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        const {people, match} = this.props
        if (direction === 'left') {
            moveKeys.forEach(key => people.removeUserFromGroup(match.params.groupName, key))
        }
        else {
            moveKeys.forEach(key => people.addUserToGroup(match.params.groupName, key))
        }
    }

    renderTitle = title => {
        return (
            <header>
                {
                    title === 'Members' ?
                        <Icon style={{marginRight: 3}} type="smile" theme="twoTone"/> :
                        <Icon style={{marginRight: 3}} type="frown" theme="twoTone" twoToneColor="#eb2f96"/>
                }
                {title}
            </header>
        )
    }
    componentWillUnmount(){
        const {people} = this.props
        people.cleanLists()
    }

    render() {
        const {dataManagePeople, keysManagePeople} = this.props.people
        const {renderTitle, handleChange} = this
        return (
            <Card
                size='small'
                type='inner'
                title='Add or remove people from the group'
            >
                <Transfer
                    dataSource={dataManagePeople}
                    showSearch
                    titles={[renderTitle('Not Members'), renderTitle('Members')]}
                    listStyle={{
                        width: '46%',
                        height: 300,
                    }}
                    targetKeys={keysManagePeople}
                    onChange={handleChange}
                    render={item => `${item.key}`}
                />
            </Card>
        )
    }
}

ManagePeople.propTypes = {}

export default ManagePeople
