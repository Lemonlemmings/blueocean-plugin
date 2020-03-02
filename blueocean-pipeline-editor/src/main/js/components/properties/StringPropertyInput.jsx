import React from 'react';
import { FormElement, TextInput } from '@jenkins-cd/design-language';
import { getArg, setArg, setDefaultArg } from '../../services/PipelineMetadataService';

export default class StringPropertyInput extends React.Component {
    render() {
        const { type: p, step } = this.props;
        var title = p.capitalizedName;
        if(p.displayName) {
            title = p.displayName;
        }
        title += (p.isRequired ? '*' : '');

        let descriptionElement;
        if(p.description) {
            descriptionElement = <div className="help-tip"><p>{ p.description }</p></div>;
        }

        if(p.defaultValue) {
            setDefaultArg(step, this.props.propName, p.defaultValue);
        }

        return (
            <FormElement
                title={title}
                errorMessage={!step.pristine && p.isRequired && !getArg(step, p.name).value && p.capitalizedName + ' is required'}
            >
                <TextInput
                    defaultValue={getArg(step, this.props.propName).value}
                    onChange={val => {
                        setArg(step, this.props.propName, val);
                        this.props.onChange(step);
                    }}
                />
                {descriptionElement}
            </FormElement>
        );
    }
}

StringPropertyInput.propTypes = {
    propName: React.PropTypes.string,
    step: React.PropTypes.any,
    onChange: React.PropTypes.func,
    type: React.PropTypes.any,
};

StringPropertyInput.dataTypes = ['java.lang.String'];
