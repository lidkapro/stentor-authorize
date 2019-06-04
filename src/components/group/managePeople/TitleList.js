import React from 'react'
import {Icon} from 'antd'

const TitleList = ({title}) =>
    <header>
        {title === 'Members' ?
            <Icon style={{marginRight: 3}} type="smile" theme="twoTone"/> :
            <Icon style={{marginRight: 3}} type="frown" theme="twoTone" twoToneColor="#eb2f96"/>}
        {title}
    </header>


TitleList.propTypes = {}

export default TitleList
