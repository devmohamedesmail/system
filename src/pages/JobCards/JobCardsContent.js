import React, { useEffect, useState, useRef } from 'react'
import { Setting } from '../../utilties/Setting'
import axios from 'axios'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import { MdDone } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import CustomLoading from '../../custom/CustomLoading';






export default function JobCardsContent({ fetchJobCards, jobcardsItems }) {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const { t } = useTranslation();



    const toggleMenu = (index) => {
        setOpenMenuIndex(prevIndex => (prevIndex === index ? null : index));
    };


    const calculateRemainingTime = (end) => {
        const endTime = new Date(end);
        const currentTime = new Date();
        const remainingTime = endTime - currentTime;

        if (remainingTime > 0) {
            const hours = Math.floor((remainingTime % 86400000) / 3600000);
            const minutes = Math.floor((remainingTime % 3600000) / 60000);
            return `${hours}h ${minutes}m ${t('remaining')}`;
        } else {
            return 'Expired';
        }
    };


    // handle change Stage status
    const handleChangeStageStatus = async (id) => {

        try {
            axios.post(`${Setting.url}change/status/${id}`)
            fetchJobCards()
        } catch (error) {
            console.log(error)
        }
    }

    // handleDeleteStage
    const handleDeleteStage = async (id) => {
        try {

            const confirm = window.confirm(`${t('alertdelete')}`)
            if (confirm) {
                axios.get(`${Setting.url}delete/stage/${id}`)
                fetchJobCards()
            }
        } catch (error) {
            console.log(error)
        }
    }





    return (
        // <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
        //     {jobcardsItems && jobcardsItems.length > 0 ? (
        //         <>{jobcardsItems.map((card, index) => (
        //             <div className='bg-white rounded-lg shadow-lg p-4'>
        //                 <div className='flex justify-between items-start'>
        //                     <div className='flex items-center'>
        //                         <img src='/images/icons/truck.png' width='90px' />
        //                         <h5>{card.carType}</h5>
        //                     </div>
        //                     <div className='relative'>
        //                         <button onClick={() => toggleMenu(index)} className='border-2 border-primary text-primary px-3 py-2 rounded-lg'>
        //                             <HiOutlineDotsVertical />
        //                         </button>
        //                         {openMenuIndex === index && (
        //                             <div className={`absolute top-10 right-0 bg-white shadow-lg p-2 rounded-lg w-44 transition-all ease-in-out`}>
        //                                 <div className='flex flex-col items-center justify-between'>
        //                                     <button onClick={() => handleChangeStageStatus(card.id)} className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
        //                                         <MdDone size={20} color='green' /> <span className='mx-2'>{t('completed')}</span> </button>
        //                                     <button onClick={() => handleDeleteStage(card.id)} className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
        //                                         <FaTrashCan size={20} color='red' />
        //                                         <span className='mx-2'> {t('delete')}</span>
        //                                     </button>
        //                                     <button className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
        //                                         <MdEdit size={20} color='green' />
        //                                         <span className='mx-2'>{t('update')}</span>
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         )}
        //                     </div>


        //                 </div>

        //                 <div className='flex items-center justify-between'>
        //                     <div className='bg-secondary border-2 border-primary text-center font-semibold px-3 text-primary py-2 w-44 rounded-md mt-4'>
        //                         {card.carNo}
        //                     </div>
        //                     <div>
        //                         <p>{card.start}</p>
        //                         <p>{card.end}</p>
        //                         <div className='mt-2'>
        //                             <p className='text-sm text-gray-600 text-center'>{calculateRemainingTime(card.end)}</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className='flex items-center justify-start flex-wrap mt-4'>
        //                     {card && card.worker ? (<>{card.worker.map((worker) => (
        //                         <p className='bg-secondary border border-primary text-center text-xs px-3 text-primary py-1 w-fit rounded-md mx-1'>{worker}</p>
        //                     ))}</>) : (<></>)}

        //                 </div>

        //             </div>
        //         ))}</>
        //     ) : (<>
        //         <CustomLoading />
        //     </>)}

        // </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
      {jobcardsItems.length > 0 ? (
        jobcardsItems.map((card, index) => (
          <div className='bg-white rounded-lg shadow-lg p-4' key={card.id}>
            <div className='flex justify-between items-start'>
              <div className='flex items-center'>
                <img src='/images/icons/truck.png' width='90px' alt="Truck" />
                <h5>{card.carType}</h5>
              </div>
              <div className='relative'>
                <button onClick={() => toggleMenu(index)} className='border-2 border-primary text-primary px-3 py-2 rounded-lg'>
                  <HiOutlineDotsVertical />
                </button>
                {openMenuIndex === index && (
                  <div className={`absolute top-10 right-0 bg-white shadow-lg p-2 rounded-lg w-44 transition-all ease-in-out`}>
                    <div className='flex flex-col items-center justify-between'>
                      <button onClick={() => handleChangeStageStatus(card.id)} className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
                        <MdDone size={20} color='green' /> <span className='mx-2'>{t('completed')}</span>
                      </button>
                      <button onClick={() => handleDeleteStage(card.id)} className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
                        <FaTrashCan size={20} color='red' />
                        <span className='mx-2'>{t('delete')}</span>
                      </button>
                      <button className='hover:bg-primary w-full p-1 hover:text-white transition-all ease-in-out flex items-center'>
                        <MdEdit size={20} color='green' />
                        <span className='mx-2'>{t('update')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='bg-secondary border-2 border-primary text-center font-semibold px-3 text-primary py-2 w-44 rounded-md mt-4'>
                {card.carNo}
              </div>
              <div>
                <p>{card.start}</p>
                <p>{card.end}</p>
                <div className='mt-2'>
                  <p className='text-sm text-gray-600 text-center'>{calculateRemainingTime(card.end)}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-start flex-wrap mt-4'>
              {card.worker && card.worker.map((worker, i) => (
                <p className='bg-secondary border border-primary text-center text-xs px-3 text-primary py-1 w-fit rounded-md mx-1' key={i}>{worker}</p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <CustomLoading />
      )}
    </div>
    )
}
