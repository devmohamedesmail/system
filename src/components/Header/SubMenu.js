import React,{useState,useEffect,useRef} from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {  useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function SubMenu() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };


    useEffect(() => {
        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleLinkClick = (path) => {
        setIsOpen(false); // Close the menu
        navigate(path); // Use navigate to go to the new path
    };

    return (
        <div className='relative'>
        <button 
            onClick={toggleMenu} 
            className="bg-primary flex justify-center items-center h-12 w-12 rounded-lg mx-3">
            <HiOutlineDotsHorizontal color="white" size={20} />
        </button>
        {isOpen && (
            <div 
                ref={menuRef} 
                className={`menu absolute top-12 left-0 bg-white shadow-lg rounded-lg w-48 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className='flex flex-col py-3 justify-start items-start'>
                    <button onClick={() => handleLinkClick('/dashboard/branches')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('branches')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/employees/setting')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('setting-staff')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/reports/employees')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('employeesreports')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/purchases/page')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('purchases')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/rent/page')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('rent')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/checks/page')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('checks')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/users/page')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('users')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/setting/page')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('setting')}</button>
                    <button onClick={() => handleLinkClick('/dashboard/invoice/setting')} className='p-1 hover:bg-primary hover:text-white px-2 py-2 w-full text-left'>{t('invoiceSetting')}</button>
                </div>
            </div>
        )}
    </div>
    )
}
