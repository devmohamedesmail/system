import React, { useState } from 'react'
import { MdDone } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import { FaCommentAlt } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";



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
    index, status ,isActive}) {
    const { t } = useTranslation();
    return (
        <div className='bg-white rounded-lg shadow-sm py-2 px-2 border border-orange-100' key={id}>
            <div className='flex justify-between items-start'>
                <div className='flex items-center justify-start'>
                    <img src='/images/icons/truck.png' width='60px' alt="Truck" />

                    <div className='flex flex-col '>
                         <div className='flex items-center '>
                         {status === '1' ? (<p className='bg-orange-100 p-2 rounded-lg text-black text-xs text-center mx-2'>{t('done')}</p>) : (<p className='bg-red-100 p-2 rounded-lg text-black text-xs text-center mx-2'>{t('inprogress')}</p>)}
                         {isActive === 1 ? (<p className='bg-green-100 p-2 rounded-lg text-black text-xs text-center mx-2'>{t('active')}</p>) : (<p className='bg-red-300 p-2 rounded-lg text-black text-xs text-center mx-2'>{t('stop')}</p>)}

                        </div>
                        <h5 className='mt-1 font-bold text-sm italic' >{carType}</h5>
                    </div>
                </div>

               
                <div className='flex justify-between items-center'>
                    <div className='comments relative mx-4'>
                       <FaCommentAlt color='#4c0054' size={20} />
                       <span className='absolute -top-3 -right-2 text-xs text-gray-500'>
                          <FaCommentDots color='#fe5d39' size={20} />
                       </span>
                    </div>
                
                <div className='relative'>
                    <button
                        onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                        className='border border-gray-600 text-primary p-2 rounded-lg'
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
            </div>
            <div className='flex items-center justify-between'>

                <div className='bg-gray border-2 border-primary text-center font-semibold px-3 text-primary py-2 w-44 rounded-md mt-4'>
                    {carNo}
                </div>

                <div>
                    <p className='italic text-sm'>{start}</p>
                    <p className='italic text-sm'>{end}</p>
                    <div className='mt-2 flex justify-center'>
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
