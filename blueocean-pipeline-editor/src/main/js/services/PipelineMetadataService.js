import { Fetch, UrlConfig } from '@jenkins-cd/blueocean-core-js';

export function getArg(step, name, isLiteral = true) {
    if (step.data && step.data[name]) {
        return step.data[name];
    }
    return {
        isLiteral,
        value: '',
    };
}

export function setArg(step, name, value, isLiteral = true) {
    if (step.data && step.data[name]) {
        step.data[name].value = value;
        if (arguments.length > 3) {
            step.data[name].isLiteral = isLiteral;
        }
    } else {
        step.data[name] = {
            isLiteral,
            value,
        };
    }
}

export function setDefaultArg(step, name, value, isLiteral = true) {
    if (step.data && !step.data[name]) {
        step.data[name] = {
            isLiteral,
            value,
        };
    }
}

class PipelineMetadataService {
    cache: object = {};

    /**
     * Caches locally
     */
    _fetch(method, handler, mapper) {
        if (this.cache[method]) {
            handler(this.cache[method]);
            return;
        }
        Fetch.fetchJSON(`${UrlConfig.getBlueOceanAppURL()}/rest/pipeline-metadata/${method}?depth=20`).then(data => {
            if (mapper) {
                data = mapper(data);
            }
            this.cache[method] = data;
            handler(this.cache[method]);
        });
    }

    getStepListing(handler) {
        this._fetch('pipelineStepMetadata', handler, data => {
            const mapped = this.mapStepListing(data);
            mapped.find = step => mapped.filter(md => md.functionName === step.name)[0];
            return mapped;
        });
    }

    mapStepListing(steps) {
        return steps.map(step => {
            // script metadata is busted
            if (step.functionName === 'script') {
                step.isBlockContainer = false;
                step.parameters.push({
                    name: 'scriptBlock',
                    type: 'java.lang.String',
                    isRequired: true,
                });
            }
            return step;
        });
    }

    getAgentListing(handler) {
        this._fetch('agentMetadata', data => handler(data));
    }
}

const pipelineMetadataService = new PipelineMetadataService();

export default pipelineMetadataService;
