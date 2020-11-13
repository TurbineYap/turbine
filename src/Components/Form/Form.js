import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function FormVal() {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const SignupSchema = Yup.object().shape({
        name: Yup.string().typeError('Должно быть строкой').min(2, "Не менее 2-х знаков").max(50, "Не более 50-ти знаков").required('Обязательно'),
        email: Yup.string().email('Введите верный email').required('Обязательно'),
        phone: Yup.string().matches(phoneRegExp, 'Не соответствует формату').required('Обязательно'),
        text: Yup.string().typeError('Что-то пошло не так').min(20, "Пишите...").required('Обязательно'),
        toggle: Yup.boolean().oneOf([true], "Вы должны согласиться с офертой")
    });

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    text: '',
                    toggle: false,
                }}
                validateOnBlur
                onSubmit={(values) => { console.log(values) }}
                validationSchema={SignupSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (

                    <Form className={'main__form form'}>
                        <input
                            type={"text"}
                            onChange={handleChange}
                            value={values.name}
                            onBlur={handleBlur}
                            name={"name"}
                            className="form__input"
                            placeholder="Имя и фамилия автора"
                        />
                        {touched.name && errors.name && <span style={{ opacity: 1 }} className="form__input-error">{errors.name}</span>}
                        <span id="name-input-error" className="form__input-error">Какая-то ошибка*</span>
                        <input
                            type={"email"}
                            name={"email"}
                            className="form__input"
                            placeholder="Почта"
                            value={values.email}
                            onChange={handleChange}
                            value={values.email}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email && <span style={{ opacity: 1 }} className="form__input-error">{errors.email}</span>}
                        <span id="email-input-error" className="form__input-error">Какая-то ошибка*</span>
                        <input
                            type={"tel"}
                            name={"phone"}
                            className="form__input"
                            placeholder="Телефон"
                            onChange={handleChange}
                            value={values.phone}
                            onBlur={handleBlur}
                        />
                        {touched.phone && errors.phone && <span style={{ opacity: 1 }} className="form__input-error">{errors.phone}</span>}
                        <span id="tel-input-error" className="form__input-error">Какая-то ошибка*</span>
                        <textarea
                            type={"textarea"}
                            name={"text"}
                            className="form__input"
                            placeholder="Стихи"
                            onChange={handleChange}
                            value={values.text}
                            onBlur={handleBlur}
                        />
                        {touched.text && errors.text && <span style={{ opacity: 1 }} className="form__input-error">{errors.text}</span>}
                        <span className="form__input-error">Какая-то ошибка*</span>
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id={"formCheckbox"}
                            name={"toggle"}
                            checked = {values.toggle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                      <label htmlFor="formCheckbox" className="form__check-label">
                            Согласен с <a href="#" target="_blank" className="form__link">офертой</a>
                        </label>
                        {touched.toggle && errors.toggle && <span style={{ opacity: 1 }} className="form__input-error">{errors.toggle}</span>}
                        <button
                            className="form__btn"
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}
                            type={"submit"}
                        >Отправить</button>
                    </Form>
                )}

            </Formik>
        </div>


    )
}

export default FormVal;