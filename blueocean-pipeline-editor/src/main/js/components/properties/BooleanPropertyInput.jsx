import React from 'react';
import { Checkbox } from '@jenkins-cd/design-language';
import { getArg, setArg, setDefaultArg } from '../../services/PipelineMetadataService';

export default class BooleanPropertyInput extends React.Component {
    render() {
        var p = this.props.type;
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
            if(p.defaultValue == "true" || p.defaultValue == true) {
                console.log("Value: " + p.defaultValue + " Type: " + typeof p.defaultValue);
                p.defaultValue = true;
            }
            else {
                console.log("Value: " + p.defaultValue + " Type: " + typeof p.defaultValue);
                p.defaultValue = false;
            }
            setDefaultArg(this.props.step, this.props.propName, p.defaultValue);
        }

        return (
            <div className="form-container">
                <Checkbox
                    checked={getArg(this.props.step, this.props.propName).value}
                    onToggle={checked => {
                        setArg(this.props.step, this.props.propName, checked);
                        this.props.onChange(this.props.step);
                    }}
                    label={title}
                />
                {descriptionElement}
            </div>
        );
    }
}

BooleanPropertyInput.propTypes = {
    propName: React.PropTypes.string,
    step: React.PropTypes.any,
    onChange: React.PropTypes.func,
};

BooleanPropertyInput.dataTypes = ['boolean', 'java.lang.Boolean'];
