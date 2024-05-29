"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useUser } from "@auth0/nextjs-auth0/client";

import { cn, isPathMatch } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Loader from "./Loader";
import { useProfileStore } from "@/app/store/profile";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Subscriptions",
    href: "/subscriptions",
    icon: ArrowPathRoundedSquareIcon,
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "/api/auth/logout" },
];

export default function Nav({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPath = usePathname();
  const { user, isLoading } = useUser();

  return (
    <>
      <div>
        <Transition show={sidebarOpen}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 bg-background">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-accent"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                        src="/images/logo.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={cn(
                                    isPathMatch(item.href, currentPath)
                                      ? "bg-primary text-accent"
                                      : "text-forebackground hover:text-accent hover:bg-primary",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  <item.icon
                                    className={cn(
                                      isPathMatch(item.href, currentPath)
                                        ? "text-accent"
                                        : "group-hover:text-accent",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col lg:shadow">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                width={32}
                height={32}
                className="h-8 w-auto"
                src="/images/logo.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            isPathMatch(item.href, currentPath)
                              ? "bg-primary text-accent"
                              : "text-forebackground hover:text-accent hover:bg-primary",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={cn(
                              isPathMatch(item.href, currentPath)
                                ? "text-accent"
                                : "text-primary group-hover:text-accent",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="bg-white sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative lg:min-w-[120px]">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      <MenuButton className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full bg-gray-50"
                          src={
                            user?.picture ??
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          alt="Profile Picture"
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span
                            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                            aria-hidden="true"
                          >
                            {user && user.name}
                          </span>
                          <ChevronDownIcon
                            className="ml-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </MenuButton>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-background py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          {userNavigation.map((item) =>
                            item.name === "Sign out" ? (
                              <MenuItem key={item.name}>
                                {({ focus }) => (
                                  <a
                                    href={item.href}
                                    className={cn(
                                      focus ? "bg-gray-50" : "",
                                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </MenuItem>
                            ) : (
                              <MenuItem key={item.name}>
                                {({ focus }) => (
                                  <Link
                                    href={item.href}
                                    className={cn(
                                      focus ? "bg-gray-50" : "",
                                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </MenuItem>
                            )
                          )}
                        </MenuItems>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
