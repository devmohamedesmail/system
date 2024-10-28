import React from 'react'
import '../pages/screenStyle.css'
import CustomHomeCard from '../custom/CustomHomeCard';
import { useTranslation } from 'react-i18next';



export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="">
      <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 p-10'>
        <CustomHomeCard
          image={"/images/icons/analytics.png"}
          title={t('Statistics')}
          url="/dashboard/statistics" />


        <CustomHomeCard
          image={"/images/icons/branch.png"}
          title={t('branches')}
          url="/dashboard/branches" />

        <CustomHomeCard
          image={"/images/icons/invoice.png"}
          title={t('invoices')}
          url="/dashboard/show/all/invoices" />

        <CustomHomeCard
          image={"/images/icons/invoice-add.png"}
          title={t('createnewinvoice')}
          url="/dashboard/create/new/invoice" />

        <CustomHomeCard
          image={"/images/icons/staff.png"}
          title={t('employees')}
          url="/dashboard/show/employees" />

        <CustomHomeCard
          image={"/images/icons/employee.png"}
          title={t('setting-staff')}
          url="/dashboard/employees/setting" />

        <CustomHomeCard
          image={"/images/icons/feedback.png"}
          title={t('employeesreports')}
          url="/dashboard/reports/employees" />


        <CustomHomeCard
          image={"/images/icons/purchasing.png"}
          title={t('purchases')}
          url="/dashboard/purchases/page" />

        <CustomHomeCard
          image={"/images/icons/insurance.png"}
          title={t('rent')}
          url="/dashboard/rent/page" />


        <CustomHomeCard
          image={"/images/icons/payment-check.png"}
          title={t('checks')}
          url="/dashboard/checks/page" />


        <CustomHomeCard
          image={"/images/icons/team.png"}
          title={t('users')}
          url="/dashboard/users/page" />


        <CustomHomeCard
          image={"/images/icons/configuration.png"}
          title={t('setting')}
          url="/dashboard/setting/page" />


      </div>
    </div>
  )
}
