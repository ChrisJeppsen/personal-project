import {useState} from 'react'

const useEditForm = (initialValues) => {
    const [values, setValues] = useState(initialValues)

    return [values, e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }]
}
export default useEditForm