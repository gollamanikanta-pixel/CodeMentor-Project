import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  /** Small badge/count shown after the label, e.g. an error count. */
  meta?: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Accessible name for the tablist, e.g. "Console" or "Analysis". */
  label: string;
}

export function Tabs({ items, value, onChange, label }: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [focusIndex, setFocusIndex] = useState(() => items.findIndex((item) => item.id === value));

  function focusTabAt(index: number) {
    const wrapped = (index + items.length) % items.length;
    setFocusIndex(wrapped);
    const item = items[wrapped];
    tabRefs.current[item.id]?.focus();
    onChange(item.id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTabAt(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTabAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTabAt(0);
        break;
      case "End":
        event.preventDefault();
        focusTabAt(items.length - 1);
        break;
      default:
        break;
    }
  }

  const activeItem = items.find((item) => item.id === value) ?? items[0];

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-border">
        {items.map((item, index) => {
          const isActive = item.id === value;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={index === focusIndex ? 0 : -1}
              onClick={() => {
                setFocusIndex(index);
                onChange(item.id);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-accent text-text"
                  : "border-transparent text-text-soft hover:text-text"
              }`}
            >
              {item.label}
              {item.meta}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeItem.id}
        >
          {item.id === activeItem.id && item.content}
        </div>
      ))}
    </div>
  );
}
