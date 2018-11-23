import React, { Component } from 'react';
import { Form, Field } from 'react-final-form'

/**
 * "form1s"
"form2s"
"form3s"
"form1p"
"form2p"
"form3p"
 */
const personToLabel = {
    form1s: 'yo',
    form2s: 'tu',
    form3s: 'Ud',
    form1p: 'nos.',
    form2p: 'vos.',
    form3p: 'Uds.' 
};


const handleSubmit = values => true;


const checkAnswer = (conjugations, values) => {
    const results = {};
    Object.keys(values).forEach(person => (
        results[person] = conjugations[person].toLowerCase() !== values[person].toLowerCase()

    ))

    return results;
};


const ConjugationForm = ({ conjugations, verb }) => (
    <Form
        onSubmit={(values) => checkAnswer(conjugations, values)}
        validate={values => checkAnswer(conjugations, values)}
        validateOnBlur={false}
        render={
            ({ handleSubmit, form, value }) =>(
                <form onSubmit={handleSubmit}>
                    {
                        Object.keys(conjugations).map(person => (
                            personToLabel[person] &&
                            <div 
                                key={person} 
                                style={{ 
                                    display: 'flex',
                                    marginBottom: '7px',
                                    width: '100%'
                                    }}
                                >
                                <label 
                                    style={{ 
                                        marginRight: '5px',
                                        width: '30px'
                                    }}
                                >{personToLabel[person]}</label>
                                <Field name={person}>
                                    {({ input, meta }) => (
                                        <div style={{ display: 'flex' }}>
                                            <input {...input} type="text" />
                                            {meta.error && meta.touched && <p>{conjugations[person]}</p>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                        ))
                    }
                    <p>{JSON.stringify(value)}</p>
                    <button type="submit">Check</button>
                </form>
            )
        }
    >
    </Form>
)

export default ConjugationForm;