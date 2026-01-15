---
layout: page
title: 2025.04 - 2028.12 | Development and Demonstration of PQC-based Joint Certificate PKI Technology
year: 2025.04 - 2028.12
project: Development of libOQS-based PQC-KEM/SIG Library
# git: 
short: >-
  We develop the libOQS-based library for ML-KEM/DSA and Falcon.
---
<link rel="stylesheet" href="/assets/css/custom.css">

## [PQC-SIG] CRYSTALS-Dillithium
- **Algorithm type**: Digital signature scheme.
- **Main cryptographic assumption**: hardness of lattice problems over module lattices.

<!-- # Parameter set of CRYSTALS-Dillithium
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Parameter Set</th>
    <th style="border: 1px solid #888; padding: 8px;">Security Model</th>
    <th style="border: 1px solid #888; padding: 8px;">Security Level</th>
    <th style="border: 1px solid #888; padding: 8px;">Public Key Size (bytes)</th>
    <th style="border: 1px solid #888; padding: 8px;">Secret Key Size (bytes)</th>
    <th style="border: 1px solid #888; padding: 8px;">Signature Size (bytes)</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Dillithium2</td>
    <td style="border: 1px solid #888; padding: 8px;">SUF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">2</td>
    <td style="border: 1px solid #888; padding: 8px;">1312</td>
    <td style="border: 1px solid #888; padding: 8px;">2528</td>
    <td style="border: 1px solid #888; padding: 8px;">2420</td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Dillithium3</td>
    <td style="border: 1px solid #888; padding: 8px;">SUF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">3</td>
    <td style="border: 1px solid #888; padding: 8px;">1952</td>
    <td style="border: 1px solid #888; padding: 8px;">4000</td>
    <td style="border: 1px solid #888; padding: 8px;">3293</td>
  </tr>  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Dillithium5</td>
    <td style="border: 1px solid #888; padding: 8px;">SUF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">5</td>
    <td style="border: 1px solid #888; padding: 8px;">2592</td>
    <td style="border: 1px solid #888; padding: 8px;">4864</td>
    <td style="border: 1px solid #888; padding: 8px;">4595</td>
  </tr>
</table>

# Performance of CRYSTALS-Dillithium on ARMv8-A (Cortex-A76) with 1M samples
- option: `-mcpu=cortex-a76 -O3`
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Parameter Set</th>
    <th style="border: 1px solid #888; padding: 8px;">Keypair</th>
    <th style="border: 1px solid #888; padding: 8px;">Sign</th>
    <th style="border: 1px solid #888; padding: 8px;">Verify</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Dillithium3</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 8573 cycles/ticks<br>average: 8581 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 17711 cycles/ticks<br>average: 21115 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 7308 cycles/ticks<br>average: 7312 cycles/ticks</td>
  </tr>
</table>
- option: `-mcpu=cortex-a76 -O0`
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Parameter Set</th>
    <th style="border: 1px solid #888; padding: 8px;">Keypair</th>
    <th style="border: 1px solid #888; padding: 8px;">Sign</th>
    <th style="border: 1px solid #888; padding: 8px;">Verify</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Dillithium3</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 36473 cycles/ticks<br>average: 36616 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 66528 cycles/ticks<br>average: 76780 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 35110 cycles/ticks<br>average: 35125 cycles/ticks</td>
  </tr>
</table>


## [KpqC-SIG] NCC-Sign Trinomial
- **Algorithm type**: Digital signature scheme.
- **Main cryptographic assumption**: hardness of lattice problems over module lattices.

# Parameter set of NCC-Sign Trinomial
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Parameter Set</th>
    <th style="border: 1px solid #888; padding: 8px;">Security Model</th>
    <th style="border: 1px solid #888; padding: 8px;">Security Level</th>
    <th style="border: 1px solid #888; padding: 8px;">Public Key Size (bytes)</th>
    <th style="border: 1px solid #888; padding: 8px;">Secret Key Size (bytes)</th>
    <th style="border: 1px solid #888; padding: 8px;">Signature Size (bytes)</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">NCC-Sign Tri. 1</td>
    <td style="border: 1px solid #888; padding: 8px;">UF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">1</td>
    <td style="border: 1px solid #888; padding: 8px;">1760</td>
    <td style="border: 1px solid #888; padding: 8px;">2400</td>
    <td style="border: 1px solid #888; padding: 8px;">2912</td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">NCC-Sign Tri. 3</td>
    <td style="border: 1px solid #888; padding: 8px;">UF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">3</td>
    <td style="border: 1px solid #888; padding: 8px;">2336</td>
    <td style="border: 1px solid #888; padding: 8px;">3618</td>
    <td style="border: 1px solid #888; padding: 8px;">3872</td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">NCC-Sign Tri. 5'</td>
    <td style="border: 1px solid #888; padding: 8px;">UF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">5</td>
    <td style="border: 1px solid #888; padding: 8px;">3104</td>
    <td style="border: 1px solid #888; padding: 8px;">3936</td>
    <td style="border: 1px solid #888; padding: 8px;">5152</td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">NCC-Sign Tri. 5</td>
    <td style="border: 1px solid #888; padding: 8px;">UF-CMA</td>
    <td style="border: 1px solid #888; padding: 8px;">5</td>
    <td style="border: 1px solid #888; padding: 8px;">3200</td>
    <td style="border: 1px solid #888; padding: 8px;">4992</td>
    <td style="border: 1px solid #888; padding: 8px;">6080</td>
  </tr>
</table>

# Performance of NCC-Sign Tri. on ARMv8-A (Cortex-A76) with 1M samples
- option: `-mcpu=cortex-a76 -O3`
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Parameter Set</th>
    <th style="border: 1px solid #888; padding: 8px;">Keypair</th>
    <th style="border: 1px solid #888; padding: 8px;">Sign</th>
    <th style="border: 1px solid #888; padding: 8px;">Verify</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">NCC-Sign Tri. 1</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 5034 cycles/ticks<br>average: 5041 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 10394 cycles/ticks<br>average: 14761 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 5101 cycles/ticks<br>average: 5105 cycles/ticks</td>
  </tr>
</table>
- option: `-mcpu=cortex-a76 -O0`
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Parameter Set</th>
    <th style="border: 1px solid #888; padding: 8px;">Keypair</th>
    <th style="border: 1px solid #888; padding: 8px;">Sign</th>
    <th style="border: 1px solid #888; padding: 8px;">Verify</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">NCC-Sign Tri. 1</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 17412 cycles/ticks<br>average: 17794 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 39214 cycles/ticks<br>average: 56375 cycles/ticks</td>
    <td style="border: 1px solid #888; padding: 8px;">median: 18105 cycles/ticks<br>average: 18132 cycles/ticks</td>
  </tr>
</table>





# cycles/ticks

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Stage</th>
    <th style="border: 1px solid #888; padding: 8px;">C with Montgomery Reduction</th>
    <th style="border: 1px solid #888; padding: 8px;">ASM with Barrett Multiplication</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">CRT (only)</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 429<br>[Med] 425 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 37<br>[Med] 34 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Radix2 (only)</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 2669<br>[Med] 2639 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 160<br>[Med] 160 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Radix3 (only)</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 1943<br>[Med] 1924 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 261<br>[Med] 261 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">CRT+Radix2</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 3053<br>[Med] 3051 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 181<br>[Med] 182 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">CRT+Radix2+Radix3</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 4943<br>[Med] 4939 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 429<br>[Med] 429 </td>
  </tr>
</table>

# ms

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <th style="border: 1px solid #888; padding: 8px;">Stage</th>
    <th style="border: 1px solid #888; padding: 8px;">C with Montgomery Reduction</th>
    <th style="border: 1px solid #888; padding: 8px;">ASM with Barrett Multiplication</th>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">CRT (only)</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.007906<br>[Med] 0.007815 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.000649<br>[Med] 0.000574 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Radix2 (only)</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.049388<br>[Med] 0.048816 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.002922<br>[Med] 0.002926 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">Radix3 (only)</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.035942<br>[Med] 0.035593 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.004797<br>[Med] 0.004796 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">CRT+Radix2</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.056504<br>[Med] 0.056445 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.003324<br>[Med] 0.003315 </td>
  </tr>
  <tr>
    <td style="border: 1px solid #888; padding: 8px;">CRT+Radix2+Radix3</td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.091502<br>[Med] 0.091427 </td>
    <td style="border: 1px solid #888; padding: 8px;">[Ave] 0.007902<br>[Med] 0.007889 </td>
  </tr>
</table>

## Graph

<div style="text-align: center; margin-bottom: 1.5em;">
  <img src="/assets/python-image/measure_ntt.png" alt="NTT Benchmark Measurement" style="max-width: 80%; border: 1px solid #ccc; box-shadow: 2px 2px 8px #eee;">
  <br><em>Figure 1: NTT Benchmark Measurement</em>
</div> -->
