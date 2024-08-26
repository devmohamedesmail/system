import React,{useState} from 'react'
import { Dialog } from 'primereact/dialog';
import CustomButton from './CustomButton';
import { useTranslation } from 'react-i18next';
import { FaCheck } from "react-icons/fa";


export default function CustomModal({content,visible,setVisible,position,setPosition}) {
    const {t}=useTranslation();
 
    const footerContent = (
        <div>
            <CustomButton title={t('close')} onpress={() => setVisible(false)} />
        </div>
    );


    return (
        <Dialog header="" visible={visible} position={position} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent} draggable={false} resizable={false}>
            <div className="m-0 flex flex-col justify-center items-center">
               <FaCheck size={30} color='green' />
               <p className='font-bold my-4'>{content}</p>
            </div>
        </Dialog>
    )
}
