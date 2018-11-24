import React, { Component } from 'react';

import ConjugationForm from './ConjugationForm';
import TenseHeader from './TenseHeader';


export default class VerbContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verbs: [],
            idx: 0,
            tenses: {
                "Presente": true, 
                "Presente - Imperativo": true, 
                "Presente perfecto": false, 
                "Pretérito": true, 
                "Futuro": true,
                "Futuro perfecto": false, 
                "Pluscuamperfecto": false, 
                "Imperfecto": false, 
                "Pretérito anterior": false, 
                "Condicional": false,
                "Condicional perfecto": false, 
                // subjunctive
                "Presente - Subjuntivo": false, 
                "Presente perfecto - Subjuntivo": false, 
                "Futuro - Subjuntivo": false,
                "Futuro perfecto - Subjuntivo": false,
                "Pluscuamperfecto - Subjuntivo": false, 
                "Imperfecto - Subjuntivo": false, 
            },
            hasLoaded: false
        }

        this._loadVerbs = this.loadVerbs.bind(this);
        this._toggleTense = this.toggleTense.bind(this);
        this._nextVerb = this.nextVerb.bind(this);
    }

    loadVerbs() {
        fetch(`http://localhost:8000/verbs`).then(resp =>
            resp.json().then(rResp =>
                this.setState({ verbs: rResp, hasLoaded: true }))
        );
    }

    componentDidMount() {
        this._loadVerbs();
    }

    nextVerb() {
        if (this.state.idx >= this.state.verbs.length - 1) {
            this.setState({ idx: 0, hasLoaded: false, verbs: [] });
            this.loadVerbs()
        } else {
            this.setState({ idx: this.state.idx + 1 });
        }
    }

    toggleTense(name) {
        this.setState(prevState => (
           {
                tenses: {
                    ...prevState.tenses,
                    [name]: !prevState.tenses[name]
                }
           }
        ));
    }

    submitVerbs(values) {
        this.setState({ formValuess: values });
    }

    render() {
        const { hasLoaded, tenses, verbs, idx, formValues } = this.state;
        const verb = verbs[idx];

        return (
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <TenseHeader activeTenses={ tenses } toggleTense={ this._toggleTense } />
                </div>
                { 
                    !hasLoaded ? 
                    <h1>Loading Some Verbs</h1> : 
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1>{ verb.infinitive }</h1>
                            <p
                                style={{ 
                                    marginLeft: '20px',
                                }}
                            >({ verb.infinitiveEnglish })</p>
                            <p 
                                style={{ 
                                    marginLeft: '20px',
                                    border: '1px solid gray',
                                    borderRadius: '8px',
                                    padding: '7px'
                                }}
                                onClick={ this._nextVerb }>next >></p>
                        </div>
                        <div style={{ display: 'flex', width: '100%', maxWidth: '1000px' }}>
                        {
                            Object.keys(tenses).filter(t => tenses[t]).map(tense => (
                                <div 
                                    key={`${tense}${verbs[idx]}`} 
                                    style={{ 
                                        margin: '20px',
                                        marginTop: '0px',
                                        border: '1px solid #aaa',
                                        borderRadius: '8px',
                                        padding: '15px'
                                    }}
                                >
                                    <div style={{ fontSize: '18px', fontWeight: '600',  marginBottom: '7px' }}>{tense}</div>
                                    <ConjugationForm
                                        verb={ verbs[idx] }
                                        tense={ tense }
                                        conjugations={ verbs[idx].conjugations.find(v => v.tense.toLowerCase() == tense.toLowerCase()) || {} } 
                                    />
                                </div>
                            ))
                        }
                        </div>
                    </div>
                }
            </div>
        );
    }
}
