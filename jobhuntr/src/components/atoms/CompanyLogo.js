import React from 'react'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const CompanyLogo = ({logo, company, width, borderRadius, marginLeft, marginRight}) => {
    let alt = `${company}`;
    const style={
        maxWidth: width,
        borderRadius,
        marginLeft,
        marginRight,
    };

    return(
        // <img src={logo} alt={alt} className='img-fluid d-block text-right' style={style}/>
        <LazyLoadImage 
            alt={alt}
            effect='blur'
            src={logo}
            width={width}
            placeholderSrc={logo}
        />
    )
};

export default CompanyLogo

