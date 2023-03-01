import * as Yup from 'yup';

export function initialValues() {
    return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    };
}

export function validationSchema() {
    return Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
        repeatPassword: Yup.string().required('Required'),
    });
}