# BenchRouter eval action

Composite GitHub Actions that run BenchRouter evals in your repository.
The workflow file in your repository stays short. BenchRouter ships plumbing fixes here and through the signed runtime.

## Usage

Use two steps in your `.github/workflows/benchrouter-evals.yml`.

```yaml
steps:
  - id: benchrouter_prepare
    uses: BenchRouter/eval-action/prepare@v1
  # Your own setup steps go here. Run them on workflow_dispatch only.
  - id: benchrouter_runtime
    uses: BenchRouter/eval-action@v1
    with:
      node: ${{ steps.benchrouter_prepare.outputs.node }}
    env:
      BENCHROUTER_JOB_CEILING_MIN: "120"
      BENCHROUTER_FETCH_TOKEN: ${{ github.token }}
      BENCHROUTER_KIT_VERSION: "0.1.0"
```

Run `prepare` before your setup steps. It records the Node 24 interpreter before your steps can change `PATH`.
Run the root action after your setup steps.
Env on the calling step, such as secrets and `BENCHROUTER_*`, reaches the runtime.
The BenchRouter CLI generates and upgrades this file for you.

## Security

- The trust root is the vendored Ed25519 public keys in `vendor/trust.json`.
- The bootstrap checks the signed runtime manifest against those keys before it runs the runtime.
- The bootstrap also checks the runtime digest and the revocation status.
- Strict teams pin the action to a full commit SHA, for example `BenchRouter/eval-action@<commit sha>`. Let Dependabot (`github-actions` ecosystem) bump the pin.
- Tags `v*` are protected. Only org admins can create or move them.
- Releases are immutable.

## How BenchRouter releases this

A change to `runtime/bootstrap.mjs` or to the release keys in BenchRouter changes `vendor/bootstrap.mjs` or `vendor/trust.json`.
The sha256 values in `test/parity.test.mjs` must match the same constants in the BenchRouter server and the CLI.
BenchRouter updates all three together, tags a new release, and then moves `v1`.
