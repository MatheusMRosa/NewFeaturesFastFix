const validate = values => {
    const errors = {};
    if (!values.descService) {
        errors.descService = 'Por Favor insira uma breve descrição sobre o Serviço';
    } else if (!values.estimateHours) {
        errors.estimateHours = 'Por Favor informe um horário'
    } else if (!values.estimateMinutes) {
        errors.estimateMinutes = 'Por Favor informe os minutos'
    } else if (values.estimateHours < 0) {
        errors.estimateHours = 'Por Favor insira um número positivo'
    } else if (values.estimateMinutes < 0) {
        errors.estimateMinutes = 'Por Favor insira um número positivo'
    } else if (values.estimateMinutes > 59) {
        errors.estimateMinutes = 'Por favor altere os minutos para menos de 60min'
    }
    return errors
};

export default validate;