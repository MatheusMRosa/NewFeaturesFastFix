import React from 'react'

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched && (error && <div className="alert alert-danger" role="alert">{error}</div>)}
    </div>
);

export default renderField;