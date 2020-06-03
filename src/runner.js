'use babel';

import execa from 'execa';
import Promise from 'bluebird';

Promise.config({
  cancellation: true,
});

export function generateBase64Url(program, code) {
  return new Promise((resolve, reject, onCancel) => {
    try {
      const imageFormat = inkdrop.config.get('graphviz.imageFormat');

      const proc = execa(program, [`-T${imageFormat.toLowerCase()}`]);

      let canceled = false;

      onCancel(() => {
        canceled = true;
        proc.kill();
      });

      process.nextTick(() => {
        proc.stdin.write(code);
        proc.stdin.end();
      });

      proc.catch(() => {});

      proc.on('error', err => {
        if (err.code === 'ENOENT') {
          const message = `Please make sure ${program} is available on your PATH.`;
          reject(new Error(message));
        } else {
          reject(err);
        }
      });

      const stdoutChunks = [];
      const stderrChunks = [];

      proc.stdout.on('data', chunk => stdoutChunks.push(chunk));
      proc.stderr.on('data', chunk => stderrChunks.push(chunk));

      proc.on('exit', exitCode => {
        if (canceled) {
          return;
        }

        const stdoutBuffer = Buffer.concat(stdoutChunks);
        const stderrBuffer = Buffer.concat(stderrChunks);

        if (exitCode === 0) {
          if (imageFormat === 'PNG') {
            resolve('data:image/png;base64,' + stdoutBuffer.toString('base64'));
          } else {
            const svg = stdoutBuffer.toString().trim();
            resolve(svg.substr(svg.indexOf('<svg')));
          }
        } else {
          reject(new Error(stderrBuffer.toString()));
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}
