import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { COLORS, shadow, FONTS, BREAKPOINTS_MAX, BREAKPOINTS_MIN } from '../utils/styles'

import menuIcon from '../icons/menu.svg'
import exitIcon from '../icons/exit.svg'
import contactsIcon from '../icons/contacts.svg'
import invoiceIcon from '../icons/monetization_on.svg'
import dashboardIcon from '../icons/dashboard.svg'
import adminIcon from '../icons/admin.svg'
import settingsIcon from '../icons/settings.svg'

import { useHistory } from 'react-router-dom'
import { useUserInfo } from '../utils/hooks'

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${COLORS.clouds};
    overflow: auto;
`

const ContentContainer = styled.div`
    ${shadow}
    ${FONTS.montserrat}
    background-color: ${COLORS.white};
    width: calc(100% - 30px);
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
    margin-top: 80px;
	margin-left: auto;
	margin-right: auto;
	@media (min-width: ${BREAKPOINTS_MIN.MD}) and (max-width: ${BREAKPOINTS_MAX.LG}) {
		max-width: 720px;
		padding-top: 15px;
        padding-bottom: 15px;
	}
	@media (min-width: ${BREAKPOINTS_MIN.LG}) and (max-width: ${BREAKPOINTS_MAX.XL}) {
		max-width: 960px;
		padding-top: 15px;
        padding-bottom: 15px;
	}
	@media (min-width: ${BREAKPOINTS_MIN.XL}) and (max-width: ${BREAKPOINTS_MAX.HG}) {
		max-width: 1140px;
		padding-top: 30px;
        padding-bottom: 30px;
	}
	@media (min-width: ${BREAKPOINTS_MIN.HG}) {
		max-width: 1708px;
		padding-top: 30px;
        padding-bottom: 30px;
	}

`

const HeaderContainer = styled.div`
    ${shadow}
    position: absolute;
    top: 0;
    z-index: 200;
    width: calc(100% - 40px);
    height: 50px;
    background-color: ${COLORS.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;

    > .menu {
        width: 28px;
        height: 28px;
        padding: 10px;
        cursor: pointer;
    }

    > .title {
        margin-left: 30px;
        ${FONTS.montserrat}
        font-weight: bold;
        font-size: 22px;
        color: ${COLORS.belize}
    }
`

const SideNavContainer = styled.div<{visible: boolean}>`
    ${shadow}
    width: ${({ visible }) => visible ? '250px' : '0px'};
    position: fixed;
    padding-top: 70px;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: ${COLORS.white};
    z-index: 101;
    transition: 0.3s;

    @media (max-width: ${BREAKPOINTS_MAX.MD}) {
        width: ${({ visible }) => visible ? '100%' : '0px'};
    }
`

const DarkPageOverlay = styled.div<{visible: boolean}>`
    position: absolute;
    display: ${({visible}) => visible ? 'block' : 'none'};
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: ${({visible}) => visible ? COLORS.darkOverlay : COLORS.transparent};
    transition: 0.3s;
`

const MenuItemContainer = styled.div<{color ?: string}>`
    width: calc(100% - 20px);
    height: 50px;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    > .title {
        ${FONTS.montserrat}
        color: ${({color}) => color || COLORS.midnight};
        font-weight: bold;
        font-size: 16px;
        margin-left: 15px;
    }
`

interface MenuItemProps {
    title: string
    icon: string
    route?: string
    onClick?: () => void
    color?: string
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, onClick, route, color }) => {
    let routerHistory = useHistory()

    return (
        <MenuItemContainer color={color} onClick={() => {
            onClick && onClick()
            route && routerHistory.push(route)
        }}>
            <img className="icon" src={icon} alt="" />
            <div className="title">
                {title}
            </div>
        </MenuItemContainer>
    )
}

interface SideNavProps {
    onHide: () => void
    visible: boolean
}

const handleLogout = (redirectToLogin: () => void) => {
    localStorage.removeItem('token')
    redirectToLogin()
}

const SideNav: React.FC<SideNavProps> = ({ onHide, visible }) => {
    const navRef = useRef<HTMLDivElement>(null)

    let routerHistory = useHistory()

    const redirectToLogin = useCallback(() => {
        routerHistory.push('/')
    }, [routerHistory])

    const { role } = useUserInfo()

    useEffect(() => {
        const handleClick = (ev: MouseEvent) => {
            if (!navRef.current?.contains(ev.target as HTMLElement) && visible) {
                onHide()
            }
        }
        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [onHide, visible])

    return (
        <> 
            <DarkPageOverlay visible={visible} />
            <SideNavContainer visible={visible} ref={navRef}>
                <MenuItem title="Dashboard" icon={dashboardIcon} route="/dashboard" />
                { role === 'accountant' && <MenuItem title="Contacts" icon={contactsIcon} route="/contacts" /> }
                 { role === 'accountant' && <MenuItem title="Company Info" icon={settingsIcon} route="/company-info" /> }
                <MenuItem title="Invoices" icon={invoiceIcon} route="/invoices" />
                 { role === 'admin' && <MenuItem title="Admin" icon={adminIcon} route="/admin" /> }
                <MenuItem title="User Settings" icon={settingsIcon} route="/settings" />
                <MenuItem title="Logout" icon={exitIcon} color={COLORS.alizarin} onClick={() => handleLogout(redirectToLogin)} />
            </SideNavContainer>
        </>)
}

const Header: React.FC = () => {
    const [ menuVisible, setMenuVisible ] = useState(false)

    return (
        <>
        <SideNav onHide={() => setMenuVisible(false)} visible={menuVisible} />
        <HeaderContainer>
            <img className="menu" src={menuIcon} alt="" onClick={() => setMenuVisible(true)} />
            <div className="title">INVOICERR</div>
        </HeaderContainer>
        </>
    )
}

const Layout: React.FC = ({ children }) => {
    return (
        <Container>
            <Header />
            <ContentContainer>
                {children}
            </ContentContainer>
        </Container>
    )
}

export default Layout