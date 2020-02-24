package io.blueocean.rest.pipeline.editor;

import org.jenkinsci.plugins.workflow.steps.StepDescriptor;

import javax.annotation.Nonnull;
import java.util.ArrayList;
import java.util.List;

public abstract class BlueOceanStepDescriptor extends StepDescriptor {
    private String stepDescription;
    private List<BlueOceanDescribableParameter> parameterList;

    public BlueOceanStepDescriptor() {
        this.parameterList = new ArrayList<>();
    }


    public String getStepDescription() {
        return stepDescription;
    }

    public void setStepDescription(String stepDescription) {
        this.stepDescription = stepDescription;
    }

    public List<BlueOceanDescribableParameter> getParameterList() {
        return parameterList;
    }

    public void setParameterList(@Nonnull List<BlueOceanDescribableParameter> parameterList) {
        this.parameterList = parameterList;
    }

    public void addParameter(@Nonnull BlueOceanDescribableParameter parameter) {
        this.parameterList.add(parameter);
    }
}
