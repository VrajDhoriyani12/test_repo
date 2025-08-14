"use client"
import LandingSwitcher from '@/shared/layouts-components/switcher/landing-switcher';
import React, { Fragment } from 'react'

const Layout = ({ children }: any) => {

  return (
    <Fragment>
      <LandingSwitcher />
      {children}
    </Fragment>
  )

}

export default Layout;