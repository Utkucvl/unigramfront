import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import moment from "moment";

const WuiInput = ({ control, register, name, defaultValue, rules, errors, placeholder }) => {
  const isDateField = name === "givenDate"; // Kontrol edilen alanın 'givenDate' olup olmadığını kontrol eder

  return (
    <>
      {isDateField ? ( // Eğer alan 'givenDate' ise
        <Controller
          control={control}
          {...register(name)}
          name={name}
          defaultValue={defaultValue ? moment(defaultValue) : null}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              style={{ width: "15%" }}
              placeholder={placeholder}
              format="YYYY-MM-DD"
              {...field}
            />
          )}
        />
      ) : (
        // 'givenDate' değilse, standart bir input alanı render edilir
        <Controller
          control={control}
          {...register(name)}
          name={name}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <input
              placeholder={placeholder}
              {...field}
            />
          )}
        />
      )}
      {errors && errors[name] && (
        <span>
          <ExclamationCircleOutlined style={{ color: "red" }} />
          <span style={{ color: "red", marginLeft: "5px" }}>
            This field is required
          </span>
        </span>
      )}
    </>
  );
};

export default WuiInput;
