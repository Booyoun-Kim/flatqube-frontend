import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useIntl } from 'react-intl'

import { usePoolStore } from '@/modules/Pool/stores/PoolStore'
import { formattedAmount } from '@/utils'


function Data(): JSX.Element {
    const intl = useIntl()
    const pool = usePoolStore()

    return (
        <div className="form-rows">
            <div className="form-row">
                <div>
                    {intl.formatMessage({
                        id: 'POOL_DATA_SUBTITLE_CURRENT_STATE',
                    })}
                </div>
            </div>
            <div className="form-row">
                <div>
                    {pool.leftToken?.symbol}
                </div>
                <div>
                    {formattedAmount(
                        pool.pairBalances?.left,
                        pool.leftToken?.decimals,
                        { target: 'token' },
                    )}
                </div>
            </div>
            <div className="form-row">
                <div>
                    {pool.rightToken?.symbol}
                </div>
                <div>
                    {formattedAmount(
                        pool.pairBalances?.right,
                        pool.rightToken?.decimals,
                        { target: 'token' },
                    )}
                </div>
            </div>
            <div className="form-row">
                <div>
                    {intl.formatMessage({
                        id: 'POOL_DATA_LABEL_LP_SUPPLY',
                    })}
                </div>
                <div>
                    {formattedAmount(
                        pool.pairBalances?.lp || '0',
                        pool.lpDecimals,
                    ) || '0'}
                </div>
            </div>
            <div className="form-row">
                <div>
                    {intl.formatMessage({
                        id: 'POOL_DATA_LABEL_LEFT_PRICE',
                    }, {
                        leftSymbol: pool.leftToken?.symbol,
                        rightSymbol: pool.rightToken?.symbol,
                    })}
                </div>
                <div>
                    {formattedAmount(pool.leftPrice, undefined, {
                        preserve: true,
                        roundIfThousand: false,
                    })}
                </div>
            </div>
            <div className="form-row">
                <div>
                    {intl.formatMessage({
                        id: 'POOL_DATA_LABEL_RIGHT_PRICE',
                    }, {
                        leftSymbol: pool.leftToken?.symbol,
                        rightSymbol: pool.rightToken?.symbol,
                    })}
                </div>
                <div>
                    {formattedAmount(pool.rightPrice, undefined, {
                        preserve: true,
                        roundIfThousand: false,
                    })}
                </div>
            </div>
            <div className="form-row">
                <div>
                    {intl.formatMessage({
                        id: 'POOL_DATA_LABEL_FEE',
                    })}
                </div>
                <div>0.3%</div>
            </div>
        </div>
    )
}


export const PoolData = observer(Data)
