---
layout: page
title: Provable Security in Cryptography
list: 2023.09 - 2023.12 | Provable Security in Cryptography
year: 2023.09 - 2023.12
project: Provable Security in Cryptography
# git: 
short: >-
  I Research on the provable security in cryptography.
tags: [cryptography, provable-security, security-definitions, prg, prf]
---
<link rel="stylesheet" href="/assets/css/custom.css">

This project is a set of lecture-style notes on **provable security**: how we formalize what it means for a cryptographic scheme to be secure, and how we prove (or break) those guarantees using standard reduction techniques.

<!-- > **Materials:** [PDF (research notes)](../assets/pdf/UROP_20192250.pdf) -->

## What this covers

- **One-Time Pad (OTP)** and **Kerckhoffs’ Principle**
- How to write a **security definition**
  - syntax and correctness
  - “real-vs-random” and “left-vs-right” styles
- Core proof tools and concepts
  - **libraries** and **interchangeability**
  - **indistinguishability** and **advantage**
  - **hybrid arguments** and the **bad-event lemma**
- Complexity-theoretic foundations
  - polynomial-time adversaries
  - **negligible functions**
- Pseudorandomness
  - **Pseudorandom Generators (PRG)**: definition, examples, attacks
  - **Pseudo-OTP** and computational one-time secrecy (via PRG security)
  - **Pseudorandom Functions (PRF)**: PRF vs truly random function (RF)

## Highlights

- A structured “game-based / library-based” approach to stating security goals.
- Examples showing how *small design choices* can break pseudorandomness.
- Proof sketches using hybrids to connect a construction’s security to a primitive (e.g., PRG ⇒ pseudo-OTP secrecy).

## How to use

- If you are new to provable security: start from OTP and security definitions, then move to indistinguishability and hybrids.
- If you already know the basics: jump to PRG/PRF definitions and the reduction-style proofs.

## References

- M. Rosulek, *The Joy of Cryptography*
- N. P. Smart, *Cryptography Made Simple*
- J. Katz and Y. Lindell, *Introduction to Modern Cryptography*
