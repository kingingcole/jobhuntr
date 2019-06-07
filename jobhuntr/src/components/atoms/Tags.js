import React from 'react';
import {Link} from 'react-router-dom'

const Tags = ({tag}) => {
    let link = `/tag/${tag}`
    return(
        
            <Link to={link}>
                <span className='tag'>{tag}</span>
            </Link>
        
    )
};

export default Tags