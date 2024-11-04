import React, { useEffect, useState, useRef } from 'react'
import { Setting } from '../../utilties/Setting'
import axios from 'axios'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import { MdDone } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import CustomLoading from '../../custom/CustomLoading';
import JobCardItem from './JobCardItem';






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

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-5'>
            {jobcardsItems.length > 0 ? (
                jobcardsItems.map((card, index) => (
                    
                    <JobCardItem
                        key={card.id}
                        carType={card.carType}
                        id={card.id}
                        carNo={card.carNo}
                        status={card.status}
                        start={card.start}
                        end={card.end}
                        RemainingTime={calculateRemainingTime(card.end)}
                        worker={card.worker}
                        toggleCardMenu={() => toggleMenu(index)}
                        changeStageStatus={() => handleChangeStageStatus(card.id)}
                        deleteStage={() => handleDeleteStage(card.id)}
                        openMenuIndex={openMenuIndex}
                        setOpenMenuIndex={setOpenMenuIndex}
                        index={index}
                    />
                ))
            ) : (
                <CustomLoading />
            )}
        </div>
    )
}
