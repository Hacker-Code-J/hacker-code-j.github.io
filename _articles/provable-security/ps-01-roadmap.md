---
title: "Provable Security 01: Roadmap"
layout: page
categories: Cryptography
tags: [provable-security, roadmap, cryptography]
topics: definitions, games, reductions, public-key transforms, implementation limits
short: "A map of the reorganized provable-security sequence."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-01" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / I</p>

# A map of provable security

<p class="ps-deck">The series is organized around the path from security definitions to public-key transforms, then to proof-reading and implementation limits.</p>
</header>

Provable security is not a single theorem and not a single style of argument. It is a discipline for turning a cryptographic claim into an experiment, measuring an adversary's advantage in that experiment, and reducing that advantage to an assumption with an explicit loss.

This reorganized series follows that discipline in layers. The point is to avoid the common failure mode: learning a list of acronyms without seeing how they interact inside a proof.

<div class="ps-env" markdown="1">
<span class="ps-env-title">The chain</span>

A mature security claim has the form

$$
\text{definition}\to\text{game}\to\text{advantage}\to\text{reduction}\to\text{assumption}\to\text{loss}\to\text{deployment condition}.
$$

If any link is missing, the statement is not yet a usable security theorem.
</div>

## Sequence

| Part | Role |
|---|---|
| 01. Roadmap | The shape of the series and the reading order. |
| 02. Games and advantage | How probabilities, query bounds, and concrete security are measured. |
| 03. PRFs, PRPs, OWFs | The primitive assumptions that later proofs reduce to. |
| 04. Encryption definitions | IND-CPA, IND-CCA1, IND-CCA2, non-malleability, and nonce conditions. |
| 05. Reductions | How simulations, hybrids, and bad events form proofs. |
| 06. Random oracles | Lazy sampling, programmability, and the model boundary. |
| 07. RSA and OAEP | Why trapdoor permutations need randomized, checkable encoding. |
| 08. Fujisaki-Okamoto and KEMs | How consistency checks support CCA-secure encapsulation. |
| 09. KEM-DEM | How public-key and symmetric security compose in hybrid encryption. |
| 10. Signatures and MACs | EUF-CMA, signing-oracle simulation, and textbook failures. |
| 11. Reading theorems | A checklist for parsing real provable-security statements. |
| 12. Where proofs stop | Random-oracle idealization, side channels, multi-user loss, and bugs. |

The order matters. Definitions come before examples; reductions come before transforms; model boundaries come after the proof method is visible.

## Source orientation

These notes use Nigel P. Smart, *Cryptography Made Simple* (Springer, 2016), especially Chapter 11, "Defining Security", and Chapter 16, "Public Key Encryption and Signature Algorithms", as the local reference spine. Chapter 11 supplies the language of games, adversarial advantage, PRFs, one-wayness, encryption notions, signatures, bit security, and random oracles. Chapter 16 supplies the public-key constructions and transforms: passively secure encryption, OAEP, Fujisaki-Okamoto, hybrid encryption, KEM construction, signatures, and standard-model alternatives.

The articles are written as original lecture notes rather than chapter summaries. They preserve the mathematical dependencies, but reorganize the material around how a proof is read.

<div class="ps-aside" markdown="1">
<span class="ps-env-title">Working rule</span>

When a theorem says a scheme is secure, immediately ask: secure in which game, against which oracle access, under which assumption, with which loss, and under which implementation conditions?
</div>

<nav class="ps-nav">
  <a class="ps-next" href="/articles/ps-02-games-advantage/"><span>Next</span>Provable Security 02: Games, Advantage, and Concrete Bounds</a>
</nav>

</article>
