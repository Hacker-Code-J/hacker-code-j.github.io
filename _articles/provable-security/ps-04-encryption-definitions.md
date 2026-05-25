---
title: "Provable Security 04: Encryption Definitions"
layout: page
categories: Cryptography
tags: [provable-security, encryption, IND-CPA, IND-CCA2]
topics: IND-CPA, IND-CCA1, IND-CCA2, non-malleability, nonce security
short: "The central confidentiality games and what they do not cover."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-04" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / IV</p>

# Encryption definitions

<p class="ps-deck">Encryption security depends on what the adversary may query and what it has to distinguish.</p>
</header>

An encryption theorem is meaningless until the attack game is fixed. For a public-key scheme

$$
\Pi=(\mathsf{KeyGen},\mathsf{Enc},\mathsf{Dec}),
$$

correctness says that honestly generated ciphertexts decrypt to their messages, except for negligible failure in schemes that are probabilistic or noisy.


The Challenger must specify the exact attack interface. The same encryption algorithm can be secure in one game and insecure in another.

## IND-CPA

In the IND-CPA game, the adversary receives $$pk$$ and chooses equal-length messages $$m_0,m_1$$. The challenger samples $$b\leftarrow\{0,1\}$$ and returns

$$
c^*=\mathsf{Enc}_{pk}(m_b).
$$

The adversary outputs $$b'$$. Its advantage is

$$
\operatorname{Adv}^{\mathsf{ind\text{-}cpa}}_\Pi(A)
=\left|\Pr[b'=b]-\frac12\right|.
$$

For public-key encryption, chosen-plaintext access is implicit: anyone can encrypt under $$pk$$.


<div class="ps-env" markdown="1">
<span class="ps-env-title">IND-CPA game between $$\mathcal C$$ and $$\mathcal A$$</span>

1. $$\mathcal C$$ runs $$(pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda)$$ and sends $$pk$$ to $$\mathcal A$$.
2. $$\mathcal A$$ may compute encryptions on its own using $$pk$$. In the symmetric-key version, $$\mathcal C$$ provides an encryption oracle.
3. $$\mathcal A$$ submits two equal-length messages $$(m_0,m_1)$$.
4. $$\mathcal C$$ samples $$b\leftarrow\{0,1\}$$ and returns $$c^*=\mathsf{Enc}_{pk}(m_b)$$.
5. $$\mathcal A$$ may continue any allowed chosen-plaintext activity.
6. $$\mathcal A$$ outputs $$b'$$ and wins if $$b'=b$$.

The equal-length condition prevents the ciphertext length from revealing the challenge bit.
</div>

## IND-CCA1 and IND-CCA2


<div class="ps-game-diagram" aria-label="IND-CPA game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\((pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(pk\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\((m_0,m_1,\mathsf{st})\leftarrow\mathcal A_1(pk),\quad |m_0|=|m_1|\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\((m_0,m_1)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(b\leftarrow\{0,1\},\quad c^*\leftarrow\mathsf{Enc}_{pk}(m_b)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(c^*\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(b^{\prime}\leftarrow\mathcal A_2(\mathsf{st},c^*)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(b^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{IND\text{-}CPA}^{\mathcal A}_{\Pi}(1^\lambda):=\mathbf 1[b^{\prime}=b]\)</span></div>
</div>

Chosen-ciphertext security adds a decryption oracle. The challenge ciphertext is excluded, otherwise the game is trivial.

| Notion | Decryption access |
|---|---|
| IND-CCA1 | Before the challenge only. |
| IND-CCA2 | Before and after the challenge, except for $$c^*$$. |

IND-CCA2 is the modern hostile-network notion. The adversary may see a challenge ciphertext, modify it, and ask for decryptions of related ciphertexts.


<div class="ps-env" markdown="1">
<span class="ps-env-title">IND-CCA2 game between $$\mathcal C$$ and $$\mathcal A$$</span>

1. $$\mathcal C$$ runs $$(pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda)$$ and sends $$pk$$ to $$\mathcal A$$.
2. $$\mathcal A$$ may query a decryption oracle $$O_{\mathsf{Dec}}(c)=\mathsf{Dec}_{sk}(c)$$ before the challenge.
3. $$\mathcal A$$ submits equal-length messages $$(m_0,m_1)$$.
4. $$\mathcal C$$ samples $$b\leftarrow\{0,1\}$$ and returns $$c^*=\mathsf{Enc}_{pk}(m_b)$$.
5. $$\mathcal A$$ continues to query $$O_{\mathsf{Dec}}$$, but the query $$c=c^*$$ is forbidden. The Challenger rejects or aborts if the forbidden query is made, depending on the formal convention.
6. $$\mathcal A$$ outputs $$b'$$ and wins if $$b'=b$$.

IND-CCA1 is the same game except step 5 is removed: no decryption queries are allowed after the challenge.
</div>

<div class="ps-example" markdown="1">


<div class="ps-game-diagram" aria-label="IND-CCA2 game diagram">
  <div class="ps-game-party ps-game-challenger">Challenger <small>\(\mathcal C\)</small></div>
  <div class="ps-game-party ps-game-adversary">Adversary <small>\(\mathcal A\)</small></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\((pk,sk)\leftarrow\mathsf{KeyGen}(1^\lambda),\quad \mathcal O_{\mathsf{Dec}}(c):=\mathsf{Dec}_{sk}(c)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\((pk,\mathcal O_{\mathsf{Dec}})\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(c_i\leftarrow\mathcal A_1^{\mathcal O_{\mathsf{Dec}}}(pk,\mathsf T_{i-1})\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(c_i\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(m_i:=\mathcal O_{\mathsf{Dec}}(c_i),\quad \mathsf T_i:=\mathsf T_{i-1}\cup\{(c_i,m_i)\}\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(m_i\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\((m_0,m_1,\mathsf{st})\leftarrow\mathcal A_2^{\mathcal O_{\mathsf{Dec}}}(pk,\mathsf T_q),\quad |m_0|=|m_1|\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\((m_0,m_1)\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(b\leftarrow\{0,1\},\quad c^*\leftarrow\mathsf{Enc}_{pk}(m_b)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(c^*\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(c_j\leftarrow\mathcal A_3^{\mathcal O_{\mathsf{Dec}}}(\mathsf{st},c^*),\quad c_j\ne c^*\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(c_j\ne c^*\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(m_j:=\mathcal O_{\mathsf{Dec}}(c_j)\)</span></div>
  <div class="ps-game-msg ps-game-to-right"><span class="ps-game-formula">\(m_j\)</span></div>
  <div class="ps-game-step ps-game-right"><span class="ps-game-formula">\(b^{\prime}\leftarrow\mathcal A_4(\mathsf{st},c^*,\mathsf T)\)</span></div>
  <div class="ps-game-msg ps-game-to-left"><span class="ps-game-formula">\(b^{\prime}\)</span></div>
  <div class="ps-game-step ps-game-left"><span class="ps-game-formula">\(\mathsf{IND\text{-}CCA2}^{\mathcal A}_{\Pi}(1^\lambda):=\mathbf 1[b^{\prime}=b]\)</span></div>
</div>
<span class="ps-env-title">Malleability kills CCA security</span>

ElGamal encryption has the form

$$
(c_1,c_2)=(g^r,mh^r).
$$

From a ciphertext for $$m$$, anyone can choose a public group element $$\alpha$$ and form $$(c_1,\alpha c_2)$$, which decrypts to $$\alpha m$$ in the message group. This does not automatically violate IND-CPA, but it gives exactly the kind of related-ciphertext behavior that CCA definitions are designed to rule out.
</div>

## Nonce-based symmetric encryption

For stream-style encryption

$$
\mathsf{Enc}_K(N,M)=N\,\|\,(M\oplus F_K(N)),
$$

an IND-CPA proof replaces $$F_K$$ by a random function. If the challenge nonce is fresh, the mask is a fresh one-time pad.

The theorem has a condition:

$$
\operatorname{Adv}^{\mathsf{ind\text{-}cpa}}_\Pi(A)
\le
\operatorname{Adv}^{\mathsf{prf}}_F(B)+\Pr[\mathsf{nonce\ repeat}].
$$

If the same nonce is reused, then

$$
C_1\oplus C_2=M_1\oplus M_2.
$$

The proof has not failed; the implementation has left the theorem's hypothesis.

## Confidentiality is not authenticity

IND-CPA does not stop ciphertext modification. IND-CCA resists decryption-oracle abuse, but authenticated encryption usually packages confidentiality and ciphertext integrity into a single symmetric primitive. A theorem must say which property is being proved; it should not be inferred from the word "encrypted".

<nav class="ps-nav">
  <a href="/articles/ps-03-primitives-prf-prp-owf/"><span>Previous</span>Provable Security 03: PRFs, PRPs, One-Wayness, and Trapdoors</a>
  <a class="ps-next" href="/articles/ps-05-reductions-game-hopping/"><span>Next</span>Provable Security 05: Reductions and Game Hopping</a>
</nav>

</article>
