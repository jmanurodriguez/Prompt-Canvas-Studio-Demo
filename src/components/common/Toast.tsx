import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  show: boolean
  type: 'success' | 'error'
  message: string
  onClose: () => void
}

const Toast = ({ show, type, message, onClose }: ToastProps) => {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`rounded-lg shadow-lg p-4 ${
          type === 'success' ? 'bg-success text-white' : 'bg-error text-white'
        }`}>
          <div className="flex items-center space-x-3">
            {type === 'success' ? (
              <CheckCircleIcon className="h-6 w-6" />
            ) : (
              <XCircleIcon className="h-6 w-6" />
            )}
            <p className="font-medium">{message}</p>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Toast 