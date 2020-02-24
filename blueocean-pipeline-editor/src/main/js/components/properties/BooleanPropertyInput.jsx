import React from 'react';
import { Checkbox } from '@jenkins-cd/design-language';
import { getArg, setArg } from '../../services/PipelineMetadataService';

export default class BooleanPropertyInput extends React.Component {
    render() {
        var p = this.props.type;
        var title = p.capitalizedName;
        if(p.displayName) {
            title = p.displayName;
        }
        title += (p.isRequired ? '*' : '');
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
                <div className="help-tip">
                    <p>{ p.description }</p>
                </div>
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
