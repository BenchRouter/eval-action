import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const EVAL_ACTION_BOOTSTRAP_SHA256 = "51030b0ddeb1aac3f176ee5cd3654184cffd5b7ca79ba093146e53f59e79fef9";
const EVAL_ACTION_TRUST_SHA256 = "53e2748549587d7958e43e3a88cef62cf2ca061454b7ceb204cfb2fe707c7179";
const MESSAGE = "runtime bootstrap/trust changed: bump EVAL_ACTION_BOOTSTRAP_SHA256/TRUST_SHA256 in benchrouter, cli and eval-action together";

const sha256 = (file) => createHash("sha256").update(readFileSync(new URL(`../vendor/${file}`, import.meta.url))).digest("hex");

test("vendor/bootstrap.mjs matches the pinned sha256", () => {
  assert.equal(sha256("bootstrap.mjs"), EVAL_ACTION_BOOTSTRAP_SHA256, MESSAGE);
});

test("vendor/trust.json matches the pinned sha256", () => {
  assert.equal(sha256("trust.json"), EVAL_ACTION_TRUST_SHA256, MESSAGE);
});
