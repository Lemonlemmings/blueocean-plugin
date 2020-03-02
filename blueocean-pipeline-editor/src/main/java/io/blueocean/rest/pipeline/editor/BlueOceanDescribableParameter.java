package io.blueocean.rest.pipeline.editor;

public class BlueOceanDescribableParameter {
    private String nameId;
    private String displayName;
    private String parameterDesc;
    private String defaultValue;

    public BlueOceanDescribableParameter(String nameId, String displayName, String parameterDesc) {
        this(nameId, displayName, parameterDesc, "");
    }

    public BlueOceanDescribableParameter(String nameId, String displayName, String parameterDesc, String defaultValue) {
        this.nameId = nameId;
        this.displayName = displayName;
        this.parameterDesc = parameterDesc;
        this.defaultValue = defaultValue;
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

    public String getDefaultValue() {
        return this.defaultValue;
    }
}
