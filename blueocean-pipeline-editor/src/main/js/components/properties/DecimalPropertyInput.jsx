import React from 'react';
import { FormElement } from '@jenkins-cd/design-language';
import { getArg, setArg } from '../../services/PipelineMetadataService';

export default class DecimalPropertyInput extends React.Component {
    render() {
        const { type: p, step } = this.props;
        var title = p.capitalizedName;
        if(p.displayName) {
            title = p.displayName;
        }
        title += (p.isRequired ? '*' : '');
        return (
            <FormElement
                title={title}
                errorMessage={!step.pristine && p.isRequired && !getArg(step, p.name).value && p.capitalizedName + ' is required'}
            >
                <div className="TextInput">
                    <input
                        type="number"
                        className="TextInput-control"
                        defaultValue={getArg(this.props.step, this.props.propName).value}
                        onChange={e => {
                            setArg(this.props.step, this.props.propName, parseFloat(e.target.value));
                            this.props.onChange(this.props.step);
                        }}
                    />
                </div>
                <div className="help-tip">
                    <p>{ p.description }</p>
                </div>
            </FormElement>
        );
    }
}

DecimalPropertyInput.propTypes = {
    propName: React.PropTypes.string,
    step: React.PropTypes.any,
    onChange: React.PropTypes.func,
};

DecimalPropertyInput.dataTypes = ['float', 'double', 'java.lang.Float', 'java.lang.Double', 'java.math.BigDecimal'];
