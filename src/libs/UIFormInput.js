import React from "react";
import { Controller } from "react-hook-form";
import { Input, Form, Radio } from "antd";

const styles = {
  label: {
    fontWeight: "bold",
    display: "inline-block",
    marginBottom: 8,
    fontFamily: "Outfit, sans-serif",
  },
  error: {
    color: "red",
    marginTop: 4,
    display: "block",
  },
  input: {
    borderRadius: 4,
    "::placeholder": {
      color: "red", // Placeholder rengini kırmızı yap
    },
  },
  formItem: {
    marginBottom: 24,
    width: "400px",
  },
};

const UIFormInput = ({
  name,
  control,
  errors,
  options,
  label,
  placeholder,
  type = "text",
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Form.Item
        //label={<span style={styles.label}>{label}</span>}
        validateStatus={errors[name] ? "error" : ""}
        help={
          errors[name] ? (
            <span style={styles.error}>{errors[name].message}</span>
          ) : null
        }
        style={styles.formItem}
      >
        {type === "password" ? (
          <Input.Password
            {...field}
            placeholder={placeholder}
            style={styles.input}
          />
        ) : type === "checkbox" ? (
          <Radio.Group {...field} options={options}></Radio.Group>
        ) : (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className="input-placeholder-red" // Bu sınıfı ekleyin
            style={styles.input}
          />
        )}
      </Form.Item>
    )}
  />
);

export default UIFormInput;
