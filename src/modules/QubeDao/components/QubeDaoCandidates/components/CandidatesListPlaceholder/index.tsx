import * as React from 'react'

import { Placeholder } from '@/components/common/Placeholder'
import { makeArray, uniqueId } from '@/utils'

export function CandidatesListPlaceholder(): JSX.Element {
    const placeholder = React.useRef(makeArray(10, uniqueId))
    return (
        <>
            <div className="list__header">
                <div className="list__cell list__cell--left">
                    <Placeholder height={20} width={100} />
                </div>
                <div className="list__cell list__cell--left">
                    <Placeholder height={20} width={50} />
                </div>
                <div className="list__cell list__cell--right">
                    <Placeholder height={20} width={30} />
                </div>
                <div className="list__cell list__cell--right">
                    <Placeholder height={20} width={100} />
                </div>
                <div className="list__cell list__cell--right">
                    <Placeholder height={20} width={80} />
                </div>
                <div className="list__cell list__cell--right">
                    <Placeholder height={20} width={100} />
                </div>
            </div>
            {placeholder.current.map(key => (
                <div key={key} className="list__row">
                    <div className="list__cell list__cell--left">
                        <Placeholder height={20} width={130} />
                    </div>
                    <div className="list__cell list__cell--left">
                        <Placeholder height={24} width={50} />
                    </div>
                    <div className="list__cell list__cell--right">
                        <Placeholder height={20} width={80} />
                    </div>
                    <div className="list__cell list__cell--right">
                        <Placeholder height={20} width={100} />
                        <div>
                            <Placeholder height={18} width={40} />
                        </div>
                    </div>
                    <div className="list__cell list__cell--right">
                        <Placeholder height={20} width={100} />
                        <div>
                            <Placeholder height={18} width={40} />
                        </div>
                    </div>
                    <div className="list__cell list__cell--right">
                        <Placeholder height={20} width={50} />
                    </div>
                </div>
            ))}
        </>
    )
}