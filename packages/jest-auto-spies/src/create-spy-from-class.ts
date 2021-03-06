import { Spy } from './auto-spies.types';
import { createFunctionSpy } from './create-function-spy';
import {
  OnlyMethodKeysOf,
  ClassSpyConfiguration,
  createAutoSpyFromClass,
} from '@hirez_io/auto-spies-core';

export { ClassSpyConfiguration } from '@hirez_io/auto-spies-core';

export function createSpyFromClass<T>(
  ObjectClass: { new (...args: any[]): T; [key: string]: any },
  methodsToSpyOnOrConfig?: OnlyMethodKeysOf<T>[] | ClassSpyConfiguration<T>
): Spy<T> {
  const autoSpy = createAutoSpyFromClass(
    ObjectClass,
    createFunctionSpy,
    accessorSpyFactory,
    methodsToSpyOnOrConfig
  );
  return autoSpy as Spy<T>;
}

function accessorSpyFactory(
  autoSpy: any,
  accessorName: string,
  accessorType: 'getter' | 'setter'
): jest.SpyInstance {
  if (accessorType === 'setter') {
    return jest.spyOn(autoSpy, accessorName, 'set');
  }
  return jest.spyOn(autoSpy, accessorName, 'get');
}
