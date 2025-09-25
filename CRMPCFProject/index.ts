import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class CRMPCFProject implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _inputElement: HTMLInputElement;
    private _toggleButton: HTMLButtonElement;
    private _value: string | null = null;
    private _masked = true;

    private _notifyOutputChanged: () => void;

    /**
     * Init method
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ) {
        this._notifyOutputChanged = notifyOutputChanged;

        this._container = document.createElement("div");
        this._container.classList.add("pcf-container");

        // Input element
        this._inputElement = document.createElement("input");
        this._inputElement.type = "text";
        this._inputElement.classList.add("pcf-input");
        this._inputElement.readOnly = true; // default: not editable
        this._inputElement.addEventListener("input", () => {
            this._value = this._inputElement.value;
            this._notifyOutputChanged();
        });
        this._container.appendChild(this._inputElement);

        // Toggle button
        this._toggleButton = document.createElement("button");
        this._toggleButton.classList.add("pcf-toggle-btn");
        this._toggleButton.innerHTML = "👁️"; // default eye
        this._toggleButton.addEventListener("click", () => {
            this._masked = !this._masked;
            this.updateDisplay();
        });
        this._container.appendChild(this._toggleButton);

        container.appendChild(this._container);
    }

    /**
     * Update view
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._value = context.parameters.sampleProperty.raw ?? "";
        this.updateDisplay();
    }

    /**
     * Update display based on masked state
     */
    private updateDisplay(): void {
        if (this._masked) {
            // Masked → stars only, field readonly
            this._inputElement.value = this._value ? this._value.replace(/./g, "*") : "";
            this._inputElement.readOnly = true;
            this._toggleButton.innerHTML = "👁️";
        } else {
            // Unmasked → real value, field editable
            this._inputElement.value = this._value ?? "";
            this._inputElement.readOnly = false;
            this._toggleButton.innerHTML = "🙈";
        }
    }

    /**
     * Outputs
     */
    public getOutputs(): IOutputs {
        return {
            sampleProperty: this._inputElement.readOnly ? this._value ?? "" : this._inputElement.value
        };
    }

    /**
     * Destroy
     */
    public destroy(): void {
        // Cleanup if needed
    }
}
