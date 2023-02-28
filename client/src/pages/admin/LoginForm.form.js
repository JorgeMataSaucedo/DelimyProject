import * as Yup from 'yup';

export function initialValues() {
    return {
        email: '',
        password: '',
    };
}

export function validationSchema() {
    return Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });
}