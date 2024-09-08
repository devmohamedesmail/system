import React,{useContext,useEffect,useState} from 'react'
import CustomSelectOption from '../../custom/CustomSelectOption'
import { DataContext } from '../../context/DataProvider';
import { useTranslation } from 'react-i18next';
import { Setting } from '../../utilties/Setting';
import axios from 'axios';

export default function SalesTargetSection({users}) {
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
      const [sales,setSales]=useState();
    //   const [users,setUsers]=useState([]);
      const [selectedStaff, setSelectedStaff] = useState(null);
      const [salesTarget, setSalesTarget] = useState(0);
      const [methodType, setMethodType] = useState("");
      const {t}=useTranslation()




    //   const fetchusers = async () => {
    //    try {
    //     const response = await axios.get(`${Setting.url}show/users`);
    //     setUsers(response.data.data);
    
    //    } catch (error) {
    //     console.log(error)
    //    }
    //   };
    



      const filterSalesStaff = () => {
        if (users) {
          const result = users.filter((item) => item.role === "sales");
          setsalesStaff(result);
         
        } else {
          console.log("No staff data available");
        }
      };


      useEffect(()=>{
        filterSalesStaff()
        // fetchusers();
      },[])


      const handleChangeSales = (event) => {
        setSelectedStaff(event.target.value.name)
         

      };
    
      const handleMethodChange = (event) => {
        setMethodType(event.target.value.method);
       
      };

      useEffect(() => {
        const calculateTotalPrice = () => {
          let price = 0;
          invoices.forEach((invoice) => {
            const invoicePrice = parseFloat(invoice.price);
    
            if (isNaN(invoicePrice)) {
              console.error("Invalid price in invoice:", invoice.price);
              return;
            }

            if ((selectedStaff === null || invoice.sales === selectedStaff ) && (methodType === null || invoice.paidMethod === methodType)) {
              price += invoicePrice;
              console.log("Adding price:", invoicePrice);
              
            
            }
          });
          return price;
        };
    
        const newTotalPrice = calculateTotalPrice();
          setSalesTarget(newTotalPrice);
      }, [invoices, selectedStaff, methodType,users]);
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
              {methodTypes && methodTypes.length > 0 ? (
                <CustomSelectOption
                  value={methodType}
                  onchange={handleMethodChange}
                  options={methodTypes}
                  labelTitle="method"
                  placeholder={t("selectpaidmethod")}
                />
              ) : (
                <></>
              )}
            </div>
            <h3 className="bg-primary text-center text-white p-3">{salesTarget}</h3>
    </div>
  )
}
