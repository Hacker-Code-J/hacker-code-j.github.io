---
title: "Provable Security 10: Signatures, MACs, and Unforgeability"
layout: page
categories: Cryptography
tags: [provable-security, signatures, MACs, EUF-CMA]
topics: EUF-CMA, SUF-CMA, signing oracles, MAC tags, textbook RSA signatures
short: "Authentication games and why algebraic textbook signatures fail."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-10" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / X</p>

# Signatures, MACs, and unforgeability

<p class="ps-deck">Authentication is not confidentiality: the adversary wins by producing a valid object it should not be able to produce.</p>
</header>

Signature and MAC security is expressed as a forgery game. The adversary is allowed to see authentic outputs, often adaptively, and must produce a new valid one.

## EUF-CMA

For a signature scheme

$$
\Sigma=(\mathsf{KeyGen},\mathsf{Sign},\mathsf{Verify}),
$$

existential unforgeability under chosen-message attack gives the adversary signing-oracle access. After queries $$m_1,\ldots,m_q$$, it outputs $$(m^*,\sigma^*)$$ and wins if

$$
\mathsf{Verify}_{pk}(m^*,\sigma^*)=1
\quad\text{and}\quad
m^*\notin\{m_1,\ldots,m_q\}.
$$

Strong unforgeability also treats a new signature on an old message as a forgery.


<div class="ps-env" markdown="1">
<span class="ps-env-title">EUF-CMA game between $$\mathcal C$$ and $$\mathcal A$$</span>

1. $$\mathcal C$$ runs $$(pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda)$$ and sends $$pk$$ to $$\mathcal A$$.
2. $$\mathcal A$$ adaptively queries a signing oracle. On query $$m_i$$, $$\mathcal C$$ returns $$\sigma_i\leftarrow\mathsf{Sign}_{sk}(m_i)$$ and records $$m_i$$.
3. After any number of allowed signing queries, $$\mathcal A$$ outputs $$(m^*,\sigma^*)$$.
4. $$\mathcal A$$ wins if $$\mathsf{Verify}_{pk}(m^*,\sigma^*)=1$$ and $$m^*$$ was never submitted to the signing oracle.

For SUF-CMA, the final pair $$(m^*,\sigma^*)$$ must be new; a new valid signature on an old message also counts as a win.
</div>

## Textbook RSA signatures


<div class="ps-game-diagram" aria-label="EUF-CMA signature game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\((pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda),\quad Q\leftarrow\emptyset\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((pk,\mathcal O_{\mathsf{Sign}})\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(m_i\leftarrow\mathcal A^{\mathcal O_{\mathsf{Sign}}}(pk,\mathsf T_{i-1})\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(m_i\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\sigma_i\leftarrow\mathsf{Sign}_{sk}(m_i),\quad Q\leftarrow Q\cup\{m_i\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(\sigma_i\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\((m^*,\sigma^*)\leftarrow\mathcal A^{\mathcal O_{\mathsf{Sign}}}(pk,\mathsf T_q)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\((m^*,\sigma^*)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{EUF\text{-}CMA}^{\mathcal A}_{\Sigma}(1^\lambda):=\mathbf 1[\mathsf{Verify}_{pk}(m^*,\sigma^*)=1\land m^*\notin Q]\)</span></div>
</div>

Textbook RSA signs by

$$
\sigma=m^d\bmod N.
$$

If $$\sigma_1$$ signs $$m_1$$ and $$\sigma_2$$ signs $$m_2$$, then

$$
(\sigma_1\sigma_2)^e\equiv m_1m_2\pmod N.
$$

This is a valid signature on a related message. In an EUF-CMA attack the related message must also be new, so the attacker chooses queried messages so that $$m_1m_2$$ was not itself submitted to the signing oracle.

## Hash-and-sign proof pressure

Hash-and-sign blocks the direct multiplicative relation by signing an encoded representative such as $$H(m)$$. In the random oracle model, a reduction may program the hash value of the eventual forgery message. But it must still answer signing queries. If it guesses the wrong hash query or the adversary asks for a signature on the programmed point, the simulation may abort.

This is why signature bounds often contain hash-query and signing-query losses.

## MACs

A MAC has a secret key shared by sender and receiver:

$$
\tau\leftarrow\mathsf{Tag}_K(m),
\qquad
\mathsf{Verify}_K(m,\tau)\in\{0,1\}.
$$

A MAC forgery game is analogous to EUF-CMA, but the adversary interacts with tagging and verification oracles under a symmetric key.


<div class="ps-env" markdown="1">
<span class="ps-env-title">MAC unforgeability game</span>

1. $$\mathcal C$$ samples $$K\leftarrow\mathsf{KeyGen}(1^\lambda)$$.
2. $$\mathcal A$$ receives oracle access to $$O_{\mathsf{Tag}}(m)=\mathsf{Tag}_K(m)$$. Some formulations also give a verification oracle.
3. $$\mathcal C$$ records every message submitted to the tag oracle.
4. $$\mathcal A$$ outputs $$(m^*,\tau^*)$$.
5. $$\mathcal A$$ wins if $$\mathsf{Verify}_K(m^*,\tau^*)=1$$ and $$m^*$$ was not previously tagged.

If a verification oracle is present, the game must state whether verification queries on previously tagged messages are ignored, answered, or counted separately. These details affect online guessing bounds.
</div>

<div class="ps-example" markdown="1">


<div class="ps-game-diagram" aria-label="MAC unforgeability game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(K\leftarrow\mathsf{KeyGen}(1^\lambda),\quad Q\leftarrow\emptyset\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((\mathcal O_{\mathsf{Tag}},\mathcal O_{\mathsf{Verify}})\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(m_i\leftarrow\mathcal A^{\mathcal O_{\mathsf{Tag}},\mathcal O_{\mathsf{Verify}}}(\mathsf T_{i-1})\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(m_i\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\tau_i\leftarrow\mathsf{Tag}_{K}(m_i),\quad Q\leftarrow Q\cup\{m_i\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(\tau_i\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\((m^*,\tau^*)\leftarrow\mathcal A^{\mathcal O_{\mathsf{Tag}},\mathcal O_{\mathsf{Verify}}}(\mathsf T_q)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\((m^*,\tau^*)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{UF\text{-}CMA}^{\mathcal A}_{\mathsf{MAC}}(1^\lambda):=\mathbf 1[\mathsf{Verify}_{K}(m^*,\tau^*)=1\land m^*\notin Q]\)</span></div>
</div>
<span class="ps-env-title">Tag length and verification queries</span>

If the only attack is tag guessing and the tag has $$t$$ bits, then $$q_v$$ verification attempts give

$$
\Pr[\mathsf{forge}]\le q_v2^{-t}.
$$

This term is small only relative to the allowed verification budget. Online systems must count failed attempts, not only key length.
</div>

## What to check

For authentication the central questions are: what counts as new, which oracle queries are allowed, whether messages are structured transcripts rather than raw strings, and whether the implementation compares tags and signatures without leaking timing information.

<nav class="ps-nav">
  <a href="/articles/ps-09-kem-dem-hybrid-encryption/"><span>Previous</span>Provable Security 09: KEM-DEM Hybrid Encryption</a>
  <a class="ps-next" href="/articles/ps-11-reading-security-theorems/"><span>Next</span>Provable Security 11: How to Read Security Theorems</a>
</nav>

</article>
