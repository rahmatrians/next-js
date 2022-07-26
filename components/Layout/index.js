// import { ReactNode } from 'react;'
import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../Sidebar';

// interface LayoutProps {
//     children: ReactNode;
// }

// export default function Layout(props: LayoutProps) {
export default function Layout({ children }) {
    // const { children } = props;
    return (
        <>
            {/* <Header /> */}
            <SideBar>{children}</SideBar>
            <Footer />
        </>
    )
}
