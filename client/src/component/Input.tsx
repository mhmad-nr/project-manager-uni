import React from 'react'
import { FieldInputProps } from 'formik'
type fieldType = {
    name: string,
    value: string,
    onChange: () => void,
    onBlur: () => void
}
type inputType = {
    name: string,
    placeholder: string,
    password: boolean,
    field: fieldType
}

export const Input = ({ name, placeholder, field, password }: inputType) => {
    // console.log(...field);
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{name}:</span>
            </div>
            <input  type={password ? "text" : 'password'} placeholder={placeholder} className="input input-bordered w-full max-w-xs" />
        </label>
    )
}

