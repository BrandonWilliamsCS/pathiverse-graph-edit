export interface InputFieldProps {
  label: string;
  name: string;
  onValueChange: (value: string | undefined) => void;
  value: string | undefined;
}

export function InputField({
  label,
  name,
  onValueChange,
  value,
}: InputFieldProps) {
  return (
    <label className="form-field">
      <span className="form-field-label">{label}</span>
      <input
        className="form-field-input"
        name={name}
        value={value ?? ""}
        onChange={(e) => {
          onValueChange(e.currentTarget.value || undefined);
        }}
      />
    </label>
  );
}
