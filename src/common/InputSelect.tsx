export interface InputSelectProps {
  label: string;
  name: string;
  onValueChange: (value: string | undefined) => void;
  value: string | undefined;
  options: { label: string; value: string }[];
}

export function InputSelect({
  label,
  name,
  onValueChange,
  value,
  options,
}: InputSelectProps) {
  return (
    <label className="form-field">
      <span className="form-field-label">{label}</span>
      <select
        className="form-field-select"
        name={name}
        value={value ?? ""}
        onChange={(e) => {
          onValueChange(e.currentTarget.value || undefined);
        }}
      >
        <option></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
