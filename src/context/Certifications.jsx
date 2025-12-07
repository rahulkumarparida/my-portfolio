import React from 'react'
import CertificationBox from '../components/utils/CertificationBox'
import { Element } from 'react-scroll' 



const Certifications = () => {
  return (<Element name='Certifications'>
    <div className='text-white mt-30 '    data-aos="fade-up" 
      data-aos-duration="500">
        <CertificationBox />
        </div>
  </Element>
    
  )
}

export default Certifications