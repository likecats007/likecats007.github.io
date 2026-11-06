# Daily X security digest setup

The scheduled workflow searches recent public X posts in English and Korean,
checks up to 20 posts total, selects the newest concrete security issue, writes
one Korean sentence with its source link, and commits a Markdown post under
`src/content/blog/` with category `블로그/기술문서`.

## Required GitHub Actions secrets

Add these under **Settings → Secrets and variables → Actions**:

- `X_API_BEARER_TOKEN`: Bearer Token for an approved X Developer App.
- `OPENAI_API_KEY`: OpenAI API key used to produce the Korean one-line summaries.

The workflow uses the repository's built-in `GITHUB_TOKEN` to commit the post and
start the existing Pages deployment workflow. Do not paste API keys into the
repository or into chat.

The OpenAI API is billed separately from a ChatGPT subscription. A project can
use a spending limit to control API usage. The workflow defaults to `gpt-6-luna`;
set the optional Actions variable `OPENAI_MODEL` to use a different API model.

## Schedule and behavior

GitHub Actions starts the job at 10:02 Asia/Seoul and the job waits until a
random time before 11:00 before searching X. If GitHub starts the scheduled job
after 11:00, it searches immediately instead of skipping the run. GitHub can
delay scheduled jobs during periods of high load.

The X recent-search endpoint only covers the recent-post window. This workflow
searches the preceding 24 hours, requests up to 10 posts per language query,
and passes no more than 20 posts to the summarizer. It publishes one summary
per day. If no suitable post is found, it publishes a short note saying so.
Duplicate daily files are skipped. Titles count generated posts from day 1.
Descriptions stay limited to claims present in the source post.

The workflow can also be started from the repository's Actions tab. Manual runs
use a random time through 11:00 KST if started earlier, and run immediately if
started after 11:00.
