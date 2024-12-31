import React, { useContext, useEffect, useState } from 'react'
import CustomSelectOption from '../../custom/CustomSelectOption'
import { DataContext } from '../../context/DataProvider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import CustomCalender from '../../custom/CustomCalender';

export default function SalesTargetSection({ users }) {
  const [
    invoicesTypes,
    fetchInvoiceTypes,
    methodTypes,
    fetchMethodTypes,
    invoices,
    fetchInvoices,
    departments,
    fetchDepartments,
    staff,
    fetchStaff,
  ] = useContext(DataContext);


  const [salesStaff, setsalesStaff] = useState();

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [invoiceType, setInvoiceType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salesTarget, setSalesTarget] = useState(0);
  const { t } = useTranslation()
  const { theme } = useTheme()






  // Select staff
  const handleChangeSales = (event) => {
    setSelectedStaff(event.target.value.name)


  };


  const handleTypeChange = (event) => {
    setInvoiceType(event.target.value.type);

  };


console.log(invoiceType)


  const filterSalesStaff = () => {
    if (users) {
      const result = users.filter((item) => item.role === "sales");
      setsalesStaff(result);

    } else {
      console.log("No staff data available");
    }
  };


  useEffect(() => {
    filterSalesStaff()

  }, [])



  // useEffect(() => {
  //   const calculateTotalPrice = () => {
  //     let price = 0;
  //     invoices.forEach((invoice) => {
  //       const invoicePrice = parseFloat(invoice.price);

  //       if (isNaN(invoicePrice)) {
  //         console.error("Invalid price in invoice:", invoice.price);
  //         return;
  //       }

  //       if ((selectedStaff === null || invoice.sales === selectedStaff) && (invoiceType === null || invoice.invoiceType === invoiceType)) {
  //         price += invoicePrice;
  //         console.log("Adding price:", invoicePrice);


  //       }
  //     });
  //     return price;
  //   };

  //   const newTotalPrice = calculateTotalPrice();
  //   setSalesTarget(newTotalPrice);
  // }, [invoices, selectedStaff, invoiceType, users]);


  useEffect(() => {
    const calculateTotalPrice = () => {
      let price = 0;

      invoices.forEach((invoice) => {
        const invoicePrice = parseFloat(invoice.price);
        const createdAt = new Date(invoice.created_at); // Parse created_at

        if (isNaN(invoicePrice)) {
          console.error("Invalid price in invoice:", invoice.price);
          return;
        }

        // Check filters
        const matchesStaff = !selectedStaff || invoice.sales === selectedStaff;
        const matchesType = !invoiceType || invoice.invoiceType === invoiceType;
        const matchesDate =
          (!startDate || createdAt >= new Date(startDate)) &&
          (!endDate || createdAt <= new Date(endDate));

        if (matchesStaff && matchesType && matchesDate) {
          price += invoicePrice;
        }
      });

      return price;
    };

    setSalesTarget(calculateTotalPrice());
  }, [invoices, selectedStaff, invoiceType, startDate, endDate]);



  return (
    <div>
      <h3 className="my-3 text-center font-bold">{t("sales")}</h3>
      <div className="my-2">
        {salesStaff && salesStaff.length > 0 ? (
          <CustomSelectOption
            value={selectedStaff}
            onchange={handleChangeSales}
            options={salesStaff}
            labelTitle="name"
            placeholder={t("selectstaff")}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="my-2">
        {invoicesTypes && invoicesTypes.length > 0 ? (
          <CustomSelectOption
            value={invoiceType}
            onchange={handleTypeChange}
            options={invoicesTypes}
            labelTitle="type"
            placeholder={t("selectinvoicetype")}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="my-2">
        <label>{t("startdate")}</label>
        <input type='date' className='w-full border p-3' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="my-2">
        <label>{t("enddate")}</label>
        <input type='date' className='w-full border p-3' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>


      <h3 className={`text-center p-3 ${theme === 'light' ? 'bg-light-mode text-white' : 'bg-primary text-black'}`}>{salesTarget}</h3>
    </div>
  )
}
