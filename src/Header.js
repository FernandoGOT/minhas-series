import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap'

const Header = () => {
  const [open, setOpen] = React.useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <Navbar color='light' light expand='md'>
      <div className='container'>
        <NavbarBrand tag={Link} to='/'>
          Minhas séries
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/series'>
                Séries
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/generos'>
                Gêneros
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  )
}

export default Header

