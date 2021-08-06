// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { PageConfig, URLExt } from '@jupyterlab/coreutils';

import { JupyterLiteServer, JupyterLiteServerPlugin } from '@jupyterlite/server';

import { IKernel, IKernelSpecs } from '@jupyterlite/kernel';

import { RoboliteKernel } from '@jupyterlite/robolite-kernel';

/**
 * The default CDN fallback for Pyodide
 */
const PYODIDE_CDN_URL = 'https://cdn.jsdelivr.net/pyodide/v0.17.0/full/pyodide.js';

/**
 * A plugin to register the Robot Framework kernel.
 */
const kernel: JupyterLiteServerPlugin<void> = {
  id: '@jupyterlite/robolite-kernel-extension:kernel',
  autoStart: true,
  requires: [IKernelSpecs],
  activate: (app: JupyterLiteServer, kernelspecs: IKernelSpecs) => {
    const url = PageConfig.getOption('pyodideUrl') || PYODIDE_CDN_URL;
    const pyodideUrl = URLExt.isLocal(url)
      ? URLExt.join(window.location.origin, url)
      : url;

    kernelspecs.register({
      spec: {
        name: 'Robot Framework',
        display_name: 'Robot Framework',
        language: 'robotframework',
        argv: [],
        spec: {
          argv: [],
          env: {},
          display_name: 'Robot Framework',
          language: 'robotframework',
          interrupt_mode: 'message',
          metadata: {}
        },
        resources: {
          'logo-32x32': 'TODO',
          'logo-64x64': '/kernelspecs/robotframework.png'
        }
      },
      create: async (options: IKernel.IOptions): Promise<IKernel> => {
        return new RoboliteKernel({
          ...options,
          pyodideUrl
        });
      }
    });
  }
};

const plugins: JupyterLiteServerPlugin<any>[] = [kernel];

export default plugins;
