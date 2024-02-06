import React from 'react'
import 
{BsGrid1X2Fill,BsFillGearFill}
 from 'react-icons/bs'
 import { FaMoneyBillTransfer } from "react-icons/fa6";
 import { TbReportSearch } from "react-icons/tb";
 import { GoGoal } from "react-icons/go";
 import { PiPiggyBankLight } from "react-icons/pi";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
    
            <span>FinWise</span>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}><FontAwesomeIcon icon={faWindowClose} /></span>
            
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/transactions">
                    <FaMoneyBillTransfer className='icon'/>Transactions
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/budget">
                    <GoGoal className='icon'/> Budget
                </a>
            </li>
            
           
            <li className='sidebar-list-item'>
                <a href="/reports">
                    <TbReportSearch className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/settings">
                    <BsFillGearFill className='icon'/> Settings
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar