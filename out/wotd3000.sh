#!/usr/bin/env bash

jq ".[`expr $RANDOM % 985`]" hanzi.2001-3000.json

