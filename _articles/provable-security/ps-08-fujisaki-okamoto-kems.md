---
title: "Provable Security 08: Fujisaki-Okamoto and KEMs"
layout: page
categories: Cryptography
tags: [provable-security, fujisaki-okamoto, KEM, CCA-security]
topics: FO transform, decapsulation consistency, KEM security, post-quantum proof anatomy
short: "How consistency checks turn weak public-key encryption structure into CCA-oriented KEMs."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-08" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / VIII</p>

# Fujisaki-Okamoto and KEMs

<p class="ps-deck">The Fujisaki-Okamoto idea makes encryption randomness recoverable and checkable, which is exactly what CCA simulations need.</p>
</header>

The Fujisaki-Okamoto transform addresses a recurring problem: a reduction facing a decryption or decapsulation query may not know the secret key, but it still has to answer consistently. The transform arranges that honestly generated ciphertexts can be recognized by recomputation.

## Basic idea

Start with randomized public-key encryption

$$
E_{pk}(m;r).
$$

The FO transform should not be read as deterministically encrypting an externally supplied low-entropy message. For encryption, one first augments the message with fresh hidden randomness, say $$\mu=m\,\|\,\rho$$; for a KEM, $$\mu$$ is itself sampled as the encapsulated secret material. The encryption coins are then derived from that secret material:

$$
r=H(\mu),
\qquad c=E_{pk}(\mu;H(\mu)).
$$

Decapsulation or decryption recovers $$\mu^{\prime}$$, recomputes $$E_{pk}(\mu^{\prime};H(\mu^{\prime}))$$, and accepts only if the recomputed ciphertext equals the received ciphertext. The user message, if any, is then parsed from $$\mu^{\prime}$$.

<div class="ps-example" markdown="1">
<span class="ps-env-title">Why the check matters</span>

Without the check, malformed ciphertexts can become probes. With the check, a ciphertext that could not have been honestly generated is rejected before its malformed structure leaks useful information.
</div>

## KEM view

A key encapsulation mechanism has

$$
\mathsf{KeyGen},\quad \mathsf{Encaps},\quad \mathsf{Decaps}.
$$

The security game asks whether the challenge encapsulated key is real or random, usually with decapsulation-oracle access excluding the challenge ciphertext.


<div class="ps-env" markdown="1">
<span class="ps-env-title">IND-CCA KEM game</span>

1. $$\mathcal C$$ runs $$(pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda)$$ and sends $$pk$$ to $$\mathcal A$$.
2. $$\mathcal A$$ may query a decapsulation oracle $$O_{\mathsf{Decaps}}(c)=\mathsf{Decaps}_{sk}(c)$$.
3. $$\mathcal C$$ computes $$(c^*,K_0)\leftarrow\mathsf{Encaps}_{pk}()$$ and samples an independent random key $$K_1$$ from the KEM key space.
4. $$\mathcal C$$ samples $$b\leftarrow\{0,1\}$$ and sends $$(c^*,K_b)$$ to $$\mathcal A$$.
5. $$\mathcal A$$ continues to query $$O_{\mathsf{Decaps}}$$, except it may not query $$c^*$$.
6. $$\mathcal A$$ outputs $$b'$$ and wins if $$b'=b$$. Here $$b=0$$ denotes the real encapsulated key and $$b=1$$ denotes the random-key branch; some texts reverse these labels.

The transform proof must simulate the decapsulation oracle without turning malformed ciphertexts into an information channel.
</div>

In FO-style KEMs, decapsulation often follows the pattern:


<div class="ps-game-diagram" aria-label="IND-CCA KEM game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\((pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda),\quad \mathcal O_{\mathsf{Decaps}}(c):=\mathsf{Decaps}_{sk}(c)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((pk,\mathcal O_{\mathsf{Decaps}})\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(c_i\leftarrow\mathcal A_1^{\mathcal O_{\mathsf{Decaps}}}(pk,\mathsf T_{i-1})\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(c_i\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(K_i:=\mathcal O_{\mathsf{Decaps}}(c_i),\quad \mathsf T_i:=\mathsf T_{i-1}\cup\{(c_i,K_i)\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(K_i\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\((c^*,K_0)\leftarrow\mathsf{Encaps}_{pk}(),\ K_1\leftarrow\mathcal K,\ b\leftarrow\{0,1\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((c^*,K_b)\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(c_j\leftarrow\mathcal A_2^{\mathcal O_{\mathsf{Decaps}}}(\mathsf T,c^*,K_b),\quad c_j\ne c^*\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(c_j\ne c^*\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(K_j:=\mathcal O_{\mathsf{Decaps}}(c_j)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(K_j\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(b^{\prime}\leftarrow\mathcal A_3(\mathsf T,c^*,K_b)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(b^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{IND\text{-}CCA}^{\mathcal A}_{\mathsf{KEM}}(1^\lambda):=\mathbf 1[b^{\prime}=b]\)</span></div>
</div>

1. recover candidate secret material;
2. rederive coins and keys by hashing;
3. recompute the ciphertext or a verification value;
4. output the real derived key if consistent;
5. otherwise output rejection or a pseudorandom fallback, depending on the design.

## Proof terms

A schematic CCA bound may have the form

$$
\operatorname{Adv}^{\mathsf{cca}}_{\mathsf{KEM}}(A)
\le
\operatorname{Adv}^{\mathsf{assump}}(B)
+\Pr[\mathsf{decapsulation\ failure}]
+\frac{q_H+q_D}{2^{\kappa}}
+\varepsilon_{\mathsf{sim}}.
$$

The terms have different meanings. The assumption term is the hard-problem reduction. The failure term is correctness risk. The hash-query term is usually a guessing or collision term. The simulation term covers statistical distance introduced by replacing real distributions with ideal ones.

## Post-quantum relevance

Modern lattice KEMs use FO-style logic because the underlying encryption may have a small correctness-failure probability and because CCA security is needed in real protocols. In that setting the proof is inseparable from failure handling: a rare decapsulation failure may be negligible in one parameter set and unacceptable in another.

<div class="ps-warning" markdown="1">
<span class="ps-env-title">The implementation theorem is separate</span>

The abstract FO proof assumes the decapsulation algorithm is implemented exactly, including re-encryption checks and rejection behavior. Timing differences, branch differences, logging differences, or distinct error messages can create a stronger oracle than the proof allows.
</div>

<nav class="ps-nav">
  <a href="/articles/ps-07-rsa-oaep/"><span>Previous</span>Provable Security 07: RSA, Trapdoor Permutations, and OAEP</a>
  <a class="ps-next" href="/articles/ps-09-kem-dem-hybrid-encryption/"><span>Next</span>Provable Security 09: KEM-DEM Hybrid Encryption</a>
</nav>

</article>
