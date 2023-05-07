#!/usr/bin/env python
# -*- coding: utf-8 -*-

from json import loads, dumps
from random import choice
from textwrap import shorten

data = []
with open('out/hanzi.1-1000.json', 'r')    as f1000, \
     open('out/hanzi.1001-2000.json', 'r') as f2000, \
     open('out/hanzi.2001-3000.json', 'r') as f3000:
    data += loads(f1000.read()) + loads(f2000.read()) + loads(f3000.read())

wotd = choice(data)

with open('out/wotd.history.json', 'r') as file:
    history = loads(file.read())
    word = [w for w in history if w['hanzi'] == wotd['hanzi']]

with open('out/wotd.history.json', 'w', encoding='utf-8') as file:
    if not word:
        print(f"Adding {wotd['hanzi']} to wotd.history database!")
        file.write(dumps(history + [wotd], ensure_ascii=False, indent=4))

for word in (history + [wotd]):
    definition = shorten(word['definition'], width=50, placeholder="...")
    print(f"{word['hanzi']} ({word['pinyin']}) {definition}")
