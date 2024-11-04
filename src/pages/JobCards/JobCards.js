import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { DataContext } from "../../context/DataProvider";
import CustomInput from "../../custom/CustomInput";
import CustomCalender from "../../custom/CustomCalender";
import CustomButton from "../../custom/CustomButton";
import JobCardsContent from "./JobCardsContent";
import { MultiSelect } from 'primereact/multiselect';
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import { IoMdSearch } from "react-icons/io";

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


  const handleWorkerChange = (e) => {
    const selected = e.value; // This will contain the selected worker objects
    setselectedWorker(selected);

    // Assuming each worker object has an 'id' property
    const selectedIds = selected.map(worker => worker.id);
    setWorker(selectedIds);
  };



  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.carNo}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.carNo}</div>
      </div>
    );
  };

  // slected staff template
  const selectedStaffTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const staffOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
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
          <input type="datetime-local" className="border-2 border-primary p-2 mx-1" placeholder={t('startdate')} value={startDate}
            onChange={e => setStartDate(e.target.value)} />
          <input type="datetime-local" className="border-2 border-primary p-2 mx-1" placeholder={t('startdate')} value={endDate}
            onChange={e => setEndDate(e.target.value)} />
          <button onClick={handleFilter} className="bg-primary w-12 h-12 rounded-md flex justify-center items-center mx-1"><IoMdSearch color="white" size={25} /></button>
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
        <div className="m-1">
          <Dropdown value={selectedInvoice} onChange={(e) => setselectedInvoice(e.value)} options={invoices} optionLabel="carNo" placeholder={t('select-car-no')}
            filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>
        <div>
          <CustomInput value={name} onchange={(e) => setName(e.target.value)} placeholder={t('job-card-name')} />
        </div>





        <div className="">
          <MultiSelect value={selectedWorker} onChange={handleWorkerChange} options={staff} optionLabel="name"
            placeholder={t('selectstaff')} maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>







        <div className="my-2">
          <CustomCalender value={start} onchange={(e) => setStart(e.target.value)} placeholder={t('startdate')} />
        </div>
        <div className="my-2">
          <CustomCalender value={end} onchange={(e) => setEnd(e.target.value)} placeholder={t('enddate')} />
        </div>
        <div>
          <CustomButton title={t('add')} onpress={() => alert('fdsfsdfsdf')} />
        </div>
      </Dialog>


      {/* job cards content */}
      {/* <JobCardsContent jobcardsItems={jobcardsItems} fetchJobCards={fetchJobCards} /> */}

      <JobCardsContent jobcardsItems={filteredJobcards.length ? filteredJobcards : jobcardsItems} fetchJobCards={fetchJobCards} />
    
    </div>

















  )
}
