import React, { Component } from 'react';

import ConjugationForm from './ConjugationForm';
import { runInThisContext } from 'vm';


export default class VerbContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verbs: [],
            nextVerbs: [],
            idx: 0,
            tenses: {
                'present': true,
                'imperative': true,
                'preterit': true
            },
            hasLoaded: false
        }

        this._loadVerbs = this.loadVerbs.bind(this);
        this._toggleTense = this.toggleTense.bind(this);
        this._nextVerb = this.nextVerb.bind(this);
    }

    loadVerbs() {
        // TODO
        this.setState({
            hasLoaded: true,
            verbs: [
                {
                    infinitive: 'abrir',
                    tenses: [
                        {
                            englishName: 'present',
                            conjugation: {
                                'yo': 'abro',
                                'tu': 'abras',
                                'ud': 'abra',
                                'nos': 'abramos',
                                'vos': 'abrais',
                                'uds': 'abran',
                            }
                        },
                        {
                            englishName: 'present',
                            conjugation: {
                                'yo': 'abro',
                                'tu': 'abras',
                                'ud': 'abra',
                                'nos': 'abramos',
                                'vos': 'abrais',
                                'uds': 'abran',
                            }
                        },
                        {
                            englishName: 'present',
                            conjugation: {
                                'yo': 'abro',
                                'tu': 'abras',
                                'ud': 'abra',
                                'nos': 'abramos',
                                'vos': 'abrais',
                                'uds': 'abran',
                            }
                        }
                    ]
                },
                {
                    infinitive: 'comer',
                    tenses: [
                        {},
                        {},
                        {}
                    ]
                },
                {
                    infinitive: "tomar",
                    tenses: [
                        {},
                        {},
                        {}
                    ]
                }
            ]
        });
    }

    componentDidMount() {
        this._loadVerbs();
    }

    nextVerb() {
        this.setState((prevState) => {
            const newIdx = prevState.idx + 1 > 2
                ? 0
                : prevState.idx + 1;
            return {
                idx: newIdx
            };
        });
    }

    toggleTense(e) {
        const name = e.target.getAttribute('name');
        this.setState(prevState => (
           {
                tenses: {
                    ...prevState.tenses,
                    [name]: !prevState.tenses[name]
                }
           }
        ));
    }

    render() {
        const { hasLoaded, tenses, verbs, idx } = this.state;
        const verb = verbs[idx];
        const activeTenses = [];
        Object.keys(tenses).forEach(tk => {
            if (tenses[tk]) {
                activeTenses.push(tk);
            }
        })

        return (
            <>
            {
                !hasLoaded ? 
                <h1>LOADING VERBS!</h1> :
                <div>
                    <div>
                        <p 
                            name='present'
                            style={{
                                background: tenses['present'] ? 'lightblue' : 'white'
                            }} 
                            onClick={ this._toggleTense }>Present</p>
                        <p 
                            name='imperative'
                            style={{
                                background: tenses['imperative'] ? 'lightblue' : 'white'
                            }} 
                            onClick={ this._toggleTense }>Imperative</p>
                        <p 
                            name='preterit'
                            style={{
                                background: tenses['preterit'] ? 'lightblue' : 'white'
                            }} 
                            onClick={ this._toggleTense }>Preterit</p>
                    </div>
                    <h1>{ verb.infinitive }</h1>
                    <p onClick={ this._nextVerb }>next >></p>
                    {
                        activeTenses.map(tense => (
                            <ConjugationForm 
                                key={ tense }
                                tense={ tense } 
                                verb={ verbs[idx].tenses.find(v => v.englishName == tense) } 
                            />
                        ))
                    }
                </div>
            }
            </>
        );
    }
}
