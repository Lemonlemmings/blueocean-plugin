// @flow

import React, { Component, PropTypes } from 'react';
import pipelineMetadataService from '../../services/PipelineMetadataService';
import type { StageInfo, StepInfo } from '../../services/PipelineStore';
import GenericStepEditor from './steps/GenericStepEditor';
import UnknownStepEditor from './steps/UnknownStepEditor';
import { EditorStepList } from './EditorStepList';
import { ValidationMessageList } from './ValidationMessageList';
import { i18nTranslator } from '@jenkins-cd/blueocean-core-js';

const t = i18nTranslator('blueocean-pipeline-editor');

const allStepEditors = [require('./steps/ShellScriptStepEditor').default, require('./steps/PipelineScriptStepEditor').default];

const stepEditorsByName = {};

for (let e of allStepEditors) {
    stepEditorsByName[e.stepType] = e;
}

type Props = {
    stage?: ?StageInfo,
    step?: ?StepInfo,
    onDataChange?: (newValue: any) => void,
    onDragStepBegin?: () => any,
    onDragStepHover?: () => any,
    onDragStepDrop?: () => any,
    onDragStepEnd?: () => any,
};

export class EditorStepDetails extends Component {
    props: Props;

    state: {
        step: string,
        stepMetadata: any,
    };

    static defaultProps = {};

    constructor(props: Props) {
        super(props);
    }

    getTitle() {
        return this.props.step.label;
    }

    componentWillMount() {
        pipelineMetadataService.getStepListing(stepMetadata => {
            this.setState({ stepMetadata: stepMetadata });
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.step !== this.props.step) {
            this.setState({ step: nextProps.step });
        }
    }

    commitValue(step) {
        const { onDataChange } = this.props;
        if (onDataChange) {
            onDataChange(step);
        }
    }

    getStepMetadata(step) {
        const meta = this.state.stepMetadata.filter(md => md.functionName === step.name);
        if (meta && meta.length) {
            return meta[0];
        }
        return null;
    }

    getStepEditor(step) {
        const editor = stepEditorsByName[step.name];
        if (editor) {
            return editor;
        }
        if (!this.state.stepMetadata) {
            return null;
        }

        if (!this.getStepMetadata(step)) {
            return UnknownStepEditor;
        }
        return GenericStepEditor;
    }

    render() {
        const { stage, step } = this.props;

        if (!step) {
            return (
                <div className="editor-step-detail no-step">
                    <p>Select or create a step</p>
                </div>
            );
        }

        const StepEditor = this.getStepEditor(step);
        const stepMetadata = this.getStepMetadata(step);

        let stepDescriptionElement = null;
        if(stepMetadata.stepDescription) {
            stepDescriptionElement = <p className="step-description">{stepMetadata.stepDescription}</p>;
        }

        return (
            <div>
                {stepDescriptionElement}
                <div className="editor-step-detail editor-config-panel">
                    <section>
                        <ValidationMessageList node={step} />
                        <StepEditor key={step.id} onChange={step => this.commitValue(step)} step={step} />
                    </section>
                    {step.isContainer && (
                        <section>
                            <h5>{t('editor.jenkins.pipeline.step.substep', { default: 'Child steps' })}</h5>
                            <EditorStepList
                                stage={stage}
                                steps={step.children}
                                parent={step}
                                onAddStepClick={() => this.props.openSelectStepDialog(step)}
                                onStepSelected={step => this.props.selectedStepChanged(step)}
                                onDragStepBegin={this.props.onDragStepBegin}
                                onDragStepHover={this.props.onDragStepHover}
                                onDragStepDrop={this.props.onDragStepDrop}
                                onDragStepEnd={this.props.onDragStepEnd}
                            />
                        </section>
                    )}
                </div>
            </div>
        );
    }
}
