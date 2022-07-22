import { Store } from 'effector'
import { useUnit } from 'effector-react'
import { Attributes, createElement, FC } from 'react'

/**
 *  const Content = splitView({
 *    source: $pending.map((loading) =>{
 *      if (loading) return 'notReady'
 *
 *      return ready
 *    }),
 *    props: { users: ['Alice', 'John] },
 *    cases: {
 *      notReady: (_)=> <Loading />,
 *      ready: ({users})=> <SomeComponent users={users} />
 *   }
 * })
 **/

/* https://github.com/effector/reflect */

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U]

export const splitView = <T extends string, Props extends Attributes>({
  source,
  cases,
  props,
}: {
  source: Store<T>
  cases: AtLeastOne<Record<T, FC<Props>>>
  props?: Props
}) => {
  const View = () => {
    const caseVariant = useUnit(source)
    const Component = cases[caseVariant]

    return createElement(Component, props)
  }

  return View
}
