import React from 'react';

import './form-input.styles.scss';

/** Form input that has : handleChange, which applies scss effects if there is content in the input; label, which is used as the label above or inside the input; a spread operator for the rest of the props */
const FormInput = ({ handleChange, label, ...otherProps }) => {
    return (
        <div className="group">
            <input className='form-input' onChange={handleChange} {...otherProps} />
            {label ? (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            ) : null}
        </div>
    );
};

export default FormInput;