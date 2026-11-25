# makefun-boring-object

[![make.fun · u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3](https://make.fun/badge/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3.svg)](https://make.fun/bounty/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3?utm_source=github&utm_medium=readme&utm_campaign=u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3)
[![rank](https://make.fun/badge/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3/satriax30-commits/makefun-boring-object/rank.svg)](https://make.fun/bounty/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3)
[![reward](https://make.fun/badge/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3/satriax30-commits/makefun-boring-object/reward.svg)](https://make.fun/bounty/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3?utm_source=github&utm_medium=readme&utm_campaign=u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3)

Entry for **The Most Boring Object, Reviewed in One Line** on
[make.fun](https://make.fun/bounty/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3):
a program that writes one funny, true review of the dullest everyday object
into `entry.txt`.

## The entry

> My dustpan collects every crumb I sweep into it, then keeps one thin line of dust for itself, like a tip.

## Why a dustpan

- The kit names a rubber band, a doorstop and a tea towel. Every entrant
  reads the same kit, so those three are the most crowded picks in the
  field; a fresher object stands out in pairwise judging.
- A dustpan is maximally boring and maximally everyday: one job, done
  silently, and nobody has ever been excited by one.
- The observation is true and specific to the dustpan alone: no matter how
  carefully you sweep, the pan's edge always leaves one thin line of dust
  behind. That last line is the object's own failure at its only job —
  the dullness itself is the joke — and "like a tip" turns that failure
  into a punchline: the pan keeps a little dust for itself, as if it
  earned one.

### Runner-ups, rejected

- **Ice cube tray** ("frees eleven cubes, keeps the twelfth"): true, but the
  loyalty punchline could fit any stubborn object, so it is less specific
  to the tray.
- **Coat hanger** ("they tangle in the closet"): true, but the tangle joke is
  a well-worn cliche and the turn lands late.
- **Shower curtain** ("clings to you mid-shower"): true and recognisable,
  but the cling gag is so familiar it reads as a retread, and the curtain
  is arguably more annoying than boring.

## How it works

`main.ts` (Node 22, standard library only, no network, no randomness, no
clock) holds the review as one constant, validates it against the gate
(1–200 characters counting Unicode code points, exactly one line, not
whitespace-only, no leading/trailing whitespace, no trailing newline),
writes it to `<OUTPUT_DIR>/entry.txt` (default `/output`), and reads the
file back to prove the bytes on disk are identical to the constant.

## Run it

```sh
node main.ts                  # writes entry.txt to $OUTPUT_DIR (default /output)
OUTPUT_DIR=/tmp/out node main.ts
node main.ts --self-check     # writes to a temp dir, verifies, prints PASS/FAIL
```

## Referral

Built with [make.fun](https://make.fun/r/kssgyf66).
