# Introduction

This script scrapes a [Mandarin Frequency List](https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists). The `json` output will be generated in the `./out` directory. This location is wiped out and regenerated with each run.

# How to run

1. Install the latest `nodejs` installation.
2. Run `npm install` to install dependencies.
3. Run `npm start` to generate the output `json` files in `./out`.

# JSON file format

The `json` output is organized in a way that can easily by converted to another format, such as `csv` and imported directly into [Anki](https://apps.ankiweb.net/).

```yaml
[
  {
    "hanzi": "有",
    "pinyin": "yǒu",
    "definition": "have, possess"
  },
  {
    "hanzi": "个",
    "pinyin": "gè",
    "definition": "piece, item gè"
  },
  // ...
  {
    "hanzi": "我",
    "pinyin": "wǒ",
    "definition": "I, me, ego, self wǒ"
  },
  {
    "hanzi": "不",
    "pinyin": "bù",
    "definition": "non, do not, no, nowise, not, nope, nae, no more, nix bù"
  }
]
```
