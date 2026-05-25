---
title: "Provable Security 11: How to Read Security Theorems"
layout: page
categories: Cryptography
tags: [provable-security, checklist, concrete-security]
topics: theorem checklist, assumptions, reduction loss, query bounds, deployment conditions
short: "A practical checklist for parsing provable-security claims."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-11" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / XI</p>

# How to read a provable-security theorem

<p class="ps-deck">The theorem is useful only after its game, adversary, assumption, loss, and deployment conditions have all been identified.</p>
</header>

A provable-security theorem is a compact engineering document. It states what the scheme promises, which adversaries are considered, and which assumptions carry the proof. Read it as a structured object.

## Checklist

| Question | What to locate |
|---|---|
| What is the game? | IND-CPA, IND-CCA1, IND-CCA2, EUF-CMA, SUF-CMA, PRF, PRP, OWF, KEM indistinguishability, or protocol-specific. |
| What does the adversary receive? | Public keys, challenge ciphertexts, signatures, random-oracle replies, decryption replies, decapsulation results, error symbols. |
| Which queries are allowed? | Encryption, decryption, signing, verification, hash, reveal, corruption, decapsulation, challenge. |
| What is excluded? | Challenge ciphertext, repeated nonce, malformed public key, previous message, invalid domain point, or forbidden reveal query. |
| What is assumed? | PRF security, DDH, RSA inversion, DCR, LWE/MLWE, collision resistance, random oracle, ideal cipher. |
| How tight is the reduction? | Query factors, birthday terms, guessing loss, abort probability, runtime overhead. |
| Which bad events remain? | Collisions, nonce repeats, decapsulation failure, simulation inconsistency, parsing ambiguity. |
| What must implementation preserve? | Constant-time behavior, uniform randomness, domain separation, validation, uniform rejection. |

## One-sentence test

After reading a theorem, write:

<div class="ps-aside" markdown="1">
Assuming X is hard and primitive Y behaves as required, any adversary making at most these queries in game G has advantage at most Z, provided implementation conditions C hold.
</div>

If X, Y, G, Z, or C cannot be filled in, the theorem has not been understood.

## Example: reduction loss

A theorem may state

$$
\operatorname{Adv}^{\mathsf{euf\text{-}cma}}_{\Sigma}(A)
\le
q_H\operatorname{Adv}^{\mathsf{dl}}(B)+q_S2^{-128}.
$$

At $$q_H=2^{32}$$, a discrete-log advantage of $$2^{-128}$$ contributes $$2^{-96}$$ after the loss. The theorem may be mathematically sound while the concrete security margin differs from the primitive's nominal bit strength.

## Example: multi-user lift

A single-user theorem may lift by a union bound:

$$
\operatorname{Adv}^{\mathsf{multi}}(A)
\le
u\cdot \operatorname{Adv}^{\mathsf{single}}(B),
$$

where $$u$$ is the number of users. The exact notation is less important than the factor. Large deployments consume margin.

## Practical reading order

Read the theorem before the construction details, then read the proof with the theorem in hand. Mark every place where the proof changes games. Mark every oracle the reduction must simulate. Finally, compare the model to the implementation. Most misunderstandings occur at those boundaries.

<nav class="ps-nav">
  <a href="/articles/ps-10-signatures-macs/"><span>Previous</span>Provable Security 10: Signatures, MACs, and Unforgeability</a>
  <a class="ps-next" href="/articles/ps-12-where-proofs-stop/"><span>Next</span>Provable Security 12: Where Proofs Stop</a>
</nav>

</article>
