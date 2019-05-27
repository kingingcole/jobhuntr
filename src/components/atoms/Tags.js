import React from 'react';
import {Link} from 'react-router-dom'

const Tags = ({tag}) => {
    let style = {
        padding: '4px 6px',
        border: '1px solid rgba(108, 99, 255, 0.4)',
        margin: '2px',
        borderRadius: '4px',
        fontSize: '0.8em',
        color: 'rgba(108, 99, 255, 0.9)',
        cursor: 'pointer',
        display: 'inline-block'
    }

    let link = `/tag/${tag}`

    return(
        
            <Link to={link}>
                <span className='tag'>{tag}</span>
            </Link>
        
    )
};

export default Tags