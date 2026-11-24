# Vendored skills: Matt Pocock's skills

These 17 skill folders are copied unchanged from [mattpocock/skills](https://github.com/mattpocock/skills) at commit `59db609eb1e18aaf59b63284d0e52255aff0c63c` (Oct 27, 2026), the same reviewed commit the friday-table repo uses. Codex-only `agents/openai.yaml` files are left out.

They live in this repo, rather than as a user-level plugin, so every Claude Code session that opens BlockBreak gets them, cloud sessions included, and no other project does. They're pinned, so their instructions only change when someone reviews an update.

## What's here

Planning the work:

- **grill-me**, **grilling**: Claude asks hard questions about a plan until it holds up.
- **to-spec**: turns a conversation into a written spec on the issue tracker.
- **to-tickets**: splits a plan into small GitHub issues, each saying what it waits on.
- **triage**: sorts new issues, asks for missing details, and writes a brief an agent can build from.
- **prototype**: a throwaway try-out to answer a design question before building it properly.

Building it:

- **implement**: builds an issue's work.
- **tdd**: writes the test first, watches it fail, then makes it pass.
- **diagnosing-bugs**: a careful loop for bugs that are hard to pin down.
- **codebase-design**, **domain-modeling**: shared words for how the code is split up and what things are called.

Shipping it:

- **pr**: writes a pull request's description.
- **code-review**: reviews a change against this repo's own rules.

Working with Claude:

- **setup-matt-pocock-skills**: run once to tell the skills this repo uses GitHub Issues and which labels mean what.
- **teach**: teaches a concept inside this workspace, one step at a time.
- **handoff**: sums up a session so the next one can pick it up.
- **wait-what**: "that didn't land, explain it again more simply".

Type `/` and the skill's name in a Claude Code session to use one, like `/to-tickets`.

## Notes

- **Updating:** copy the new versions over these folders, review the diff before committing, and update the commit hash above.
- **Name clashes:** `code-review` and `prototype` share names with Claude Code built-ins. If `/code-review` runs the built-in review instead of this one, that's the harness's choice.
- **Left out:** the rest of the upstream set (ask-matt, wayfinder, research, retro, wizard and others) is for larger projects. Copy any of them in the same way if they're wanted later.

## Licence

MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
