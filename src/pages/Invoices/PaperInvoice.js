import React,{useEffect, useState} from "react";
import Logo from "../../components/Logo/Logo";
import axios from "axios";
import { Setting } from "../../utilties/Setting";

export default function PaperInvoice({ data,notes }) {







  return (
    <div className="invoice-print relative">
      <div className="header-invoice flex flex-row justify-between items-center">
        <Logo width={100} />
        <div className="flex flex-col justify-end items-center">
          <p className="arabic-font font-bold">الاخطبوط الذهبي لصيانه واصلاح السيارات</p>
          <p className="font-bold">Alkhtaboot Althahabi For Car Maintenance And Repair</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <p className="border border-black py-2 px-20">{data.invoiceType}</p>
      </div>

      <div className="client-info my-5 grid grid-cols-2">
        <div className="flex item-center justify-end my-2">
          <p className="mx-1">{data.name} </p>
          <p className="mx-1"> : اسم العميل </p>
        </div>

        <div className="flex item-center justify-end my-2">
          <p className="mx-1"> {data.phone} </p>
          <p className="mx-1"> : رقم الهاتف </p>
        </div>

        <div className="flex item-center justify-end my-2">
          <p className="mx-1"> ١٢٣٤٥٦٧٨٩ </p>
          <p className="mx-1"> : رقم الهاتف </p>
        </div>
        <div className="flex item-center justify-end my-2">
          <p className="mx-1"> {data.invoiceNumber} </p>
          <p className="mx-1"> : رقم الفاتوره </p>
        </div>
      </div>

      <div className="grid grid-cols-6 grid-rows-2">
         <div>car number</div>
         <div>car type</div>
         <div>service type</div>
         <div>service price</div>
         <div>VAT (5%)</div>
         <div>Total price</div>

         <div>{data.carNo}</div>
         <div>{data.carType}</div>
         <div>{data.carService}</div>
         <div>{data.price}</div>
         <div>{data.price * .05}</div>
         <div>{data.price + data.price * .05}</div>
      </div>

      <div className="notes mt-10">
        <div className="flex item-center justify-end my-2">
            <p> {data.description} </p>
            <p> : وصف السياره </p>
        </div>
        <div className="flex item-center justify-end my-2">
            <p> {data.note} </p>
            <p> : الملاحظات </p>
        </div>
      </div>

      <div>
        {notes && notes.length > 0 ? (<>
        {notes.map((note,index)=>(
          <p className="text-right" style={{direction:"rtl"}}>{index + 1} - {note.notear}</p>
        ))}
        
        
        </>):(<>no</>)}
      </div>




      <div className="flex justify-between fixed bottom-1 right-0 left-0">
        <div className="flex flex-col">
            <p> Authorized Signature </p>
            <p> --------------------- </p>
        </div>
        <div className="flex flex-col">
            <p> Authorized Signature </p>
            <p> --------------------- </p>
        </div>
      </div>



    </div>
  );
}
