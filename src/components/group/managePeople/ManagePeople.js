import React, {Component} from 'react'
import {Card} from 'antd'
import {inject, observer} from 'mobx-react/index'
import _ from 'lodash'
import Buttons from './Buttons'
import ListPeoples from './ListPeoples'

@inject('people')
@observer
class ManagePeople extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rightCheckedValues: [],
            leftCheckedValues: []
        }
        this.loadMoreData = _.debounce(this.loadMoreData, 200)
    }

    componentDidMount() {
        const {people, match} = this.props
        people.findAllUserInGroupBegin(match.params.groupName, 0)
        people.findAllUserBegin(0)
    }

    loadMoreData = () => {
        const {match, people} = this.props
        const {total} = people
        const keys = people.group.length
        const data = people.all.length

        if (keys < total.group) {
            const page = keys / 10
            people.findAllUserInGroupBegin(match.params.groupName, page)
        }
        if (data < total.all) {
            const page = data / 10
            people.findAllUserBegin(page)
        }
    }

    handleChange = direction => {
        const {people, match} = this.props
        const {rightCheckedValues, leftCheckedValues} = this.state
        if (direction === 'left') {
            rightCheckedValues.forEach(key => people.removeUserFromGroup(match.params.groupName, key))
            this.setState({rightCheckedValues: []})
        }
        else {
            leftCheckedValues.forEach(key => people.addUserToGroup(match.params.groupName, key))
            this.setState({leftCheckedValues: []})
        }
    }

    onChange = (e, values) => {
        const value = e.target.value
        const checked = e.target.checked
        const arr = values === 'rightCheckedValues' ? this.state.rightCheckedValues : this.state.leftCheckedValues
        checked ?
            this.setState({[values]: [...arr, value]})
            :
            this.setState({[values]: arr.filter(a => a !== value)})
    }

    componentWillUnmount() {
        const {people} = this.props
        people.cleanState()
    }


    render() {
        const {rightCheckedValues, leftCheckedValues} = this.state
        const {all, group} = this.props.people
        return (
            <Card
                size='small'
                type='inner'
                title='Add or remove people from the group'
            >
                <section className='manage_people_lists'>
                    <ListPeoples
                        list={all}
                        title='Not Members'
                        values='leftCheckedValues'
                        onChange={this.onChange}
                        onScroll={this.loadMoreData}
                    />
                    <Buttons
                        handleChange={this.handleChange}
                        toLeft={!rightCheckedValues.length}
                        toRight={!leftCheckedValues.length}
                    />
                    <ListPeoples
                        list={group}
                        title='Members'
                        values='rightCheckedValues'
                        onChange={this.onChange}
                        onScroll={this.loadMoreData}
                    />
                </section>
            </Card>
        )
    }
}

ManagePeople.propTypes = {}

export default ManagePeople
