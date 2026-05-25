---
title: "Provable Security 09: KEM-DEM Hybrid Encryption"
layout: page
categories: Cryptography
tags: [provable-security, KEM-DEM, hybrid-encryption, AEAD]
topics: hybrid encryption, composition theorem, DEM security, context binding, error handling
short: "How KEM security and symmetric authenticated encryption combine."
---
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
{% include provable_security_article_style.html %}

<article class="ps-note ps-note-09" markdown="1">

<header class="ps-note-head" markdown="1">
<p class="ps-series">Provable security notes / IX</p>

# KEM-DEM hybrid encryption

<p class="ps-deck">Hybrid encryption separates key establishment from payload protection, but the composition theorem has precise interface requirements.</p>
</header>

Public-key encryption is rarely used directly for long messages. A hybrid construction uses a KEM to establish a symmetric key and a DEM to encrypt the payload.

A KEM produces

$$
(c_K,K)\leftarrow\mathsf{Encaps}_{pk}().
$$

A DEM encrypts the message:

$$
c_M\leftarrow\mathsf{Enc}^{\mathsf{DEM}}_K(M).
$$

The final ciphertext is $$(c_K,c_M)$$.

## Composition theorem shape

The proof usually proceeds in two steps. First replace the real KEM key with a uniform random key. Then apply the DEM security theorem under that independent key.

A typical proof for the standard KEM/DEM theorem has this shape, with constants depending on the exact advantage convention:

$$
\operatorname{Adv}^{\mathsf{hyb}}(A)
\le
2\,\operatorname{Adv}^{\mathsf{kem}}(B)
+\operatorname{Adv}^{\mathsf{dem}}(C)
+\Pr[\mathsf{bad}].
$$

The bad event may include nonce reuse, key-derivation collision, malformed ciphertext behavior, or context mismatch.

## What the DEM must provide

Confidentiality alone is usually not enough. In hostile environments, the DEM should normally be authenticated encryption. Otherwise the payload layer may accept modified ciphertexts even if the KEM layer is secure.

| Requirement | Reason |
|---|---|
| KEM key indistinguishability | The DEM key should be indistinguishable from random in the KEM security game. |
| Authenticated encryption | Modified payload ciphertexts should reject. |
| Context binding | The DEM should bind protocol identifiers and transcript data. |
| Domain separation | Encryption, authentication, and export keys should be distinct. |
| Uniform errors | KEM and DEM failures should not create a distinguishing channel. |

## Example: what can break composition

<div class="ps-example" markdown="1">
<span class="ps-env-title">Separate error messages</span>

Suppose a receiver reports "KEM failure" for invalid encapsulations and "DEM failure" for invalid payload tags. A proof that models decryption as returning only $$\bot$$ may not apply. The adversary now sees a richer behavioral channel: not only reject or accept, but which layer caused rejection.
</div>

<div class="ps-example" markdown="1">
<span class="ps-env-title">Missing context binding</span>

If the same KEM-derived key can be used across protocol modes, an attacker may move a ciphertext from one context to another. The KEM and DEM can each satisfy their local theorem while the protocol violates the intended binding property.
</div>

## Reading hybrid claims

Do not read "KEM is CCA-secure" as "the whole protocol is secure". The KEM establishes a key. The DEM protects data. The key schedule binds context. The implementation hides failure behavior. The theorem has to cover every interface.

<nav class="ps-nav">
  <a href="/articles/ps-08-fujisaki-okamoto-kems/"><span>Previous</span>Provable Security 08: Fujisaki-Okamoto and KEMs</a>
  <a class="ps-next" href="/articles/ps-10-signatures-macs/"><span>Next</span>Provable Security 10: Signatures, MACs, and Unforgeability</a>
</nav>

</article>
