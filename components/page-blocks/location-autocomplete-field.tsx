"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  filterCities,
  formatCityLabel,
  loadCitiesForQuery,
  type CityEntry,
} from "@/lib/city-autocomplete";
import { FieldError, innerFieldClass } from "@/components/page-blocks/block-primitives";
import { cn } from "@/lib/utils";

type LocationAutocompleteFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  required?: boolean;
};

export function LocationAutocompleteField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
}: LocationAutocompleteFieldProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<CityEntry[]>([]);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const latestQueryRef = useRef("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function search(query: string) {
    latestQueryRef.current = query;
    const data = await loadCitiesForQuery(query);
    if (latestQueryRef.current !== query) return;
    const results = filterCities(data, query);
    setSuggestions(results);
    setOpen(results.length > 0);
    setHighlight(-1);
  }

  function select(entry: CityEntry) {
    onChange(formatCityLabel(entry));
    setOpen(false);
    setSuggestions([]);
  }

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(innerFieldClass, error && "border-[#ED7D22]")}
        onChange={(event) => {
          onChange(event.target.value);
          void search(event.target.value);
        }}
        onFocus={() => {
          if (value.trim()) void search(value);
        }}
        onKeyDown={(event) => {
          if (!open || !suggestions.length) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlight((index) => Math.min(index + 1, suggestions.length - 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlight((index) => Math.max(index - 1, 0));
          } else if (event.key === "Enter" && highlight >= 0) {
            event.preventDefault();
            select(suggestions[highlight]);
          } else if (event.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-52 w-full overflow-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map((entry, index) => (
            <li
              key={`${entry.zip}-${entry.city}`}
              role="option"
              aria-selected={index === highlight}
              className={cn(
                "cursor-pointer px-4 py-2.5 text-sm text-slate-700",
                index === highlight && "bg-slate-50"
              )}
              onMouseDown={(event) => {
                event.preventDefault();
                select(entry);
              }}
            >
              {formatCityLabel(entry)}
            </li>
          ))}
        </ul>
      ) : null}
      <FieldError message={error} />
    </div>
  );
}
