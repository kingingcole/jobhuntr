import React from 'react'
import Loader from 'react-loader-spinner'

const CustomLoader = () => {
    return(
        <div className="text-center my-5">
            <Loader
                type="ThreeDots"
                color="rgb(108, 99, 255)"
                height="70"
                width="70"
            />
        </div>
    )
};

export default CustomLoader