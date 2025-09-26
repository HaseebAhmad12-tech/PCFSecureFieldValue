import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class CRMPCFProject implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _inputElement: HTMLInputElement;
    private _toggleButton: HTMLButtonElement;
    private _value = "";
    private _masked = true;
    private _isNewRecord = false;

    private _notifyOutputChanged: () => void;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this._notifyOutputChanged = notifyOutputChanged;

        this._container = document.createElement("div");
        this._container.classList.add("pcf-container");

        // Input
        this._inputElement = document.createElement("input");
        this._inputElement.type = "text";
        this._inputElement.classList.add("pcf-input");
        this._inputElement.addEventListener("input", () => {
            this._value = this._inputElement.value;
            this._notifyOutputChanged();
        });
        this._container.appendChild(this._inputElement);

        // Toggle button
        this._toggleButton = document.createElement("button");
        this._toggleButton.classList.add("pcf-toggle-btn");
        this._toggleButton.innerHTML = "👁️";
        this._toggleButton.addEventListener("click", () => {
            this._masked = !this._masked;
            this.updateDisplay();
        });
        this._container.appendChild(this._toggleButton);

        container.appendChild(this._container);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Keep track of the raw value
    const newValue = context.parameters.sampleProperty.raw ?? "";

    // Detect if this is a brand-new record (never saved before)
    // We can rely on context.mode.isControlDisabled or raw == null (not just empty string)
    this._isNewRecord = context.parameters.sampleProperty.raw === null;

    if (this._isNewRecord) {
        // For new records, stay unmasked and editable while typing
        this._masked = false;
    }

    this._value = newValue;
    this.updateDisplay();
}


    private updateDisplay(): void {
        if (this._masked) {
            // Mask the input field securely
            this._inputElement.value = this._value ? this._value.replace(/./g, "*") : "";
            this._inputElement.readOnly = true;
            this._inputElement.type = "password";
            this._toggleButton.innerHTML = "👁️";
        } else {
            this._inputElement.value = this._value ?? "";
            this._inputElement.readOnly = false;
            this._inputElement.type = "text";
            this._toggleButton.innerHTML = "🙈";
        }
    }

    public getOutputs(): IOutputs {
        return {
            sampleProperty: this._inputElement.value
        };
    }

    public destroy(): void {
        // Cleanup if needed
    }
}
