import * as React from 'react'
import { useIntl } from 'react-intl'
import { NavLink } from 'react-router-dom'

import { Nav } from '@/components/common/Nav'

import './index.scss'

type Props = {
    onNavigate?: () => void;
}


export function DeviceNav({ onNavigate }: Props): JSX.Element {
    const intl = useIntl()

    return (
        <Nav className="device-nav" modifiers={['divider']}>
            <Nav.Item key="swap">
                <NavLink to="/swap" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_SWAP',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="pools">
                <NavLink
                    to="/pools"
                    isActive={(_, location) => location.pathname.indexOf('/pool') === 0}
                    onClick={onNavigate}
                >
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_POOLS',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="tokens">
                <NavLink to="/tokens" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_TOKENS',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="pairs">
                <NavLink to="/pairs" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_PAIRS',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="farming_v1">
                <NavLink to="/farming" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_FARMING_OLD',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="farming_v2">
                <NavLink to="/gauges" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_FARMING_NEW',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="dao">
                <NavLink to="/dao" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_QUBE_DAO',
                    })}
                </NavLink>
            </Nav.Item>
            <Nav.Item key="builder">
                <NavLink to="/builder" onClick={onNavigate}>
                    {intl.formatMessage({
                        id: 'NAV_LINK_TEXT_BUILDER',
                    })}
                </NavLink>
            </Nav.Item>
        </Nav>
    )
}
