import { createSignal, onCleanup, onMount } from "solid-js";
import { Observable } from "rxjs";

export function useObservable<T>(
  observable: Observable<T>,
  initialValue: T
) {
  const [value, setValue] = createSignal<T>(initialValue);

  onMount(() => {
    const subscription = observable.subscribe({
      next: (val) => setValue(() => val),
    });

    onCleanup(() => subscription.unsubscribe());
  });

  return value;
}
