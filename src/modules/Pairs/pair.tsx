import * as React from 'react'
import BigNumber from 'bignumber.js'
import { observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { AccountExplorerLink } from '@/components/common/AccountExplorerLink'
import { Icon } from '@/components/common/Icon'
import { PairRates } from '@/components/common/PairRates'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { PairIcons } from '@/modules/Pairs/components/PairIcons'
import { PairTransactions } from '@/modules/Pairs/components/PairTransactions'
import { Stats } from '@/modules/Pairs/components/Stats'
import { usePairStore } from '@/modules/Pairs/providers/PairStoreProvider'
import { useTokensCache } from '@/stores/TokensCacheService'
import { getDefaultPerPrice } from '@/modules/Swap/utils'
import {
    amount, concatSymbols, isGoodBignumber,
} from '@/utils'
import { useFavoritePairs } from '@/stores/FavoritePairs'

import './pair.scss'


function PairInner(): JSX.Element {
    const intl = useIntl()
    const tokensCache = useTokensCache()
    const store = usePairStore()
    const favoritePairs = useFavoritePairs()

    const baseToken = React.useMemo(() => (
        store.pair?.meta.baseAddress ? tokensCache.get(store.pair.meta.baseAddress) : undefined
    ), [store.pair?.meta.baseAddress, tokensCache.tokens])

    const counterToken = React.useMemo(() => (
        store.pair?.meta.counterAddress ? tokensCache.get(store.pair.meta.counterAddress) : undefined
    ), [store.pair?.meta.counterAddress, tokensCache.tokens])

    const priceLeftToRight = React.useMemo(
        () => {
            const price = (baseToken !== undefined && counterToken !== undefined)
                ? getDefaultPerPrice(
                    new BigNumber(store.pair?.rightLocked || 0).shiftedBy(-counterToken?.decimals),
                    new BigNumber(store.pair?.leftLocked || 0).shiftedBy(-baseToken?.decimals),
                    counterToken?.decimals,
                ) : new BigNumber(0)

            return isGoodBignumber(price) ? price.toFixed() : '0'
        },
        [baseToken, counterToken, store.pair],
    )

    const priceRightToLeft = React.useMemo(
        () => {
            const price = (baseToken !== undefined && counterToken !== undefined)
                ? getDefaultPerPrice(
                    new BigNumber(store.pair?.leftLocked || 0).shiftedBy(-baseToken?.decimals),
                    new BigNumber(store.pair?.rightLocked || 0).shiftedBy(-counterToken?.decimals),
                    baseToken?.decimals,
                ) : new BigNumber(0)

            return isGoodBignumber(price) ? price.toFixed() : '0'
        },
        [baseToken, counterToken, store.pair],
    )

    const toggleFavoritePair = () => {
        if (!store.pair) {
            return
        }

        let name = ''
        const address = store.pair.meta.poolAddress

        if (baseToken && baseToken.symbol) {
            name = baseToken.symbol
        }

        if (counterToken && counterToken.symbol) {
            name = `${name}/${counterToken.symbol}`
        }

        favoritePairs.toggle(address, name)
    }

    return (
        <>
            <section className="section section--large">
                <Breadcrumb
                    items={[{
                        link: '/pairs',
                        title: intl.formatMessage({ id: 'PAIR_BREADCRUMB_ROOT' }),
                    }, {
                        title: concatSymbols(baseToken?.symbol, counterToken?.symbol),
                    }]}
                />

                <header className="pair-page__header">
                    <div>
                        <div className="pair-page__token">
                            <PairIcons
                                leftToken={baseToken}
                                rightToken={counterToken}
                            />
                            <div className="pair-page__token-name">
                                {baseToken?.symbol}
                                /
                                {counterToken?.symbol}
                            </div>
                        </div>
                        {(baseToken !== undefined && counterToken !== undefined) && (
                            <div className="pair-page__tokens-prices">
                                <PairRates
                                    tokenIcon={{
                                        address: baseToken.root,
                                        name: baseToken.symbol,
                                        uri: baseToken.icon,
                                    }}
                                    label={intl.formatMessage({
                                        id: 'PAIR_TOKEN_PRICE',
                                    }, {
                                        amount: amount(priceLeftToRight, counterToken.decimals) || 0,
                                        symbolLeft: baseToken.symbol,
                                        symbolRight: counterToken.symbol,
                                    })}
                                    link={`/tokens/${baseToken.root}`}
                                />

                                <PairRates
                                    tokenIcon={{
                                        address: counterToken.root,
                                        name: counterToken.symbol,
                                        uri: counterToken?.icon,
                                    }}
                                    label={intl.formatMessage({
                                        id: 'PAIR_TOKEN_PRICE',
                                    }, {
                                        amount: amount(priceRightToLeft, baseToken.decimals) || 0,
                                        symbolLeft: counterToken.symbol,
                                        symbolRight: baseToken.symbol,
                                    })}
                                    link={`/tokens/${counterToken.root}`}
                                />
                            </div>
                        )}
                    </div>
                    <div className="pair-page__header-actions">
                        {store.pair?.meta.poolAddress !== undefined && (
                            <div>
                                <button
                                    className={classNames('btn btn-md btn-square btn-icon', {
                                        active: favoritePairs.addresses.includes(store.pair.meta.poolAddress),
                                    })}
                                    onClick={toggleFavoritePair}
                                    type="button"
                                >
                                    <Icon icon="star" />
                                </button>

                                <AccountExplorerLink
                                    address={store.pair?.meta.poolAddress}
                                    className="btn btn-md btn-square btn-icon"
                                >
                                    <Icon icon="externalLink" />
                                </AccountExplorerLink>
                            </div>
                        )}
                        <Link
                            className="btn btn-md btn-secondary"
                            to={`/pool/create/${baseToken?.root || store.pair?.meta.baseAddress}/${counterToken?.root || store.pair?.meta.counterAddress}`}
                        >
                            {intl.formatMessage({
                                id: 'PAIR_ADD_LIQUIDITY_BTN_TEXT',
                            })}
                        </Link>
                        <Link
                            className="btn btn-md btn-primary"
                            to={`/swap/${baseToken?.root || store.pair?.meta.baseAddress}/${counterToken?.root || store.pair?.meta.counterAddress}`}
                        >
                            {intl.formatMessage({
                                id: 'PAIR_TRADE_BTN_TEXT',
                            })}
                        </Link>
                    </div>
                </header>

                <Stats />
            </section>

            <PairTransactions />
        </>
    )
}


export const Pair = observer(PairInner)
