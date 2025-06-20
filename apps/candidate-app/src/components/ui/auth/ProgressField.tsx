import { ProgressBar, ProgressBarProps } from 'primereact/progressbar'
import React from 'react'

interface ProgressFieldProps extends ProgressBarProps {
  value: number
}
const ProgressField: React.FC<ProgressFieldProps> = ({ value, ...rest }) => {

  return (
    <div className='flex-1 flex md:flex-col flex-row md:items-start items-center gap-2 w-full'>
      <p className="text-center text-[#6E6E6E] font-bold !w-10" style={{ width: `${100}%` }}>{value}%</p>
      <ProgressBar
        {...rest}
        showValue={false}
        value={value}
        pt={{
          root: { className: "h-3 rounded-full w-full" },
          value: {className: "bg-primary"}
        }}
      >
      </ProgressBar>
    </div>
  )
}

export default ProgressField
