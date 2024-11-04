import React, { useState } from 'react'
import { MdDone } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useTranslation } from 'react-i18next';

export default function JobCardItem({
    carType,
    id,
    carNo,
    start,
    end,
    RemainingTime,
    worker,
    toggleCardMenu,
    changeStageStatus,
    deleteStage,
    openMenuIndex,
    setOpenMenuIndex,
    index,status }) {
    const { t } = useTranslation();
    return (
        <div className='bg-white rounded-lg shadow-lg p-4' key={id}>
            <div className='flex justify-between items-start'>
                <div className='flex items-center justify-start'>
                    <img src='/images/icons/truck.png' width='70px' alt="Truck" />
                   
                    <div className='flex flex-col '>
                    {status === '1'? (<p className='bg-orange-100 p-2 rounded-lg text-black text-xs text-center'>{t('done')}</p>):(<p className='bg-red-100 p-2 rounded-lg text-black text-xs text-center'>{t('inprogress')}</p>)}
                    <h5 className='mt-1'>{carType}</h5>
                    </div>
                </div>
                <div className='relative'>
                    <button
                        onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                        className='border-2 border-primary text-primary px-3 py-2 rounded-lg'
                    >
                        <HiOutlineDotsVertical />
                    </button>
                    {openMenuIndex === index && (
                        <div className='absolute top-10 right-0 bg-white shadow-lg p-2 rounded-lg w-44 transition-all ease-in-out'>
                            <div className='flex flex-col items-center'>
                                <button onClick={changeStageStatus} className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
                                    <MdDone size={20} color='green' /> <span className='mx-2'>{t('completed')}</span>
                                </button>
                                <button onClick={deleteStage} className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
                                    <FaTrashCan size={20} color='red' />
                                    <span className='mx-2'>{t('delete')}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='bg-slate-200 border-2 border-primary text-center font-semibold px-3 text-primary py-2 w-44 rounded-md mt-4'>
                    {carNo}
                </div>
                <div>
                    <p>{start}</p>
                    <p>{end}</p>
                    <div className='mt-2'>
                        <p className='text-sm text-gray-600 text-center'>{RemainingTime}</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-start flex-wrap mt-4'>
                {worker && worker.map((w, i) => (
                    <p className='bg-secondary border border-primary text-center text-xs px-3 text-primary py-1 w-fit rounded-md mx-1' key={i}>{w}</p>
                ))}
            </div>
        </div>
    )
}
