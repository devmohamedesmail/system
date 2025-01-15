import React, { useEffect, useState, useRef } from "react";
import { Setting } from "../../utilties/Setting";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-4); // Get last two digits of the year
  return `${day}/${month}/${year}`;
};

export default function PaperInvoice({ data, notes, Logo, settingData }) {
  const [date, setdate] = useState(new Date());

  return (
    <div className="printable-area px-10">
      <div className="invoice-print relative ">
        <div className="header-invoice flex flex-row justify-between items-center">
          <img
            src={`${Setting.url2}/uploads/setting/${settingData.logo}`}
            width={150}
          />

          <div className="flex flex-col justify-end items-center">
            <p className="my-1 font-bold text-right arabic-font">
              {settingData.namear}
            </p>

            <p className="font-bold ">{settingData.nameen}</p>
          </div>
        </div>

        <hr className="w-100 h-2 bg-black " />
        <div className="flex justify-center items-center mt-5">
          <p className="border border-black font-bold py-2 px-20">
            {data.invoiceType}
          </p>
        </div>
        <div className="flex justify-center items-center ">
          <p className="  font-bold py-2 px-20">
          Tokio Marine TRN number 100289623900003
          </p>
        </div>
        <div className="grid grid-cols-2 my-5">
          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 border-b-0 px-2">
            <p className="mx-1 text-sm"> {data.phone} </p>
            <p className="mx-1 text-sm"> : رقم الهاتف </p>
          </div>
          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 border-b-0 border-l-0 px-2">
            <p className="mx-1 text-sm">{data.name} </p>
            <p className="mx-1 text-sm"> : اسم العميل </p>
          </div>
          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 px-2">
            <p className="mx-1 text-sm"> {formatDate(date)} </p>
            <p className="mx-1 text-sm"> : التاريخ </p>
          </div>
          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 border-l-0 px-2">
            <p className="mx-1 text-sm"> {data.invoiceNumber} </p>
            <p className="mx-1 text-sm"> : رقم الفاتوره </p>
          </div>
        </div>
        {/* ------------------ car info ------------------------ */}

        <div className="flex flex-row justify-end items-center">
          <p className="mx-1 text-sm border border-black py-3 px-10  border-l-black border-l-8 w-fit">
            {" "}
            {data.carNo}{" "}
          </p>
        </div>

        <div className="grid grid-cols-2 my-5">
          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 border-b-0  px-2">
            <p className="mx-1 text-sm"> car type </p>
            <p className="mx-1 text-sm">{data.carType} </p>
            <p className="mx-1 text-sm"> : نوع السياره </p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 px-2 border-b-0 border-l-0">
            <p className="mx-1 text-sm"> service type </p>
            <p className="mx-1 text-sm"> {data.carService} </p>
            <p className="mx-1 text-sm"> نوع الخدمه </p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-400 py-2  px-2">
            <p className="mx-1 text-sm"> Ratio </p>
            <p className="mx-1 text-sm"> {data.percent} </p>
            <p className="mx-1 text-sm"> : النسبه </p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-400 py-2 border-b-0 border-l-0 px-2">
            <p className="mx-1 text-sm"> Price </p>
            <p className="mx-1 text-sm"> {parseInt(data.price)} </p>
            <p className="mx-1 text-sm"> : السعر </p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-400 py-2  border-t-0 px-2">
            <p className="mx-1 text-sm"> VAT :</p>
            <p className="mx-1 text-sm"> {parseInt(data.price) * 0.05} </p>
            <p className="mx-1 text-sm"> الضريبه </p>
          </div>

          <div className="flex flex-row justify-between items-center border border-gray-400 py-2  border-l-0 px-2">
            <p className="mx-1 text-sm"> total price </p>
            <p className="mx-1 text-sm">
              {" "}
              {parseInt(data.price, 10) + parseInt(data.price, 10) * 0.05}{" "}
            </p>
            <p className="mx-1 text-sm"> : الاجمالي </p>
          </div>
        </div>

        {/* description and notes */}

        <div className="grid grid-cols-1 my-5">
          <div className="flex flex-row justify-between items-center border border-gray-400 py-1 border-b-0">
            <p className="mx-1 text-xs flex-1 text-right">
              {" "}
              {data.description}{" "}
            </p>
            <p
              className="mx-1 text-sm border-l text-right"
              style={{ width: "100px" }}
            >
              {" "}
              : وصف السياره{" "}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center border border-gray-400 py-1  ">
            <p className="mx-1 text-xs flex-1 text-right">
              {" "}
              {data.note ? data.note : "لا يو جد ملاحظات "}{" "}
            </p>
            <p
              className="mx-1 text-sm border-l text-right"
              style={{ width: "100px" }}
            >
              {" "}
              : الملاحظات{" "}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-right font-bold mb-3"> الشروط والا حكام </p>

          {notes && notes.length > 0 ? (
            <>
              {notes.map((note, index) => (
                <p
                  className="text-right text-xs"
                  style={{ direction: "rtl", fontSize: 10 }}
                >
                  {index + 1} - {note.notear}
                </p>
              ))}
            </>
          ) : (
            <p>No notes available.</p>
          )}
        </div>
        <div className="flex justify-between  mt-10">
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

      {/* Second page */}

      <div className="header-invoice flex flex-row justify-between items-center">
        <img
          src={`${Setting.url2}/uploads/setting/${settingData.logo}`}
          width={150}
        />

        <div className="flex flex-col justify-end items-center">
          <p className="my-1 font-bold text-right arabic-font">
            {settingData.namear}
          </p>

          <p className="font-bold ">{settingData.nameen}</p>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-bold mb-3"> Terms and conditions </p>

        {notes && notes.length > 0 ? (
          <>
            {notes.map((note, index) => (
              <p className=" text-xs" style={{ fontSize: 10 }}>
                {index + 1} - {note.noteen}
              </p>
            ))}
          </>
        ) : (
          <p>No notes available.</p>
        )}
      </div>

      <div className="flex justify-end flex-col items-end mt-44">
        <p>تم استلام السياره كما هو متفق عليه</p>
        <p className="mt-2">التوقيع</p>
      </div>
    </div>
  );
}
