"use client";
import Footer from '@/shared/layouts-components/footer/footer';
import Header from '@/shared/layouts-components/header/header';
import Sidebar from '@/shared/layouts-components/sidebar/sidebar';
import Switcher from '@/shared/layouts-components/switcher/switcher';
import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { ThemeChanger } from "@/shared/redux/action";
import Backtotop from '@/shared/layouts-components/backtotop/backtotop';
import Loader from '@/shared/layouts-components/loader/loader';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: any) => {
    const pathname = usePathname();

    // Define routes where you want to hide the sidebar/layout
    const noLayoutRoutes = [
        '/broadcasting/whatsapp-broadcast/add-whatsapp-broadcast/'
    ];

    const isNoLayout = noLayoutRoutes.includes(pathname);

    if (isNoLayout) {
        // Render full page content without header/sidebar/footer
        return (
            <div className="full-width-page">
                {children}
            </div>
        );
    }

    return (
        <Fragment>
            <Switcher />
            <Loader />
            <div className='page'>
                <Header />
                <Sidebar />
                <div className='main-content app-content'>
                    <div className='container-fluid'>
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
            <Backtotop />
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Layout);
