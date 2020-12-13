import React, { Component } from 'react'
import styled from 'styled-components'

import Navigation from './Navigation'

const Container = styled.div.attrs({
    className: 'container',
})``

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Navigation />
                </Nav>
            </Container>
        )
    }
}

export default NavBar
