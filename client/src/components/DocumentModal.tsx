import React from 'react'


interface DocType{

    title:string;
    setIsOpen:any;
    content:string;
}

const DocumentModal = (props:DocType) => {
  return (
    <div className='absolute rounded-lg shadow-md w-[90%] h-[90%]'>
        <div className="heading flex">
            <div>

            </div>

        </div>
        
    </div>
  )
}

export default DocumentModal