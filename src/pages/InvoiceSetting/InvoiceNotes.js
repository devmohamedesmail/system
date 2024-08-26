import React, { useEffect, useState } from "react";
import CustomSectionTitle from "../../custom/CustomSectionTitle";
import { useTranslation } from "react-i18next";
import CustomTextArea from "../../custom/CustomTextArea";
import CustomButton from "../../custom/CustomButton";
import axios from "axios";
import { Setting } from "../../utilties/Setting";
import CustomModal from "../../custom/CustomModal";
import DataTable from "react-data-table-component";
import CustomActionButton from "../../custom/CustomActionButton";
import { MdDelete } from "react-icons/md";
import CustomLoading from "../../custom/CustomLoading";

export default function InvoiceNotes() {
  const { t } = useTranslation();
  const [noteen, setNoteen] = useState("");
  const [notear, setNotear] = useState("");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState();

  const handleAddNote = async () => {
    try {
      setLoading(true);
      await axios.post(`${Setting.url}add/note`, {
        notear,
        noteen,
      });
      setVisible(true);
      setNotear("");
      setNoteen("");
      setLoading(false);
      setPosition("top-right");
      fetchNotes();
    } catch (error) {
      alert(error);
    }
  };

  const fetchNotes = async () =>{
    const response = await axios.get(`${Setting.url}show/notes`);
    setNotes(response.data.data)
  }

  useEffect(()=>{fetchNotes()},[])

  const columns = [
   
    {
      name: t("notear"),
      selector: (row) => row.notear,
      sortable: true,
    },
    {
      name: t("action"),
      cell:(row)=>(
        <CustomActionButton icon={<MdDelete color="red" size={20} />} onpress={()=>handleDeletenote(row)} />
      )
      
    },
  ];


  const handleDeletenote = async (row) =>{
    try {
        const confirm = window.confirm(`${t('alertdelete')}`);
        if (confirm) {
           await axios.delete(`${Setting.url}delete/note/${row.id}`) 
           fetchNotes();
        }
    } catch (error) {
        
    }
  }
  return (
    <>
      <div className="bg-white  p-3 my-3">
        <CustomSectionTitle title={t("invoiceNotes")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            {" "}
            <CustomTextArea
              value={noteen}
              placeholder={t("noteen")}
              onchange={(e) => setNoteen(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <CustomTextArea
              value={notear}
              placeholder={t("notear")}
              onchange={(e) => setNotear(e.target.value)}
            />
          </div>
        </div>
        <div>
          
         
            {loading? (<CustomLoading />) :( <CustomButton title={t("add")} onpress={() => handleAddNote()} />)}
        </div>

        <CustomModal
          visible={visible}
          setVisible={setVisible}
          position={position}
          setPosition={setPosition}
          content={t("noteadded")}
        />
      </div>
      <div className="bg-white p-3 my-3">
        <CustomSectionTitle title={t("invoiceNotes")} />
        <DataTable pagination fixedHeader data={notes} columns={columns} selectableRows />
      </div>
    </>
  );
}
