const validate = values => {
    const errors = {};
    if (!values.user) {
        errors.user = 'Por Favor insira um Usuário';
    } else if (!values.pass) {
        errors.pass = 'Por Favor insira uma Senha';
    }
    return errors
};

export default validate;