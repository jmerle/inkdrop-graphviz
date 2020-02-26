'use babel';

import { markdownRenderer } from 'inkdrop';
import { createComponent } from './factory';

const programs = [
  'dot',
  'neato',
  'fdp',
  'sfdp',
  'twopi',
  'circo',
  'osage',
  'patchwork',
];

export function activate() {
  if (markdownRenderer) {
    for (const program of programs) {
      markdownRenderer.remarkCodeComponents[program] = createComponent(program);
    }
  }
}

export function deactivate() {
  if (markdownRenderer) {
    for (const program of programs) {
      markdownRenderer.remarkCodeComponents[program] = null;
    }
  }
}
