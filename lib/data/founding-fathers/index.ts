import { alexanderHamilton } from './alexander-hamilton';
import { benjaminFranklin } from './benjamin-franklin';
import { jamesMadison } from './james-madison';
import { johnJay } from './john-jay';
import { andrewJackson } from './andrew-jackson';
import type { FoundingFather } from './types';

export const foundingFathers: FoundingFather[] = [
  alexanderHamilton,
  benjaminFranklin,
  jamesMadison,
  johnJay,
  andrewJackson
];

export * from './types';