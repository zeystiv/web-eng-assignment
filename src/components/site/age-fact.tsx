"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PROGRESS_LINES = [
  "Requesting database access...",
  "Scanning global age registry...",
  "Cross-referencing birth records...",
  "Consulting several servers...",
  "Verifying with the council of elders...",
  "Finding the best result...",
];

const LINE_DELAY = 1300;
const RESULT_DELAY = 1000;

export function AgeFact() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const [result, setResult] = useState<{
    age: number;
    elapsed: number;
  } | null>(null);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  function schedule(fn: () => void, delay: number) {
    timersRef.current.push(setTimeout(fn, delay));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const age = Number(value);
    if (value.trim() === "" || !Number.isFinite(age) || age <= 0 || age > 130) {
      setError("Enter a real age first");
      return;
    }

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setError(null);
    setRunning(true);
    setHasRun(true);
    setResult(null);
    setActiveLine(0);

    const start = Date.now();

    PROGRESS_LINES.forEach((_, i) => {
      schedule(() => setActiveLine(i), i * LINE_DELAY);
    });
    schedule(() => {
      setResult({ age, elapsed: (Date.now() - start) / 1000 });
      setRunning(false);
    }, (PROGRESS_LINES.length - 1) * LINE_DELAY + RESULT_DELAY);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    if (error) setError(null);
  }

  const activeText =
    activeLine !== null && activeLine < PROGRESS_LINES.length
      ? PROGRESS_LINES[activeLine]
      : null;

  return (
    <div className="rounded-[20px] border border-border-default bg-surface/50 p-6 sm:p-7">
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="age-input"
          className="font-reading text-sm leading-relaxed text-ink-soft"
        >
          Enter your age to get some info!
        </label>
        <div className="mt-3 flex gap-3">
          <Input
            id="age-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={130}
            placeholder="Your age"
            value={value}
            onChange={handleChange}
            disabled={running}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "age-error" : undefined}
            className={
              error
                ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/40"
                : undefined
            }
          />
          <Button type="submit" variant="primary" size="md" disabled={running}>
            Find out
          </Button>
        </div>
        {error && (
          <p id="age-error" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </form>

      {hasRun && activeText && (
        <div className="mt-6 h-5 overflow-hidden">
          <p
            key={activeLine}
            className="animate-in fade-in animation-duration-300 font-mono text-xs text-muted"
          >
            {activeText}
          </p>
        </div>
      )}

      {hasRun && (
        <div className="mt-4 min-h-[7.5rem]">
          {result && (
            <div className="animate-in fade-in animation-duration-500 rounded-[20px] border border-border-default bg-parchment p-6">
              <div className="text-xs font-medium text-muted">
                Info found
              </div>
              <div className="mt-1 font-reading text-xl font-bold text-ink">
                You are {result.age} years old.
              </div>
              <div className="mt-2 text-xs text-muted">
                This took {result.elapsed.toFixed(1)} seconds and several
                imaginary servers.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
