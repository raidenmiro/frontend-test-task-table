import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { Fragment, FunctionComponent } from 'react'
import { Status } from '~/shared/api/types'

const list: Array<{ id: number; name: Status }> = [
  { id: 1, name: 'active' },
  { id: 2, name: 'inactive' },
]

type Item = typeof list[number]

export interface ListboxProps {
  selected: Item
  onChange(status: Item): void
  className?: string
}

export const ListboxStatus: FunctionComponent<ListboxProps> = ({
  selected,
  onChange,
  className,
}) => {
  return (
    <div className={clsx(className)}>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <label className="text-sm font-medium text-black">status</label>
          <Listbox.Button
            className={clsx(
              'bg-gray-50 border border-gray-300',
              'focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700 sm:text-sm',
              'relative w-full cursor-default rounded-lg p-2.5 pr-10 text-left',
              'focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
            )}
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white',
                'py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              )}
            >
              {list.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      {
                        'hover:bg-gray-100 text-black': active,
                        'text-gray-900': !active,
                      }
                    )
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx('block truncate', {
                          'font-medium': selected,
                          'font-normal': !selected,
                        })}
                      >
                        {item.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
