import type { DeepNamePath, SpecialString } from "lib/types";
import { cn, get } from "lib/utils";
import { ChevronRight } from "lucide-react";
import React, { FC, forwardRef } from "react";

export type DataIndex<T = any> =
  | DeepNamePath<T>
  | SpecialString<T>
  | number
  | (SpecialString<T> | number)[];
export type ExtractValue<T, K> =
  K extends keyof T
    ? T[K]
    : K extends [infer First, ...infer Rest]
      ? First extends keyof T
        ? ExtractValue<T[First], Rest>
        : never
      : K extends `${infer Key}.${infer Rest}`
        ? Key extends keyof T
          ? ExtractValue<T[Key], Rest>
          : never
        : never;

interface DataCardField<RecordType extends object = any> {
  key: DataIndex<RecordType>;
  title: string;
  render?: (
    value: any,
    record: RecordType,
    index: number
  ) => React.ReactNode;
}

interface DataCardProps<RecordType extends object = any> extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  fields: Array<DataCardField<RecordType>>;
  data: RecordType;
  onRowClick?: (
    field: DataIndex<RecordType>,
    value: ExtractValue<RecordType, DataIndex<RecordType>>,
    record: RecordType,
    index: number
  ) => void;
}

const DataCard = <T extends object = any>(props: DataCardProps<T>) => {
  const {
    className,
    children,
    title,
    description,
    fields,
    data,
    onRowClick,
    ...otherProps
  } = props;
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg overflow-hidden",
        className
      )}
      {...otherProps}
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl mb-3 text-gray-800">{title}</h2>
        {description && (
          <p className="text-gray-600 mb-4 text-sm">{description}</p>
        )}
      </div>
      <div className="divide-y divide-gray-200 [&_div]:cursor-pointer">
        {fields.map((field, index) => {
          const { key, title, render } = field;
          let path: string | string[];
          if (Array.isArray(key)) {
            path = key.map(String);
          } else {
            path = String(key);
          }
          // Sử dụng ExtractValue để đảm bảo đúng kiểu value
          const value = get(data, path) as ExtractValue<T, typeof key>;
          return (
            <div
              onClick={() => {
                if (onRowClick) {
                  onRowClick(key, value, data, index);
                }
              }}
              key={String(key)}
              className="px-6 py-4 flex hover:bg-gray-100"
            >
              <div className="w-48 flex-shrink-0">
                <span className="text-gray-600 text-sm font-medium capitalize">
                  {title}
                </span>
              </div>
              <div className="mt-2 sm:mt-0 flex-1">
                {render ? (
                  render(value, data, index)
                ) : (
                  <span className="text-gray-800">{String(value)}</span>
                )}
              </div>
              <div className="mt-2 sm:mt-0">
                <ChevronRight className="text-2xl text-gray-400 ml-auto" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataCard;
