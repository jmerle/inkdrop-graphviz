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

export const config = {
  imageFormat: {
    title: 'Image format',
    type: 'string',
    enum: ['PNG', 'SVG'],
    default: 'PNG',
  },
};

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
