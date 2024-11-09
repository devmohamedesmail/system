import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { Dialog } from 'primereact/dialog';
import { DataContext } from "../../context/DataProvider";
import CustomInput from "../../custom/CustomInput";
import CustomCalender from "../../custom/CustomCalender";
import CustomButton from "../../custom/CustomButton";
import JobCardsContent from "./JobCardsContent";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import { IoMdSearch } from "react-icons/io";
import CustomMultiSelect from "../../custom/CustomMultiSelect";
import CustomDropDownFilter from "../../custom/CustomDropDownFilter";
import moment from 'moment';
import CustomLoading from "../../custom/CustomLoading";

export default function JobCards() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation()
  const [invoicesTypes, fetchInvoiceTypes, methodTypes, fetchMethodTypes, invoices, fetchInvoices, departments, fetchDepartments, staff, fetchStaff] = useContext(DataContext)
  const [selectedInvoice, setselectedInvoice] = useState(null);
  const [selectedInvoiceID, setselectedInvoiceID] = useState(null);
  const [name, setName] = useState('')
  const [selectedWorker, setselectedWorker] = useState(null)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [worker, setWorker] = useState(null)
  const [jobcardsItems, setJobcards] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredJobcards, setFilteredJobcards] = useState([]);
  const [loading,setLoading] = useState(false)


  const handleWorkerChange = (e) => {
    const selected = e.value; // This will contain the selected worker objects
    setselectedWorker(selected);

    // Assuming each worker object has an 'id' property
    const selectedIds = selected.map(worker => worker.id);
    setWorker(selectedIds);
  };



  useEffect(() => {

    if (selectedInvoice) {
      setselectedInvoiceID(selectedInvoice.id)

    }
  }, [selectedInvoice])





  const fetchJobCards = async () => {
    try {
      const response = await axios.get(`${Setting.url}show/job/cards`);
      setJobcards(response.data.data);

    } catch (error) {
      console.error('Error fetching job cards:', error);
    }
  };

  useEffect(() => {
    fetchJobCards();
  }, []);

  const handleAddNewStage = async() =>{
    setLoading(true)
    try {
      const formattedStart = moment(start).format('MM/DD/YYYY h:mm:ss A');
      const formattedEnd = moment(end).format('MM/DD/YYYY h:mm:ss A');

      await axios.post(`${Setting.url}add/stage/${selectedInvoiceID}`, {
        "name":name,
        "start":formattedStart,
        "end":formattedEnd,
        "worker":worker

      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }



  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = jobcardsItems.filter(card => {
        const cardStart = new Date(card.start);
        const cardEnd = new Date(card.end);
        return cardStart >= new Date(startDate) && cardEnd <= new Date(endDate);
      });
      setFilteredJobcards(filtered);
    } else {
      setFilteredJobcards(jobcardsItems);
    }
  };


  return (
    <div className=''>

      <div className='bg-white py-1 px-2 flex justify-between items-center '>
        <div className="flex items-center">

          <div className="mx-1">
            <CustomCalender value={startDate} onchange={e => setStartDate(e.target.value)} placeholder={t('from')} />
          </div>
          <div className="mx-1">
            <CustomCalender value={endDate} onchange={e => setEndDate(e.target.value)} placeholder={t('to')} />
          </div>

          <button onClick={handleFilter} className="bg-primary w-12 h-12 mt-5 rounded-md flex justify-center items-center mx-1"><IoMdSearch color="white" size={25} /></button>
        </div>
        <div className='flex items-center'>
          <div className='flex flex-col justify-center items-center bg-red-300 w-fit p-2 rounded-md m-3'>
            <h3 className='text-center text-xs'>{t('jobcards')}</h3>
            <h3 className='text-center text-xs'>{jobcardsItems && jobcardsItems.length > 0 ? jobcardsItems.length : 0}</h3>
          </div>
          <button onClick={() => setVisible(true)} className='text-white  from-orange-500 to-orange-600 bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-3 text-center '>open job card</button>
        </div>
      </div>


      <Dialog header={t('add-job-card')} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>

        <CustomDropDownFilter value={selectedInvoice} onChange={(e) => {
          setselectedInvoice(e.value);
          setselectedInvoiceID(e.value.id);
        }} options={invoices} label='carNo' placeholder={t('select-car-no')} searchItem='carNo' />  
        <CustomInput value={name} onchange={(e) => setName(e.target.value)} placeholder={t('job-card-name')} />
        <CustomMultiSelect value={selectedWorker} onChange={handleWorkerChange} options={staff} label='name' placeholder={t('selectstaff')} />







        <div className="my-2">
          <CustomCalender value={start} onchange={(e) => setStart(e.target.value)} placeholder={t('startdate')} />
        </div>
        <div className="my-2">
          <CustomCalender value={end} onchange={(e) => setEnd(e.target.value)} placeholder={t('enddate')} />
        </div>
        <div>
          {loading ? <CustomLoading /> :  <CustomButton title={t('add')} onpress={() => handleAddNewStage()} /> }
         
        </div>
      </Dialog>




      <JobCardsContent jobcardsItems={filteredJobcards.length ? filteredJobcards : jobcardsItems} fetchJobCards={fetchJobCards} />

    </div>

















  )
}
