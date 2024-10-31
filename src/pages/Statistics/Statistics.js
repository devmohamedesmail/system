import React from 'react'
import CustomPageTitle from '../../custom/CustomPageTitle'
import InvoicesStatistics from './InvoicesStatistics'
import SalesStatistics from './SalesStatistics'
import { useTranslation } from 'react-i18next'
import AddressStatistics from './AddressStatistics'
import ProblemStatistics from './ProblemStatistics'
import TaskStatistics from './TaskStatistics'

export default function Statistics() {
  const { t } = useTranslation()
  return (
    <div>
      <CustomPageTitle title={t("Statistics")} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10'>
        <div>
          <InvoicesStatistics />
        </div>
        <div>
          <SalesStatistics />
        </div>
        <div>
          <AddressStatistics />
        </div>
        <div>
          <ProblemStatistics />
        </div>
        <div>
          <TaskStatistics />
        </div>
      </div>
    </div>
  )

}
