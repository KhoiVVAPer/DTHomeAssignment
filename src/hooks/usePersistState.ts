import {useState, useEffect} from 'react';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

export const usePersistState = (storageKey: string, initialState: any) => {
  const [state, setInternalState] = useState(initialState);

  useEffect(() => {
    const storedValue = storage.getString(storageKey);
    setInternalState(storedValue ? JSON.parse(storedValue) : initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setState = (newState: any) => {
    console.log('setState -> data', storageKey, newState, typeof newState);
    if (
      typeof newState === 'boolean' ||
      typeof newState === 'number' ||
      typeof newState === 'object' ||
      typeof newState === 'string'
    ) {
      storage.set(
        storageKey,
        JSON.stringify(
          typeof newState === 'boolean' ? `${newState}` : newState,
        ),
      );
      setInternalState(newState);
    }
  };

  return [state, setState];
};
