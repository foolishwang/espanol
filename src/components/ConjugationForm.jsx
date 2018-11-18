import React, { Component } from 'react';


export default class ConjugationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yo: '',
            yoCorrect: false,
            tu: '',
            tuCorrect: false,
            ud: '',
            udsCorrect: false,
            nos: '',
            nosCorrect: false,
            vos: '',
            vosCorrect: false,
            uds: '',
            udsCorrect: false,
            correctTimeout: null
        };

        this._inputChange = this.inputChange.bind(this);
        this._correct = this.correct.bind(this);
    }

    correct(person) {
        const { verb } = this.props;
        this.setState(prevState => (
            {
                [`${person}Correct`]: prevState[person] == verb.conjugation[person]
            }
        ));
    }

    inputChange(e) {
        const pers = e.target.getAttribute('name');
        clearTimeout(this.state.correctTimeout);
        const value = e.target.value;
        this.setState(prevState => (
            {
                [pers]: value,
                correctTimeout: setTimeout(() => this._correct(pers), 500)
            }
        ));
    }

    render() {
        const { tense, verb } = this.props;
        const {
            yo,
            yoCorrect,
            tu,
            tuCorrect,
            ud,
            udCorrect,
            nos,
            nosCorrect,
            vos,
            vosCorrect,
            uds,
            udsCorrect
        } = this.state;
        return (
            <div>
                <div>{ tense }</div>
                <div>
                    <div>
                        <label>yo</label>
                        <input 
                            name='yo'
                            style={{
                                border: '1px solid',
                                borderColor: yoCorrect ? 'green' : 'gray'
                            }}
                            onChange={ this._inputChange }
                            value={ yo }
                        />
                    </div>
                    <div>
                        <label>tu</label>
                        <input name='tu' />
                    </div>
                    <div>
                        <label>el/ellas/Ud</label>
                        <input name='ud' />
                    </div>
                    <div>
                        <label>nos.</label>
                        <input name='nos' />
                    </div>
                    <div>
                        <label>vos</label>
                        <input name='vos' />
                    </div>
                    <div>
                        <label>Uds.</label>
                        <input name='uds' />
                    </div>
                </div>
            </div>
        )
    }
}