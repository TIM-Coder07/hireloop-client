import DashBoardSideBar from '@/Component/dashboard/DashBoardSideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashBoardSideBar></DashBoardSideBar>
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashboardLayout;