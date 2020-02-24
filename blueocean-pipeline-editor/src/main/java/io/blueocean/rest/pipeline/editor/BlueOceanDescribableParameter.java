package io.blueocean.rest.pipeline.editor;

public class BlueOceanDescribableParameter {
    private String nameId;
    private String displayName;
    private String parameterDesc;

    public BlueOceanDescribableParameter(String nameId, String displayName, String parameterDesc) {
        this.nameId = nameId;
        this.displayName = displayName;
        this.parameterDesc = parameterDesc;
    }

    public String getNameId() {
        return nameId;
    }

    public String getDisplayName() {
        return displayName;
    }


    public String getParameterDesc() {
        return this.parameterDesc;
    }
}
