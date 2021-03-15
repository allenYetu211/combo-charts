/*
 * @Description: 函数 state
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-15 10:54:27
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-15 11:26:03
 */

import { useCallback, useState } from 'react';

export interface SetFunctionStateAction<FS> {
  (fn: FS): void;
}

export function useFunctionState<FS = undefined>(): [
  FS | undefined,
  SetFunctionStateAction<FS | undefined>
];

export function useFunctionState<FS>(
  initialState: FS
): [FS, SetFunctionStateAction<FS>];

export function useFunctionState<FS>(
  initialState?: FS
): [FS | undefined, SetFunctionStateAction<FS | undefined>] {
  const [fn, setFn] = useState<FS | undefined>(initialState);

  const setFnCallback = useCallback<SetFunctionStateAction<FS | undefined>>(
    (fn) => {
      setFn(() => fn);
    },
    []
  );

  return [fn, setFnCallback];
}
