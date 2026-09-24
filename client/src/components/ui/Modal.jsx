import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Highly reusable, accessible Modal component using @headlessui/react.
 * Features a frosted-glass backdrop, centered layout, and fade/scale animations.
 * 
 * @param {boolean} isOpen - Controls visibility of the modal
 * @param {function} onClose - Callback fired when closing the modal
 * @param {string} [title] - Optional title for the modal header
 * @param {ReactNode} children - The content of the modal
 * @param {string} [className] - Optional additional classes for the modal panel
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop with frosted-glass effect */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            aria-hidden="true" 
          />
        </TransitionChild>

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* Centering container */}
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  "w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0F0F11] border border-slate-800 p-6 text-left align-middle shadow-2xl shadow-black transition-all",
                  className
                )}
              >
                {/* Header: Title and Close Button */}
                <div className="flex items-center justify-between mb-5">
                  {title ? (
                    <Dialog.Title 
                      as="h3" 
                      className="text-lg font-semibold leading-6 text-white"
                    >
                      {title}
                    </Dialog.Title>
                  ) : (
                    <div /> /* Spacer if no title */
                  )}
                  
                  <button
                    type="button"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F11]"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>

                {/* Main Content Area */}
                <div className="text-slate-300">
                  {children}
                </div>
              </Dialog.Panel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
