import React, { useEffect, useState, useRef } from "react";
import { Setting } from "../../utilties/Setting";






const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear()).slice(-4); // Get last two digits of the year
  return `${day}/${month}/${year}`;
};

export default function PaperInvoice({ data, notes, Logo, settingData }) {
  const [date, setdate] = useState(new Date());
  

  return (
    <div className="printable-area px-10">

      <div className="invoice-print relative ">
        <div className="header-invoice flex flex-row justify-between items-center">
          {/* <Logo width={100} /> */}

          <img src={`${Setting.url2}/uploads/setting/${settingData.logo}`} width={100} />


          <div className="flex flex-col justify-end items-center">

            <p className="my-1 font-bold text-right arabic-font">
              {settingData.namear}
            </p>


            <p className="font-bold ">
              {settingData.nameen}
            </p>
          </div>
        </div>

        <hr className="w-100 h-1 bg-black " />

        <div className="flex justify-between my-5">
          <div>
            <p className="text-xs text-nowrap">
              {" "}
              United Arab Emirates Branch - Sharjah - Fourth Industrial Area -
              00971561000840{" "}
            </p>
            <p className="text-xs text-nowrap">
              {" "}
              Kingdom of Saudi Arabia branch - Riyadh - King Fahd Street -
              0096581799997{" "}
            </p>
            <p className="text-xs text-nowrap">
              {" "}
              Kingdom of Saudi Arabia branch - Jeddah - King Fahd Street -
              0096536999559
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex item-center">
              <p className="text-xs text-nowrap">E-mail : </p>
              <p className="text-xs text-nowrap"> {settingData.email} </p>
            </div>
            <div className="flex item-center">
              <p className="text-xs text-nowrap">website : </p>
              <p className="text-xs text-nowrap"> {settingData.website}</p>
            </div>
          </div>
        </div>

        <hr className="w-100 h-1 bg-black " />

        <div className="flex justify-center items-center mt-5">
          <p className="border border-black py-2 px-20">{data.invoiceType}</p>
        </div>



        <div className="client-info my-5 grid grid-cols-2">
          <div className="flex item-center justify-end my-2">
            <p className="mx-1 text-sm"> {data.phone} </p>
            <p className="mx-1 text-sm"> : رقم الهاتف </p>
          </div>

          <div className="flex item-center justify-end my-2">
            <p className="mx-1 text-sm">{data.name} </p>
            <p className="mx-1 text-sm"> : اسم العميل </p>
          </div>

          <div className="flex item-center justify-end my-2">
            <p className="mx-1 text-sm"> {formatDate(date)} </p>
            <p className="mx-1 text-sm"> : التاريخ </p>
          </div>
          <div className="flex item-center justify-end my-2">
            <p className="mx-1 text-sm"> {data.invoiceNumber} </p>
            <p className="mx-1 text-sm"> : رقم الفاتوره </p>
          </div>
        </div>

        <div className="grid grid-cols-6 ">
          <p className="text-center text-sm border border-black p-1 border-b-0">Car Number</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">Car Type</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">Service Type</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">Service Price</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">VAT (5%)</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">Total Price</p>

          <p className="text-center text-sm border border-black p-1 border-b-0">{data.carNo}</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">{data.carType}</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">{data.carService}</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">{data.price}</p>
          <p className="text-center text-sm border border-black p-1 border-b-0">{parseInt(data.price) * 0.05}</p>
          <p className="text-center text-sm border border-black p-1 border-b-0"> {parseInt(data.price, 10) + parseInt(data.price, 10) * 0.05}</p>

          <p className="text-xs col-span-5 text-right border border-black p-1 border-b-0"> {data.description} </p>
          <p className="text-xs text-center border border-black p-1 border-b-0">  وصف السياره </p>


          <p className="text-xs col-span-5 text-right border border-black p-1 border-b-0"> {data.note ? data.note : "لا يو جد ملاحظات "} </p>
          <p className="text-xs text-center border border-black p-1 border-b-0"> الملاحظات </p>



          <p className="text-xs col-span-5 text-right border border-black p-1"> {data.percent} </p>
          <p className="text-xs text-center border border-black p-1">  النسبه </p>

        </div>



        <div className="mt-10">
          <p className="text-right font-bold mb-3"> الشروط والا حكام </p>

          {notes && notes.length > 0 ? (
            <>
              {notes.map((note, index) => (
                <p className="text-right text-xs" style={{ direction: "rtl", fontSize: 10 }}>
                  {index + 1} - {note.notear}
                </p>
              ))}
            </>
          ) : (
            <p>No notes available.</p>
          )}
        </div>

        <div className="flex justify-between fixed bottom-1 right-0 left-0">
          <div className="flex flex-col">
            <p> Authorized Signature </p>
            <p> --------------------- </p>
          </div>
          <div className="flex flex-col">
            <p> Customer Signature </p>
            <p> --------------------- </p>
          </div>
        </div>
      </div>

    </div>
  );
}
