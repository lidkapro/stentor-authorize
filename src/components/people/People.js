import React, {Component} from 'react'
import ListPeoples from './ListPeoples'
import HeadPeople from './HeadPeople'
import MenuPeople from './MenuPeople'
import {Form} from 'antd/lib/index'


class People extends Component {

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                alert('request sended')
                this.props.handleOk()
            }
        })
    }

    render() {
        const {form} = this.props
        return (
            <main className='container'>
                <HeadPeople
                    form={form}
                    handleSubmit={this.handleSubmit}
                />
                <section className='all_people_table'>
                    <MenuPeople/>
                    <ListPeoples/>
                </section>
            </main>
        )
    }
}

People.propTypes = {}

export default Form.create({name: 'add_person'})(People)
