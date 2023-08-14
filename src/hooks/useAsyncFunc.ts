import { useState, useEffect } from "react";

export function useAsyncFunc(asyncFunction, deps) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  useEffect(() => {
    setLoading(true);
    asyncFunction()
      .then(setValue)
      .finally(() => setLoading(false))
  }, deps)

  return { loading, value };

}