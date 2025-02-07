import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

interface GuidePopoverProps {
  title: string
  steps: {
    title: string
    description: string
  }[]
}

const GuidePopover = ({ title, steps }: GuidePopoverProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="p-1 text-gray-400 hover:text-primary rounded-full transition-colors">
        <QuestionMarkCircleIcon className="w-5 h-5" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 w-80 px-4 mt-3 right-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {title}
              </h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default GuidePopover 