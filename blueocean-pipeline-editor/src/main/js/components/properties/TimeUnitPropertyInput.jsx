import React from 'react';
import { Dropdown } from '@jenkins-cd/design-language';
import { getArg, setArg } from '../../services/PipelineMetadataService';

const timeUnits = ['SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'NANOSECONDS', 'MICROSECONDS', 'MILLISECONDS'];

export default class TimeUnitPropertyInput extends React.Component {
    render() {
        const { step, type, onChange, propName } = this.props;
        var p = type;
        var title = p.capitalizedName;
        if(p.displayName) {
            title = p.displayName;
        }
        title += (p.isRequired ? '*' : '');
        return (
            <div>
                <label className="form-label">{title}</label>
                <Dropdown
                    options={timeUnits}
                    defaultOption={getArg(step, propName).value || timeUnits[0]}
                    onChange={timeUnit => {
                        setArg(step, propName, timeUnit);
                        onChange(step);
                    }}
                />
                <div className="help-tip">
                    <p>{ p.description }</p>
                </div>
            </div>
        );
    }
}

TimeUnitPropertyInput.propTypes = {
    propName: React.PropTypes.string,
    step: React.PropTypes.any,
    onChange: React.PropTypes.func,
    type: React.PropTypes.any,
};

TimeUnitPropertyInput.dataTypes = ['java.util.concurrent.TimeUnit'];
